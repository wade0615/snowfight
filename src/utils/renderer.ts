import type { Player, Enemy, Snowball, Barrier, GameImages } from '@/types/game';
import {
  BASE_PLAYER_RADIUS,
  BASE_ENEMY_RADIUS,
  SNOWBALL_RADIUS,
  COLORS,
  PLAYER_MAX_HP,
  ENEMY_MAX_HP,
  BARRIER_MAX_HP,
  BOUNDS,
} from './constants';
import { isMobileDevice } from './deviceDetection';

// Pixel Art 字體常數
const PIXEL_FONT = "'Press Start 2P', monospace";
const PIXEL_FONT_BODY = "'VT323', monospace";

// 裝飾用雪堆位置（固定位置，確保敵我雙方區域都有）- 左右對分
const DECORATIVE_SNOW_PILES = [
  // 敵人區域（左半邊）
  { x: 0.10, y: 0.25 },
  { x: 0.25, y: 0.50 },
  { x: 0.15, y: 0.75 },
  { x: 0.35, y: 0.35 },
  { x: 0.40, y: 0.65 },
  // 玩家區域（右半邊）
  { x: 0.60, y: 0.30 },
  { x: 0.75, y: 0.50 },
  { x: 0.85, y: 0.25 },
  { x: 0.70, y: 0.75 },
  { x: 0.90, y: 0.70 },
];

// === Pixel Art 工具函數 ===

// 繪製像素風格矩形邊框 (手繪感，帶微妙抖動)
function drawPixelRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  lineWidth: number = 2
): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = 'miter';
  ctx.lineCap = 'square';

  // 手繪感：用多段直線模擬略微不規則的邊框
  const jitter = 0.8;
  const segments = 8;

  ctx.beginPath();
  // 上邊
  ctx.moveTo(x, y);
  for (let i = 1; i <= segments; i++) {
    const px = x + (w / segments) * i;
    const py = y + (Math.random() - 0.5) * jitter;
    ctx.lineTo(px, py);
  }
  // 右邊
  for (let i = 1; i <= segments; i++) {
    const px = x + w + (Math.random() - 0.5) * jitter;
    const py = y + (h / segments) * i;
    ctx.lineTo(px, py);
  }
  // 下邊
  for (let i = segments - 1; i >= 0; i--) {
    const px = x + (w / segments) * i;
    const py = y + h + (Math.random() - 0.5) * jitter;
    ctx.lineTo(px, py);
  }
  // 左邊
  for (let i = segments - 1; i >= 0; i--) {
    const px = x + (Math.random() - 0.5) * jitter;
    const py = y + (h / segments) * i;
    ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

// 繪製像素陰影 (偏移色塊)
function drawPixelShadow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  offset: number = 3
): void {
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(x + offset, y + offset, w, h);
  ctx.restore();
}

// 確保 Canvas 使用像素渲染 (disable smoothing)
export function setupPixelRendering(ctx: CanvasRenderingContext2D): void {
  ctx.imageSmoothingEnabled = false;
  // @ts-expect-error vendor prefix
  ctx.mozImageSmoothingEnabled = false;
  // @ts-expect-error vendor prefix
  ctx.webkitImageSmoothingEnabled = false;
  // @ts-expect-error vendor prefix
  ctx.msImageSmoothingEnabled = false;
}

// === 背景繪製 ===

// 繪製背景
export function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  // 像素風格的雪地底色 - 帶微妙的紙張質感
  ctx.fillStyle = COLORS.pixel.paper;
  ctx.fillRect(0, 0, width, height);

  // 繪製像素網格暗示（極淡）
  ctx.save();
  ctx.strokeStyle = 'rgba(180, 170, 150, 0.12)';
  ctx.lineWidth = 1;
  const gridSize = 32;
  for (let gx = 0; gx < width; gx += gridSize) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, height);
    ctx.stroke();
  }
  for (let gy = 0; gy < height; gy += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(width, gy);
    ctx.stroke();
  }
  ctx.restore();

  // 繪製裝飾用雪堆（像素風格）
  drawDecorativeSnowPiles(ctx, width, height);

  // 繪製敵人區域邊界（手繪像素邊框）
  drawEnemyAreaBoundary(ctx, width, height);

  // 繪製玩家區域邊界（手繪像素邊框）
  drawPlayerAreaBoundary(ctx, width, height);
}

