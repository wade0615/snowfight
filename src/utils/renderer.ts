import type { Player, Enemy, Snowball, Barrier, GameImages } from '@/types/game';
import {
  BASE_PLAYER_RADIUS,
  BASE_ENEMY_RADIUS,
  SNOWBALL_RADIUS,
  COLORS,
  PLAYER_MAX_HP,
  ENEMY_MAX_HP,
} from './constants';

// 繪製背景
export function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  // 天空漸層
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, COLORS.sky.top);
  gradient.addColorStop(1, COLORS.sky.bottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 雪地
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, height * 0.85, width, height * 0.15);

  // 雪堆裝飾
  drawSnowPiles(ctx, width, height);
}

// 繪製雪堆
function drawSnowPiles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  ctx.fillStyle = '#F8F8F8';

  // 左側雪堆
  ctx.beginPath();
  ctx.ellipse(width * 0.1, height * 0.88, width * 0.08, height * 0.04, 0, 0, Math.PI * 2);
  ctx.fill();

  // 右側雪堆
  ctx.beginPath();
  ctx.ellipse(width * 0.9, height * 0.86, width * 0.1, height * 0.05, 0, 0, Math.PI * 2);
  ctx.fill();
}

// 繪製玩家 (使用色塊)
export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  player: Player,
  scale: number,
  images: GameImages,
  now: number
): void {
  if (!player.alive && player.deadState >= 3) return;

  const radius = BASE_PLAYER_RADIUS * scale;
  const { x, y } = player;
  const isStunned = now < player.stunUntil;

  ctx.save();

  if (isStunned) {
    ctx.globalAlpha = 0.5;
  }

  // 嘗試使用圖片
  const img = player.charging ? images.playerPrepare : images.player;
  if (img && img.complete && img.naturalWidth > 0) {
    const imgSize = radius * 3;
    ctx.drawImage(img, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);
  } else {
    // Fallback: 幾何圖形
    drawPlayerShape(ctx, x, y, radius, player.charging);
  }

  // 蓄力圈
  if (player.charging && player.charge > 0) {
    drawChargeCircle(ctx, x, y, radius, player.charge);
  }

  // 血量顯示
  drawHpBar(ctx, x, y - radius - 15, player.hp, PLAYER_MAX_HP, scale);

  ctx.restore();
}

