// 遊戲狀態
export type GameState = 'showGreeting' | 'playing' | 'win' | 'lose' | 'pause';

// 敵人投擲狀態
export type EnemyThrowState = 'idle' | 'crouch' | 'prepare' | 'throw' | 'standup' | 'pain' | 'fall';

// 玩家
export interface Player {
  x: number;
  y: number;
  hp: number;
  alive: boolean;
  stunUntil: number;
  charging: boolean;
  charge: number;
  deadState: number;
  deadTime: number;
  baseX: number;
  baseY: number;
}

// 敵人
export interface Enemy {
  x: number;
  y: number;
  hp: number;
  alive: boolean;
  stunUntil: number;
  throwState: EnemyThrowState;
  throwStateStart: number;
  walkFrame: number;
  deadState: number;
  deadTime: number;
  moveSpeed: number;
  targetX: number;
  targetY: number;
  lastTargetChange: number;
  targetChangeInterval: number;
  charge: number;
  chargeStart: number;
}

// 雪球
export interface Snowball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  from: 'player' | 'enemy';
  maxDistance: number;
  startX: number;
  startY: number;
}

// 掩體（雪堆）
export interface Barrier {
  x: number;
  y: number;
  radius: number;
  hp: number;
}

// 排行榜項目
export interface LeaderboardEntry {
  score: number;
  date: string;
  time: string;
}

// Canvas 尺寸
export interface CanvasSize {
  width: number;
  height: number;
  scale: number;
}

// 遊戲圖片資源
export interface GameImages {
  player: HTMLImageElement | null;
  playerIdle: HTMLImageElement | null;
  playerPrepare: HTMLImageElement | null;
  crouch: HTMLImageElement | null;
  prepare: HTMLImageElement | null;
  standup: HTMLImageElement | null;
  throw: HTMLImageElement | null;
  walk1: HTMLImageElement | null;
  walk2: HTMLImageElement | null;
  dead: HTMLImageElement | null;
  pain: HTMLImageElement | null;
  fall: HTMLImageElement | null;
}

// 遊戲音效資源
export interface GameSounds {
  throw1: HTMLAudioElement | null;
  throw2: HTMLAudioElement | null;
  hit: HTMLAudioElement | null;
  death: HTMLAudioElement | null;
  levelStart: HTMLAudioElement | null;
}