// 繪製裝飾用雪堆（像素風格 - 簡化幾何）
function drawDecorativeSnowPiles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  ctx.save();

  DECORATIVE_SNOW_PILES.forEach((pile) => {
    const x = width * pile.x;
    const y = height * pile.y;
    const baseWidth = 36;
    const pileHeight = 16;

    // 像素風格三角雪堆
    ctx.beginPath();
    ctx.moveTo(x - baseWidth / 2, y + pileHeight / 2);
    ctx.lineTo(x, y - pileHeight / 2);
    ctx.lineTo(x + baseWidth / 2, y + pileHeight / 2);
    ctx.closePath();

    ctx.fillStyle = 'rgba(200, 215, 230, 0.35)';
    ctx.fill();

    // 像素描邊
    ctx.strokeStyle = 'rgba(160, 175, 190, 0.3)';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'miter';
    ctx.stroke();

    // 雪堆頂部小點裝飾
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(x - 2, y - pileHeight / 2 - 2, 4, 4);
  });

  ctx.restore();
}

// 繪製敵人區域邊界（像素風格虛線框）
function drawEnemyAreaBoundary(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const minX = width * BOUNDS.enemy.minX;
  const maxX = width * BOUNDS.enemy.maxX;
  const minY = height * BOUNDS.enemy.minY;
  const maxY = height * BOUNDS.enemy.maxY;

  ctx.save();
  ctx.strokeStyle = '#C8B8A0';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'miter';
  ctx.lineCap = 'square';
  ctx.setLineDash([8, 6]);

  ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
  ctx.setLineDash([]);
  ctx.restore();
}

// 繪製玩家區域邊界（像素風格虛線框）
function drawPlayerAreaBoundary(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const minX = width * BOUNDS.player.minX;
  const maxX = width * BOUNDS.player.maxX;
  const minY = height * BOUNDS.player.minY;
  const maxY = height * BOUNDS.player.maxY;

  ctx.save();
  ctx.strokeStyle = '#C8B8A0';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'miter';
  ctx.lineCap = 'square';
  ctx.setLineDash([8, 6]);

  ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
  ctx.setLineDash([]);
  ctx.restore();
}

// === 角色繪製 ===

