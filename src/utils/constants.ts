// 畫布基礎尺寸
export const BASE_WIDTH_DESKTOP = 1440;
export const BASE_HEIGHT_DESKTOP = 810;
export const BASE_WIDTH_MOBILE = 960;
export const BASE_HEIGHT_MOBILE = 540;
export const ASPECT_RATIO = 16 / 9;

// 角色尺寸
export const BASE_PLAYER_RADIUS = 16; // 原本 26，縮小為 60%
export const BASE_ENEMY_RADIUS = 16; // 原本 26，縮小為 60%
export const SNOWBALL_RADIUS = 6; // 原本 10，同步縮小為 60%

// 角色數量
export const PLAYER_COUNT = 3;
export const ENEMY_START_COUNT = 3;
export const ENEMY_ADD_PER_LEVEL = 2;
export const MAX_LEVEL = 50;

// 血量
export const PLAYER_MAX_HP = 2;
export const ENEMY_MAX_HP = 3;
export const BARRIER_MAX_HP = 10;

// 時間常數 (毫秒)
export const STUN_DURATION = 1000;
export const CHARGE_TIME = 700;
export const GREETING_DURATION = 2000;

// 雪球速度
export const SNOWBALL_BASE_SPEED = 2;
export const SNOWBALL_MAX_SPEED = 8;
export const SNOWBALL_MAX_DISTANCE = 800;

// 敵人 AI
export const ENEMY_BASE_SPEED = 1.5;
export const ENEMY_THROW_INTERVAL_MIN = 3000;
export const ENEMY_THROW_INTERVAL_MAX = 5000;
export const ENEMY_TARGET_CHANGE_MIN = 1500;
export const ENEMY_TARGET_CHANGE_MAX = 3000;
export const ENEMY_FIRST_THROW_DELAY = 5000; // 開局後至少 5 秒才會投擲
export const ENEMY_ACCURACY = 0.4; // 敵人準確度 (0-1)，越低越不準

// 敵人動畫時間
export const ENEMY_CROUCH_DURATION = 200;
export const ENEMY_PREPARE_DURATION = 500;
export const ENEMY_THROW_DURATION = 200;
export const ENEMY_STANDUP_DURATION = 200;
export const ENEMY_PAIN_DURATION = 300;
export const ENEMY_FALL_DURATION = 500;

// 分數
export const SCORE_PER_HIT = 50;

// 顏色
export const COLORS = {
  sky: {
    top: "#87CEEB",
    bottom: "#E0F6FF",
  },
  player: {
    body: "#E74C3C",
    outline: "#C0392B",
  },
  enemy: {
    body: "#27AE60",
    outline: "#1E8449",
  },
  snowball: {
    fill: "#FFFFFF",
    shadow: "#E8E8E8",
  },
  charge: {
    fill: "rgba(255, 165, 0, 0.3)",
    stroke: "rgba(255, 165, 0, 0.8)",
  },
  hp: {
    full: "#2ECC71",
    medium: "#F39C12",
    low: "#E74C3C",
  },
  ui: {
    text: "#333333",
    overlay: "rgba(0, 0, 0, 0.7)",
  },
};

// 遊戲區域邊界 (相對於畫布尺寸的比例)
export const BOUNDS = {
  // 玩家拖曳活動區域 (擴大範圍)
  player: {
    minX: 0.1,
    maxX: 0.95,
    minY: 0.15,
    maxY: 0.95,
  },
  // 敵人活動區域 (左上三角形)
  enemy: {
    minX: 0.05,
    maxX: 0.85,
    minY: 0.1,
    maxY: 0.85,
  },
};

// 音量設定
export const VOLUME = {
  throw: 0.4,
  hit: 0.5,
  death: 0.6,
  levelStart: 0.3,
};

// 手機速度調整
export const MOBILE_SPEED_FACTOR = 0.7;
