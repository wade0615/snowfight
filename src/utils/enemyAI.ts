import type { Enemy, Snowball, Player } from '@/types/game';
import {
  ENEMY_CROUCH_DURATION,
  ENEMY_PREPARE_DURATION,
  ENEMY_THROW_DURATION,
  ENEMY_STANDUP_DURATION,
  ENEMY_PAIN_DURATION,
  ENEMY_FALL_DURATION,
  ENEMY_THROW_INTERVAL_MIN,
  ENEMY_THROW_INTERVAL_MAX,
  ENEMY_FIRST_THROW_DELAY,
  ENEMY_ACCURACY,
  CHARGE_TIME,
  SNOWBALL_BASE_SPEED,
  SNOWBALL_MAX_SPEED,
  BOUNDS,
} from './constants';
import {
  constrainEnemyPosition,
  calculateThrowVelocity,
  calculateMaxDistance,
} from './physics';

// 記錄關卡開始時間
let levelStartTime = 0;

export function setLevelStartTime(time: number) {
  levelStartTime = time;
}

interface EnemyUpdateResult {
  enemy: Partial<Enemy>;
  snowball?: Snowball;
}

// 更新單個敵人的 AI
export function updateEnemyAI(
  enemy: Enemy,
  players: Player[],
  now: number,
  width: number,
  height: number,
  scale: number
): EnemyUpdateResult {
  if (!enemy.alive) {
    return { enemy: {} };
  }

  const result: EnemyUpdateResult = { enemy: {} };

  // 處理被擊暈狀態
  if (now < enemy.stunUntil) {
    return result;
  }

  // 根據當前狀態處理
  switch (enemy.throwState) {
    case 'idle':
      result.enemy = handleIdleState(enemy, now, width, height, scale);
      break;

    case 'crouch':
      if (now - enemy.throwStateStart >= ENEMY_CROUCH_DURATION) {
        result.enemy = {
          throwState: 'prepare',
          throwStateStart: now,
          chargeStart: now,
          charge: 0,
        };
      }
      break;

    case 'prepare':
      const chargeProgress = Math.min(1, (now - enemy.chargeStart) / CHARGE_TIME);
      result.enemy = { charge: chargeProgress };

      if (now - enemy.throwStateStart >= ENEMY_PREPARE_DURATION) {
        // 發射雪球
        const snowball = createEnemySnowball(enemy, players, width, height, scale);
        result.enemy = {
          ...result.enemy,
          throwState: 'throw',
          throwStateStart: now,
        };
        if (snowball) {
          result.snowball = snowball;
        }
      }
      break;

    case 'throw':
      if (now - enemy.throwStateStart >= ENEMY_THROW_DURATION) {
        result.enemy = {
          throwState: 'standup',
          throwStateStart: now,
          charge: 0,
        };
      }
      break;

    case 'standup':
      if (now - enemy.throwStateStart >= ENEMY_STANDUP_DURATION) {
        result.enemy = {
          throwState: 'idle',
          throwStateStart: now,
        };
      }
      break;

    case 'pain':
      if (now - enemy.throwStateStart >= ENEMY_PAIN_DURATION) {
        result.enemy = {
          throwState: 'idle',
          throwStateStart: now,
        };
      }
      break;

    case 'fall':
      if (now - enemy.throwStateStart >= ENEMY_FALL_DURATION) {
        result.enemy = {
          throwState: 'idle',
          throwStateStart: now,
        };
      }
      break;
  }

  return result;
}

// 處理閒置狀態
function handleIdleState(
  enemy: Enemy,
  now: number,
  width: number,
  height: number,
  scale: number
): Partial<Enemy> {
  const updates: Partial<Enemy> = {};

  // 更新移動目標
  if (now - enemy.lastTargetChange >= enemy.targetChangeInterval) {
    const newTarget = generateNewTarget(width, height);
    updates.targetX = newTarget.x;
    updates.targetY = newTarget.y;
    updates.lastTargetChange = now;
    updates.targetChangeInterval =
      ENEMY_THROW_INTERVAL_MIN +
      Math.random() * (ENEMY_THROW_INTERVAL_MAX - ENEMY_THROW_INTERVAL_MIN);
  }

  // 移動向目標
  const targetX = enemy.targetX;
  const targetY = enemy.targetY;
  const dx = targetX - enemy.x;
  const dy = targetY - enemy.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > 5) {
    const moveX = (dx / dist) * enemy.moveSpeed;
    const moveY = (dy / dist) * enemy.moveSpeed;
    const newPos = constrainEnemyPosition(
      enemy.x + moveX,
      enemy.y + moveY,
      width,
      height,
      scale
    );
    updates.x = newPos.x;
    updates.y = newPos.y;

    // 更新走路動畫幀
    updates.walkFrame = (enemy.walkFrame + 1) % 60;
  }

  // 隨機決定是否開始投擲（開局後需等待一段時間）
  const timeSinceLevelStart = now - levelStartTime;
  if (timeSinceLevelStart >= ENEMY_FIRST_THROW_DELAY && Math.random() < 0.008) {
    updates.throwState = 'crouch';
    updates.throwStateStart = now;
  }

  return updates;
}