// 繪製玩家 (使用色塊)
export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  player: Player,
  scale: number,
  images: GameImages,
  now: number
): void {
  // 死亡動畫完成後不再繪製
  if (!player.alive && player.deadState >= 3) return;

  const radius = BASE_PLAYER_RADIUS * scale;
  const { x, y } = player;
  const isStunned = now < player.stunUntil;

  // SVG 圖片繪製參數（調整為適應新 SVG）
  const offsetX = 0;
  const offsetY = -8;
  const targetH = 48;

  ctx.save();

  if (isStunned) {
    ctx.globalAlpha = 0.5;
  }

  // 優先檢查死亡狀態
  if (player.deadState) {
    const img = images.playerDead;
    if (img && img.complete && img.naturalWidth > 0) {
      const imgScale = targetH / img.naturalHeight;
      const targetW = img.naturalWidth * imgScale;
      ctx.drawImage(img, x - targetW / 2 + offsetX, y - targetH / 2 + offsetY, targetW, targetH);
      ctx.restore();
      return;
    }
  }

  // 蓄力/準備投擲狀態
  if (player.charging && player.alive) {
    const img = images.playerPrepare;
    if (img && img.complete && img.naturalWidth > 0) {
      const imgScale = targetH / img.naturalHeight;
      const targetW = img.naturalWidth * imgScale;
      ctx.drawImage(img, x - targetW / 2 + offsetX, y - targetH / 2 + offsetY, targetW, targetH);
      // 繪製控制圈指示
      drawControlCircle(ctx, x, y, player.hp);
      // 血量顯示
      drawHpBar(ctx, x, y - radius - 15, player.hp, PLAYER_MAX_HP, scale);
      ctx.restore();
      return;
    }
  }

  // 平常站立狀態
  if (player.alive && !player.deadState) {
    const img = images.player;
    if (img && img.complete && img.naturalWidth > 0) {
      const imgScale = targetH / img.naturalHeight;
      const targetW = img.naturalWidth * imgScale;
      ctx.drawImage(img, x - targetW / 2 + offsetX, y - targetH / 2 + offsetY, targetW, targetH);
      // 繪製控制圈指示
      drawControlCircle(ctx, x, y, player.hp);
      // 血量顯示
      drawHpBar(ctx, x, y - radius - 15, player.hp, PLAYER_MAX_HP, scale);
      ctx.restore();
      return;
    }
  }

  // Fallback: 幾何圖形
  ctx.save();
  ctx.translate(x, y);
  drawPlayerShape(ctx, 0, 0, radius, player.charging);
  ctx.restore();

  // 控制圈（fallback 也要畫）
  if (player.alive) {
    drawControlCircle(ctx, x, y, player.hp);
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
  // 身體 - 像素風格 (方形圓角改為方形)
  ctx.fillStyle = COLORS.player.body;
  ctx.strokeStyle = COLORS.player.outline;
  ctx.lineWidth = 2;
  ctx.lineJoin = 'miter';

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
    ctx.lineCap = 'square';
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
  // 死亡動畫完成後不再繪製
  if (!enemy.alive && enemy.deadState >= 3) return;

  const radius = BASE_ENEMY_RADIUS * scale;
  const { x, y, throwState } = enemy;
  const isStunned = now < enemy.stunUntil;
  const targetH = 48 * scale; // 調整為適應新 SVG

  ctx.save();

  if (isStunned) {
    ctx.globalAlpha = 0.5;
  }

  // 輔助函數：繪製置中圖片（調整為適應 SVG）
  const drawCenteredImage = (img: HTMLImageElement | null): boolean => {
    if (!img || !img.complete || !img.naturalWidth) return false;
    const imgScale = targetH / img.naturalHeight;
    const targetW = img.naturalWidth * imgScale;
    // 調整 y 偏移讓圖片看起來置中（SVG 人物偏上方）
    ctx.drawImage(img, x - targetW / 2, y - targetH / 2 - 8, targetW, targetH);
    return true;
  };

  // 優先檢查死亡狀態
  if (enemy.deadState) {
    if (drawCenteredImage(images.dead)) {
      ctx.restore();
      return;
    }
  }

  // 根據投擲狀態選擇圖片（參考 main.js 的邏輯順序）
  let drawn = false;
  switch (throwState) {
    case 'crouch':
      drawn = drawCenteredImage(images.crouch);
      break;
    case 'prepare':
      drawn = drawCenteredImage(images.prepare);
      break;
    case 'standup':
      drawn = drawCenteredImage(images.standup);
      break;
    case 'throw':
      drawn = drawCenteredImage(images.throw);
      break;
    case 'pain':
      drawn = drawCenteredImage(images.pain);
      break;
    case 'fall':
      drawn = drawCenteredImage(images.fall);
      break;
    case 'idle':
    default:
      // 行走動畫（參考 main.js：walkFrame 0 用 walk1，其他用 walk2）
      const walkImg = enemy.walkFrame % 30 < 15 ? images.walk1 : images.walk2;
      drawn = drawCenteredImage(walkImg);
      break;
  }

  if (drawn) {
    // 蓄力圈 (敵人準備投擲時)
    if (throwState === 'prepare' && enemy.charge > 0) {
      drawChargeCircle(ctx, x, y, radius, enemy.charge);
    }
    // 血量顯示
    drawHpBar(ctx, x, y - radius - 15, enemy.hp, ENEMY_MAX_HP, scale);
    ctx.restore();
    return;
  }

  // Fallback: 幾何圖形
  drawEnemyShape(ctx, x, y, radius, throwState);

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
  ctx.lineJoin = 'miter';

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
    ctx.lineCap = 'square';
    ctx.stroke();
  }
}

