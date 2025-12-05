import type { Player, Enemy, Snowball, Barrier } from '@/types/game';
import {
  BASE_PLAYER_RADIUS,
  BASE_ENEMY_RADIUS,
  SNOWBALL_RADIUS,
  SNOWBALL_MAX_DISTANCE,
  BOUNDS,
} from './constants';

// 計算兩點間距離
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// 檢查雪球是否擊中玩家
export function checkSnowballHitPlayer(
  snowball: Snowball,
  player: Player,
  scale: number
): boolean {
  if (!player.alive) return false;

  const hitRadius = (BASE_PLAYER_RADIUS + SNOWBALL_RADIUS) * scale;
  return distance(snowball.x, snowball.y, player.x, player.y) < hitRadius;
}

// 檢查雪球是否擊中敵人
export function checkSnowballHitEnemy(
  snowball: Snowball,
  enemy: Enemy,
  scale: number
): boolean {
  if (!enemy.alive) return false;

  const hitRadius = (BASE_ENEMY_RADIUS + SNOWBALL_RADIUS) * scale;
  return distance(snowball.x, snowball.y, enemy.x, enemy.y) < hitRadius;
}

// 檢查雪球是否擊中掩體
export function checkSnowballHitBarrier(
  snowball: Snowball,
  barrier: Barrier,
  scale: number
): boolean {
  if (barrier.hp <= 0) return false;

  const hitRadius = (barrier.radius * 1.2 + SNOWBALL_RADIUS) * scale;
  return distance(snowball.x, snowball.y, barrier.x, barrier.y) < hitRadius;
}

// 檢查雪球是否超出最大距離
export function checkSnowballMaxDistance(snowball: Snowball, scale: number): boolean {
  const traveled = distance(snowball.x, snowball.y, snowball.startX, snowball.startY);
  return traveled >= snowball.maxDistance * scale;
}

// 檢查雪球是否出界
export function checkSnowballOutOfBounds(
  snowball: Snowball,
  width: number,
  height: number
): boolean {
  return (
    snowball.x < 0 ||
    snowball.x > width ||
    snowball.y < 0 ||
    snowball.y > height
  );
}

// 更新雪球位置
export function updateSnowballPosition(snowball: Snowball): Snowball {
  return {
    ...snowball,
    x: snowball.x + snowball.vx,
    y: snowball.y + snowball.vy,
  };
}

// 計算投擲速度
export function calculateThrowVelocity(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  charge: number,
  baseSpeed: number,
  maxSpeed: number
): { vx: number; vy: number } {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist === 0) {
    return { vx: 0, vy: 0 };
  }

  const speed = baseSpeed + (maxSpeed - baseSpeed) * charge;
  const vx = (dx / dist) * speed;
  const vy = (dy / dist) * speed;

  return { vx, vy };
}

// 計算蓄力後的最大距離
export function calculateMaxDistance(charge: number): number {
  return SNOWBALL_MAX_DISTANCE * (0.3 + charge * 0.7);
}

// 限制玩家移動範圍 (右下三角形)
export function constrainPlayerPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  scale: number
): { x: number; y: number } {
  const radius = BASE_PLAYER_RADIUS * scale;
  const minX = width * BOUNDS.player.minX + radius;
  const maxX = width * BOUNDS.player.maxX - radius;
  const minY = height * BOUNDS.player.minY + radius;
  const maxY = height * BOUNDS.player.maxY - radius;

  // 基本邊界限制
  let newX = Math.max(minX, Math.min(maxX, x));
  let newY = Math.max(minY, Math.min(maxY, y));

  // 三角形限制：右下區域
  // 對角線從 (minX, maxY) 到 (maxX, minY)
  const diagSlope = (minY - maxY) / (maxX - minX);
  const diagIntercept = maxY - diagSlope * minX;
  const maxYAtX = diagSlope * newX + diagIntercept;

  if (newY < maxYAtX) {
    // 在對角線上方，需要調整
    // 將點投影到對角線上
    newY = maxYAtX;
  }

  return { x: newX, y: newY };
}