// 繪製玩家形狀 (fallback)
function drawPlayerShape(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  charging: boolean
): void {
  // 身體
  ctx.fillStyle = COLORS.player.body;
  ctx.strokeStyle = COLORS.player.outline;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 頭
  ctx.beginPath();
  ctx.arc(x, y - radius * 0.8, radius * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 蓄力姿勢手臂
  if (charging) {
    ctx.beginPath();
    ctx.moveTo(x + radius * 0.5, y - radius * 0.3);
    ctx.lineTo(x + radius * 1.5, y - radius * 0.8);
    ctx.strokeStyle = COLORS.player.body;
    ctx.lineWidth = 6;
    ctx.stroke();
  }
}

// 繪製敵人 (使用色塊)
export function drawEnemy(
  ctx: CanvasRenderingContext2D,
  enemy: Enemy,
  scale: number,
  images: GameImages,
  now: number
): void {
  if (!enemy.alive && enemy.deadState >= 3) return;

  const radius = BASE_ENEMY_RADIUS * scale;
  const { x, y, throwState } = enemy;
  const isStunned = now < enemy.stunUntil;

  ctx.save();

  if (isStunned) {
    ctx.globalAlpha = 0.5;
  }

  // 選擇對應狀態的圖片
  let img: HTMLImageElement | null = null;
  switch (throwState) {
    case 'crouch':
      img = images.crouch;
      break;
    case 'prepare':
      img = images.prepare;
      break;
    case 'throw':
      img = images.throw;
      break;
    case 'standup':
      img = images.standup;
      break;
    case 'pain':
      img = images.pain;
      break;
    case 'fall':
      img = images.fall;
      break;
    default:
      img = enemy.walkFrame % 2 === 0 ? images.walk1 : images.walk2;
  }

  if (img && img.complete && img.naturalWidth > 0) {
    const imgSize = radius * 3;
    ctx.drawImage(img, x - imgSize / 2, y - imgSize / 2, imgSize, imgSize);
  } else {
    // Fallback: 幾何圖形
    drawEnemyShape(ctx, x, y, radius, throwState);
  }

  // 蓄力圈 (敵人準備投擲時)
  if (throwState === 'prepare' && enemy.charge > 0) {
    drawChargeCircle(ctx, x, y, radius, enemy.charge);
  }

  // 血量顯示
  drawHpBar(ctx, x, y - radius - 15, enemy.hp, ENEMY_MAX_HP, scale);

  ctx.restore();
}

// 繪製敵人形狀 (fallback)
function drawEnemyShape(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  throwState: string
): void {
  ctx.fillStyle = COLORS.enemy.body;
  ctx.strokeStyle = COLORS.enemy.outline;
  ctx.lineWidth = 2;

  // 根據狀態調整姿勢
  let bodyY = y;
  if (throwState === 'crouch' || throwState === 'prepare') {
    bodyY = y + radius * 0.3;
  }

  // 身體
  ctx.beginPath();
  ctx.arc(x, bodyY, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 頭
  ctx.beginPath();
  ctx.arc(x, bodyY - radius * 0.8, radius * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 投擲姿勢手臂
  if (throwState === 'prepare' || throwState === 'throw') {
    ctx.beginPath();
    ctx.moveTo(x - radius * 0.5, bodyY - radius * 0.3);
    ctx.lineTo(x - radius * 1.5, bodyY - radius * 0.8);
    ctx.strokeStyle = COLORS.enemy.body;
    ctx.lineWidth = 6;
    ctx.stroke();
  }
}

// 繪製掩體（雪堆）
export function drawBarrier(
  ctx: CanvasRenderingContext2D,
  barrier: Barrier,
  scale: number
): void {
  if (barrier.hp <= 0) return;

  const { x, y, radius } = barrier;
  const actualRadius = radius * 1.2; // 稍微放大一點

  // 雪堆底部陰影
  ctx.beginPath();
  ctx.ellipse(x, y + actualRadius * 0.3, actualRadius * 1.1, actualRadius * 0.4, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
  ctx.fill();

  // 雪堆主體 - 用橢圓形模擬雪堆
  ctx.beginPath();
  ctx.ellipse(x, y, actualRadius, actualRadius * 0.7, 0, 0, Math.PI * 2);

  // 漸層填充
  const gradient = ctx.createRadialGradient(x - actualRadius * 0.2, y - actualRadius * 0.2, 0, x, y, actualRadius);
  gradient.addColorStop(0, '#FFFFFF');
  gradient.addColorStop(0.7, '#F0F0F0');
  gradient.addColorStop(1, '#DCDCDC');
  ctx.fillStyle = gradient;
  ctx.fill();

  // 邊框
  ctx.strokeStyle = '#C0C0C0';
  ctx.lineWidth = 1;
  ctx.stroke();

  // 根據 HP 顯示損壞程度
  if (barrier.hp < 3) {
    ctx.fillStyle = 'rgba(150, 150, 150, 0.3)';
    ctx.beginPath();
    ctx.arc(x - actualRadius * 0.3, y, actualRadius * 0.2, 0, Math.PI * 2);
    ctx.fill();
  }
  if (barrier.hp < 2) {
    ctx.beginPath();
    ctx.arc(x + actualRadius * 0.2, y - actualRadius * 0.2, actualRadius * 0.15, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 繪製雪球
export function drawSnowball(
  ctx: CanvasRenderingContext2D,
  snowball: Snowball,
  scale: number
): void {
  const radius = SNOWBALL_RADIUS * scale;
  const { x, y } = snowball;

  // 陰影
  ctx.beginPath();
  ctx.arc(x + 2, y + 2, radius, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.snowball.shadow;
  ctx.fill();

  // 雪球本體
  const gradient = ctx.createRadialGradient(x - 2, y - 2, 0, x, y, radius);
  gradient.addColorStop(0, '#FFFFFF');
  gradient.addColorStop(1, '#E8E8E8');

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // 高光
  ctx.beginPath();
  ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fill();
}

// 繪製蓄力圈
function drawChargeCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  charge: number
): void {
  const chargeRadius = radius * (1 + charge);

  ctx.beginPath();
  ctx.arc(x, y, chargeRadius, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.charge.fill;
  ctx.fill();
  ctx.strokeStyle = COLORS.charge.stroke;
  ctx.lineWidth = 2;
  ctx.stroke();
}

// 繪製血量條
function drawHpBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  hp: number,
  maxHp: number,
  scale: number
): void {
  const barWidth = 40 * scale;
  const barHeight = 6 * scale;
  const hpRatio = hp / maxHp;

  // 背景
  ctx.fillStyle = '#333';
  ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);

  // 血量
  let hpColor = COLORS.hp.full;
  if (hpRatio <= 0.33) {
    hpColor = COLORS.hp.low;
  } else if (hpRatio <= 0.66) {
    hpColor = COLORS.hp.medium;
  }

  ctx.fillStyle = hpColor;
  ctx.fillRect(x - barWidth / 2, y, barWidth * hpRatio, barHeight);

  // 邊框
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  ctx.strokeRect(x - barWidth / 2, y, barWidth, barHeight);
}

// 繪製關卡文字
export function drawLevelText(
  ctx: CanvasRenderingContext2D,
  level: number,
  width: number,
  height: number
): void {
  ctx.save();
  ctx.fillStyle = COLORS.ui.text;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`第 ${level} 關`, width / 2, height / 2);
  ctx.restore();
}

// 繪製遊戲結束畫面
export function drawGameOver(
  ctx: CanvasRenderingContext2D,
  isWin: boolean,
  level: number,
  score: number,
  width: number,
  height: number
): void {
  // 半透明覆蓋
  ctx.fillStyle = COLORS.ui.overlay;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (isWin) {
    ctx.font = 'bold 64px Arial';
    ctx.fillText('🎉 過關！', width / 2, height / 2 - 40);
    ctx.font = '32px Arial';
    ctx.fillText(`第 ${level} 關完成`, width / 2, height / 2 + 20);
    ctx.fillText('點擊任意處進入下一關', width / 2, height / 2 + 70);
  } else {
    ctx.font = 'bold 64px Arial';
    ctx.fillText('💀 遊戲結束', width / 2, height / 2 - 60);
    ctx.font = '32px Arial';
    ctx.fillText(`最終分數: ${score}`, width / 2, height / 2);
    ctx.fillText(`到達第 ${level} 關`, width / 2, height / 2 + 40);
    ctx.fillText('點擊任意處重新開始', width / 2, height / 2 + 100);
  }

  ctx.restore();
}

// 繪製開場問候
export function drawGreeting(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  ctx.save();
  ctx.fillStyle = COLORS.ui.text;
  ctx.font = 'bold 72px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('❄️ 打雪仗 ❄️', width / 2, height / 2 - 30);
  ctx.font = '28px Arial';
  ctx.fillText('拖曳角色瞄準，放開投擲雪球！', width / 2, height / 2 + 50);
  ctx.restore();
}