// === 物件繪製 ===

// 繪製掩體（像素風格雪堆）
export function drawBarrier(
  ctx: CanvasRenderingContext2D,
  barrier: Barrier,
  scale: number
): void {
  if (barrier.hp <= 0) return;

  const { x, y, radius } = barrier;
  const actualRadius = radius * 1.2;

  // 像素陰影
  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.fillRect(
    x - actualRadius + 3,
    y - actualRadius * 0.5 + 3,
    actualRadius * 2,
    actualRadius * 1.2
  );
  ctx.restore();

  // 雪堆主體 - 像素風格（簡化為方塊組合）
  ctx.save();
  ctx.fillStyle = '#F8F8F8';
  ctx.strokeStyle = '#B0B0B0';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'miter';

  // 用橢圓形但帶方角的風格
  ctx.beginPath();
  ctx.ellipse(x, y, actualRadius, actualRadius * 0.7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 像素風格高光
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x - actualRadius * 0.4, y - actualRadius * 0.3, 6, 6);
  ctx.fillRect(x - actualRadius * 0.15, y - actualRadius * 0.45, 4, 4);

  // 根據 HP 顯示損壞程度 (像素裂痕)
  if (barrier.hp < 3) {
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - actualRadius * 0.2, y - actualRadius * 0.1);
    ctx.lineTo(x, y + actualRadius * 0.1);
    ctx.lineTo(x + actualRadius * 0.15, y - actualRadius * 0.05);
    ctx.stroke();
  }
  if (barrier.hp < 2) {
    ctx.beginPath();
    ctx.moveTo(x + actualRadius * 0.1, y - actualRadius * 0.3);
    ctx.lineTo(x + actualRadius * 0.3, y);
    ctx.stroke();
  }

  ctx.restore();

  // 血量顯示
  drawHpBar(ctx, x, y - actualRadius - 10, barrier.hp, BARRIER_MAX_HP, scale);
}

// 繪製雪球（像素風格）
export function drawSnowball(
  ctx: CanvasRenderingContext2D,
  snowball: Snowball,
  scale: number
): void {
  const radius = SNOWBALL_RADIUS * scale;
  const { x, y } = snowball;

  // 像素陰影（偏移方塊）
  ctx.fillStyle = '#C0C0C0';
  ctx.fillRect(
    Math.round(x - radius + 2),
    Math.round(y - radius + 2),
    Math.round(radius * 2),
    Math.round(radius * 2)
  );

  // 雪球本體（圓形但無漸層 → 純色填充）
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = '#FAFAFA';
  ctx.fill();
  ctx.strokeStyle = '#D0D0D0';
  ctx.lineWidth = 1;
  ctx.stroke();

  // 像素風格高光（小方塊）
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(
    Math.round(x - radius * 0.4),
    Math.round(y - radius * 0.4),
    Math.round(radius * 0.5),
    Math.round(radius * 0.5)
  );
}

// === UI 繪製 ===

// 繪製控制圈指示（像素風格虛線圈）
function drawControlCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  hp: number
): void {
  const controlOffsetY = 35;
  const controlOffsetX = 35;
  const controlRadius = BASE_PLAYER_RADIUS + 15;

  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(x + controlOffsetX, y + controlOffsetY, controlRadius, 0, Math.PI * 2);
  ctx.strokeStyle = hp === PLAYER_MAX_HP ? '#30A14E' : '#E8A317';
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.3;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  ctx.restore();
}