// 限制敵人移動範圍 (左上三角形)
export function constrainEnemyPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  scale: number
): { x: number; y: number } {
  const radius = BASE_ENEMY_RADIUS * scale;
  const minX = width * BOUNDS.enemy.minX + radius;
  const maxX = width * BOUNDS.enemy.maxX - radius;
  const minY = height * BOUNDS.enemy.minY + radius;
  const maxY = height * BOUNDS.enemy.maxY - radius;

  // 基本邊界限制
  let newX = Math.max(minX, Math.min(maxX, x));
  let newY = Math.max(minY, Math.min(maxY, y));

  // 三角形限制：左上區域
  // 對角線從 (minX, maxY) 到 (maxX, minY)
  const diagSlope = (minY - maxY) / (maxX - minX);
  const diagIntercept = maxY - diagSlope * minX;
  const minYAtX = diagSlope * newX + diagIntercept;

  if (newY > minYAtX) {
    // 在對角線下方，需要調整
    newY = minYAtX;
  }

  return { x: newX, y: newY };
}

// 檢查點是否在玩家區域內
export function isInPlayerArea(
  x: number,
  y: number,
  width: number,
  height: number
): boolean {
  const minX = width * BOUNDS.player.minX;
  const maxX = width * BOUNDS.player.maxX;
  const minY = height * BOUNDS.player.minY;
  const maxY = height * BOUNDS.player.maxY;

  if (x < minX || x > maxX || y < minY || y > maxY) {
    return false;
  }

  // 檢查三角形
  const diagSlope = (minY - maxY) / (maxX - minX);
  const diagIntercept = maxY - diagSlope * minX;
  const maxYAtX = diagSlope * x + diagIntercept;

  return y >= maxYAtX;
}

// 檢查點是否在敵人區域內
export function isInEnemyArea(
  x: number,
  y: number,
  width: number,
  height: number
): boolean {
  const minX = width * BOUNDS.enemy.minX;
  const maxX = width * BOUNDS.enemy.maxX;
  const minY = height * BOUNDS.enemy.minY;
  const maxY = height * BOUNDS.enemy.maxY;

  if (x < minX || x > maxX || y < minY || y > maxY) {
    return false;
  }

  // 檢查三角形
  const diagSlope = (minY - maxY) / (maxX - minX);
  const diagIntercept = maxY - diagSlope * minX;
  const minYAtX = diagSlope * x + diagIntercept;

  return y <= minYAtX;
}

// 計算從敵人位置投向玩家區域的方向
export function calculateEnemyThrowDirection(
  enemyX: number,
  enemyY: number,
  width: number,
  height: number
): { targetX: number; targetY: number } {
  // 瞄準玩家區域中心
  const targetX = width * (BOUNDS.player.minX + BOUNDS.player.maxX) / 2;
  const targetY = height * (BOUNDS.player.minY + BOUNDS.player.maxY) / 2;

  // 加入一些隨機偏移
  const offsetX = (Math.random() - 0.5) * width * 0.2;
  const offsetY = (Math.random() - 0.5) * height * 0.2;

  return {
    targetX: targetX + offsetX,
    targetY: targetY + offsetY,
  };
}

// 找到最近的玩家
export function findNearestPlayer(
  x: number,
  y: number,
  players: Player[]
): Player | null {
  let nearest: Player | null = null;
  let minDist = Infinity;

  for (const player of players) {
    if (!player.alive) continue;
    const dist = distance(x, y, player.x, player.y);
    if (dist < minDist) {
      minDist = dist;
      nearest = player;
    }
  }

  return nearest;
}

// 找到點擊位置最近的玩家
// 參考 main.js：控制圈位置在玩家下方 50 像素，半徑為 getPlayerRadius() + 30
export function findPlayerAtPosition(
  x: number,
  y: number,
  players: Player[],
  scale: number
): number | null {
  // 控制圈偏移量（參考 main.js）
  const controlOffsetY = 50;
  // 控制圈半徑（參考 main.js：getPlayerRadius() + 30）
  const controlRadius = BASE_PLAYER_RADIUS + 30;

  // 先找出所有存活且未被暈眩的玩家
  const candidates: { index: number; dist: number }[] = [];

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (!player.alive) continue;

    // 控制圈中心位置（在玩家下方）
    const controlX = player.x;
    const controlY = player.y + controlOffsetY;

    const dist = distance(x, y, controlX, controlY);
    if (dist < controlRadius) {
      candidates.push({ index: i, dist });
    }
  }

  // 如果有多個候選，選擇最近的
  if (candidates.length > 0) {
    candidates.sort((a, b) => a.dist - b.dist);
    return candidates[0].index;
  }

  return null;
}
