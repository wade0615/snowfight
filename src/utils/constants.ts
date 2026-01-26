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
export const PLAYER_COUNT = 1;
export const ENEMY_START_COUNT = 3;
export const ENEMY_ADD_PER_LEVEL = 2;
export const MAX_LEVEL = 50;

// 血量
export const PLAYER_MAX_HP = 5;
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

// 顏色 - Pixel Art / Hand-drawn 復古調色板
export const COLORS = {
  sky: {
    top: "#7EC8E3",    // 柔和天藍 (像素風)
    bottom: "#D4EDFC", // 淺藍
  },
  player: {
    body: "#E04040",    // NES 紅
    outline: "#8B0000", // 深紅描邊
  },
  enemy: {
    body: "#30A14E",    // NES 綠
    outline: "#1B5E20", // 深綠描邊
  },
  snowball: {
    fill: "#FAFAFA",
    shadow: "#C0C0C0",
  },
  charge: {
    fill: "rgba(255, 200, 0, 0.35)",
    stroke: "rgba(255, 160, 0, 0.9)",
  },
  hp: {
    full: "#30A14E",    // 像素綠
    medium: "#E8A317",  // 像素黃
    low: "#E04040",     // 像素紅
  },
  ui: {
    text: "#1A1A2E",
    overlay: "rgba(0, 0, 0, 0.75)",
  },
  // 新增 Pixel Art 專用色
  pixel: {
    bg: "#F0E6D3",        // 羊皮紙底色
    paper: "#FAF5EB",     // 紙張白
    border: "#1A1A2E",    // 深藍黑描邊
    shadow: "#2C2C2C",    // 陰影
    accent: "#E04040",    // 紅色強調
    accent2: "#3E7DC9",   // 藍色強調
    gold: "#E8A317",      // 金色
  },
};

// 遊戲區域邊界 (相對於畫布尺寸的比例) - 左右對分
export const BOUNDS = {
  // 玩家活動區域 (右半邊)
  player: {
    minX: 0.55,
    maxX: 0.95,
    minY: 0.1,
    maxY: 0.9,
  },
  // 敵人活動區域 (左半邊)
  enemy: {
    minX: 0.05,
    maxX: 0.45,
    minY: 0.1,
    maxY: 0.9,
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