// 生成新的移動目標
function generateNewTarget(width: number, height: number): { x: number; y: number } {
  const minX = width * BOUNDS.enemy.minX;
  const maxX = width * BOUNDS.enemy.maxX;
  const minY = height * BOUNDS.enemy.minY;
  const maxY = height * BOUNDS.enemy.maxY;

  // 在敵人區域內隨機選點
  const x = minX + Math.random() * (maxX - minX);
  let y = minY + Math.random() * (maxY - minY);

  // 確保在三角形內
  const diagSlope = (minY - maxY) / (maxX - minX);
  const diagIntercept = maxY - diagSlope * minX;
  const maxYAtX = diagSlope * x + diagIntercept;

  if (y > maxYAtX) {
    y = maxYAtX - 10;
  }

  return { x, y };
}

// 創建敵人的雪球
function createEnemySnowball(
  enemy: Enemy,
  players: Player[],
  width: number,
  height: number,
  scale: number
): Snowball | null {
  // 計算敵人的正前方方向（朝向玩家區域中心）
  const playerCenterX = width * ((BOUNDS.player.minX + BOUNDS.player.maxX) / 2);
  const playerCenterY = height * ((BOUNDS.player.minY + BOUNDS.player.maxY) / 2);
  const forwardAngle = Math.atan2(playerCenterY - enemy.y, playerCenterX - enemy.x);

  // 隨機選擇一個存活玩家作為目標
  const alivePlayers = players.filter((p) => p.alive);

  let targetX: number;
  let targetY: number;

  if (alivePlayers.length === 0) {
    // 沒有存活玩家，丟向玩家區域中心
    targetX = playerCenterX;
    targetY = playerCenterY;
  } else {
    // 從存活玩家中隨機選擇一個目標
    const target = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];

    // 計算到目標的角度
    const targetAngle = Math.atan2(target.y - enemy.y, target.x - enemy.x);

    // 計算角度差異
    let angleDiff = targetAngle - forwardAngle;
    // 標準化角度差異到 -π 到 π 範圍
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    // 限制在 ±15 度（約 0.2618 弧度）範圍內
    const maxAngle = (30 * Math.PI) / 180 / 2; // 15 度轉弧度
    const clampedAngleDiff = Math.max(-maxAngle, Math.min(maxAngle, angleDiff));
    const clampedAngle = forwardAngle + clampedAngleDiff;

    // 計算限制角度後的目標點（使用固定距離）
    const distance = Math.sqrt(
      Math.pow(target.x - enemy.x, 2) + Math.pow(target.y - enemy.y, 2)
    );
    targetX = enemy.x + Math.cos(clampedAngle) * distance;
    targetY = enemy.y + Math.sin(clampedAngle) * distance;
  }

  // 加入隨機偏移，讓敵人不會直接命中
  // ENEMY_ACCURACY 越低，偏差越大
  const maxOffset = 250 * (1 - ENEMY_ACCURACY);
  const offsetX = (Math.random() - 0.5) * maxOffset * 2;
  const offsetY = (Math.random() - 0.5) * maxOffset * 2;

  const velocity = calculateThrowVelocity(
    enemy.x,
    enemy.y,
    targetX + offsetX,
    targetY + offsetY,
    enemy.charge,
    SNOWBALL_BASE_SPEED * scale,
    SNOWBALL_MAX_SPEED * scale
  );

  return {
    x: enemy.x,
    y: enemy.y,
    vx: velocity.vx,
    vy: velocity.vy,
    from: 'enemy',
    maxDistance: calculateMaxDistance(enemy.charge),
    startX: enemy.x,
    startY: enemy.y,
  };
}

// 敵人被擊中時的反應
export function handleEnemyHit(enemy: Enemy, now: number, damage: number = 1): Partial<Enemy> {
  const newHp = enemy.hp - damage;

  if (newHp <= 0) {
    return {
      hp: 0,
      alive: false,
      deadState: 1,
      deadTime: now,
    };
  }

  // 根據傷害決定反應動畫
  const throwState = damage >= 2 ? 'fall' : 'pain';

  return {
    hp: newHp,
    throwState,
    throwStateStart: now,
    stunUntil: now + (throwState === 'fall' ? ENEMY_FALL_DURATION : ENEMY_PAIN_DURATION),
  };
}