// 繪製蓄力圈（像素風格方形擴展）
function drawChargeCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  charge: number
): void {
  const chargeSize = radius * (1 + charge);

  ctx.save();
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.arc(x, y, chargeSize, 0, Math.PI * 2);
  ctx.fillStyle = COLORS.charge.fill;
  ctx.fill();
  ctx.strokeStyle = COLORS.charge.stroke;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

// 繪製血量條（像素風格 - 方塊填充，無圓角）
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

  const bx = Math.round(x - barWidth / 2);
  const by = Math.round(y);
  const bw = Math.round(barWidth);
  const bh = Math.round(barHeight);

  // 像素陰影
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(bx + 2, by + 2, bw, bh);

  // 背景（深色）
  ctx.fillStyle = '#1A1A2E';
  ctx.fillRect(bx, by, bw, bh);

  // 血量
  let hpColor = COLORS.hp.full;
  if (hpRatio <= 0.33) {
    hpColor = COLORS.hp.low;
  } else if (hpRatio <= 0.66) {
    hpColor = COLORS.hp.medium;
  }

  ctx.fillStyle = hpColor;
  ctx.fillRect(bx, by, Math.round(bw * hpRatio), bh);

  // 像素邊框（無圓角）
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  ctx.lineJoin = 'miter';
  ctx.strokeRect(bx, by, bw, bh);

  // 高光線（頂部 1px 亮線）
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fillRect(bx + 1, by + 1, Math.round(bw * hpRatio) - 2, 1);
}

// 繪製關卡文字（像素字體）
export function drawLevelText(
  ctx: CanvasRenderingContext2D,
  level: number,
  width: number,
  height: number
): void {
  ctx.save();
  ctx.fillStyle = COLORS.ui.text;
  ctx.font = `bold 32px ${PIXEL_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 文字陰影
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillText(`LEVEL ${level}`, width / 2 + 3, height / 2 + 3);

  ctx.fillStyle = COLORS.ui.text;
  ctx.fillText(`LEVEL ${level}`, width / 2, height / 2);
  ctx.restore();
}

// 繪製遊戲結束畫面（像素風格）
export function drawGameOver(
  ctx: CanvasRenderingContext2D,
  isWin: boolean,
  level: number,
  score: number,
  width: number,
  height: number,
  t: { levelComplete: string; levelCompleted: string; clickToNextLevel: string; gameOver: string; finalScore: string; reachedLevel: string; clickToRestart: string }
): void {
  // 半透明覆蓋
  ctx.fillStyle = COLORS.ui.overlay;
  ctx.fillRect(0, 0, width, height);

  // 像素風格對話框背景
  const boxW = 500;
  const boxH = 260;
  const boxX = (width - boxW) / 2;
  const boxY = (height - boxH) / 2;

  // 對話框陰影
  drawPixelShadow(ctx, boxX, boxY, boxW, boxH, 5);

  // 對話框底色
  ctx.fillStyle = COLORS.pixel.paper;
  ctx.fillRect(boxX, boxY, boxW, boxH);

  // 對話框像素邊框
  drawPixelRect(ctx, boxX, boxY, boxW, boxH, COLORS.pixel.border, 3);

  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (isWin) {
    // 標題
    ctx.font = `bold 22px ${PIXEL_FONT}`;
    ctx.fillStyle = COLORS.pixel.border;
    ctx.fillText(t.levelComplete, width / 2, boxY + 60);

    ctx.font = `20px ${PIXEL_FONT_BODY}`;
    ctx.fillStyle = '#555';
    ctx.fillText(`${level} ${t.levelCompleted}`, width / 2, boxY + 110);

    // 點擊提示 (閃爍效果用靜態模擬)
    ctx.font = `16px ${PIXEL_FONT}`;
    ctx.fillStyle = COLORS.pixel.accent2;
    ctx.fillText(t.clickToNextLevel, width / 2, boxY + 180);
  } else {
    // 標題
    ctx.font = `bold 24px ${PIXEL_FONT}`;
    ctx.fillStyle = COLORS.pixel.accent;
    ctx.fillText(t.gameOver, width / 2, boxY + 50);

    ctx.font = `24px ${PIXEL_FONT_BODY}`;
    ctx.fillStyle = COLORS.pixel.border;
    ctx.fillText(`${t.finalScore}: ${score}`, width / 2, boxY + 110);

    ctx.font = `22px ${PIXEL_FONT_BODY}`;
    ctx.fillStyle = '#555';
    ctx.fillText(`${t.reachedLevel} ${level}`, width / 2, boxY + 150);

    // 點擊提示
    ctx.font = `14px ${PIXEL_FONT}`;
    ctx.fillStyle = COLORS.pixel.accent2;
    ctx.fillText(t.clickToRestart, width / 2, boxY + 210);
  }

  ctx.restore();
}

// 繪製開場問候（像素風格）
export function drawGreeting(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: { greetingTitle: string; greetingControlsPC: string; greetingControlsPCDesc: string; greetingControlsMobile: string; greetingControlsMobileDesc: string; greetingStart: string }
): void {
  ctx.save();

  // 像素風格對話框
  const boxW = 560;
  const boxH = 280;
  const boxX = (width - boxW) / 2;
  const boxY = (height - boxH) / 2;

  // 對話框陰影
  drawPixelShadow(ctx, boxX, boxY, boxW, boxH, 5);

  // 對話框底色
  ctx.fillStyle = COLORS.pixel.paper;
  ctx.fillRect(boxX, boxY, boxW, boxH);

  // 手繪像素邊框
  drawPixelRect(ctx, boxX, boxY, boxW, boxH, COLORS.pixel.border, 3);

  // 裝飾角標（左上 & 右下小方塊）
  ctx.fillStyle = COLORS.pixel.accent;
  ctx.fillRect(boxX - 4, boxY - 4, 12, 12);
  ctx.fillRect(boxX + boxW - 8, boxY + boxH - 8, 12, 12);
  ctx.fillStyle = COLORS.pixel.accent2;
  ctx.fillRect(boxX + boxW - 8, boxY - 4, 12, 12);
  ctx.fillRect(boxX - 4, boxY + boxH - 8, 12, 12);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 標題（像素字體）
  ctx.font = `bold 28px ${PIXEL_FONT}`;
  ctx.fillStyle = COLORS.pixel.border;
  // 文字陰影
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillText(t.greetingTitle, width / 2 + 2, boxY + 55 + 2);
  ctx.fillStyle = COLORS.pixel.border;
  ctx.fillText(t.greetingTitle, width / 2, boxY + 55);

  // 操作說明（VT323 大號字體）
  ctx.font = `26px ${PIXEL_FONT_BODY}`;
  ctx.fillStyle = '#444';

  const isMobile = isMobileDevice();

  if (isMobile) {
    ctx.fillText(t.greetingControlsMobile, width / 2, boxY + 120);
    ctx.font = `22px ${PIXEL_FONT_BODY}`;
    ctx.fillStyle = '#666';
    ctx.fillText(t.greetingControlsMobileDesc, width / 2, boxY + 155);
  } else {
    ctx.fillText(t.greetingControlsPC, width / 2, boxY + 120);
    ctx.font = `22px ${PIXEL_FONT_BODY}`;
    ctx.fillStyle = '#666';
    ctx.fillText(t.greetingControlsPCDesc, width / 2, boxY + 155);
  }

  // 開始提示（像素字體 + 強調色）
  ctx.font = `bold 16px ${PIXEL_FONT}`;
  ctx.fillStyle = COLORS.pixel.accent2;
  ctx.fillText(t.greetingStart, width / 2, boxY + 220);

  // 底部裝飾線
  ctx.strokeStyle = COLORS.pixel.border;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(boxX + 30, boxY + boxH - 30);
  ctx.lineTo(boxX + boxW - 30, boxY + boxH - 30);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore();
}
