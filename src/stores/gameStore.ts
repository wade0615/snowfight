import { create } from 'zustand';
import type { GameState, Player, Enemy, Snowball, Barrier, LeaderboardEntry, CanvasSize } from '@/types/game';
import {
  PLAYER_COUNT,
  PLAYER_MAX_HP,
  ENEMY_START_COUNT,
  ENEMY_ADD_PER_LEVEL,
  ENEMY_MAX_HP,
  ENEMY_BASE_SPEED,
  ENEMY_TARGET_CHANGE_MIN,
  ENEMY_TARGET_CHANGE_MAX,
  BOUNDS,
  BASE_WIDTH_DESKTOP,
  BASE_HEIGHT_DESKTOP,
  BASE_PLAYER_RADIUS,
} from '@/utils/constants';
import type { Language, Translations } from '@/utils/i18n';
import { translations, getBrowserLanguage, getStoredLanguage, setStoredLanguage } from '@/utils/i18n';

interface GameStore {
  // 遊戲狀態
  gameState: GameState;
  level: number;
  score: number;
  greetingStartTime: number;
  hitCount: number; // 命中計數器
  hitTarget: number; // 過關所需命中次數

  // 角色
  players: Player[];
  enemies: Enemy[];
  snowballs: Snowball[];
  barriers: Barrier[];

  // 選中的玩家
  selectedPlayerIndex: number | null;
  isDragging: boolean;

  // Canvas 尺寸
  canvasSize: CanvasSize;

  // UI 狀態
  showLeaderboard: boolean;
  showInstructions: boolean;
  menuCollapsed: boolean;
  previousGameState: GameState | null; // 記錄暫停前的遊戲狀態

  // 載入狀態
  isLoading: boolean;
  loadingProgress: number;

  // 語言
  language: Language;
  t: Translations;

  // Actions
  setGameState: (state: GameState) => void;
  setLevel: (level: number) => void;
  setScore: (score: number) => void;
  addScore: (points: number) => void;
  setGreetingStartTime: (time: number) => void;
  addHitCount: () => void;
  resetHitCount: () => void;

  initPlayers: () => void;
  initEnemies: (count: number) => void;
  initBarriers: () => void;
  updatePlayer: (index: number, updates: Partial<Player>) => void;
  updateEnemy: (index: number, updates: Partial<Enemy>) => void;
  updateBarrier: (index: number, updates: Partial<Barrier>) => void;

  addSnowball: (snowball: Snowball) => void;
  removeSnowball: (index: number) => void;
  updateSnowball: (index: number, updates: Partial<Snowball>) => void;
  clearSnowballs: () => void;

  setSelectedPlayer: (index: number | null) => void;
  setIsDragging: (dragging: boolean) => void;

  setCanvasSize: (size: CanvasSize) => void;

  setShowLeaderboard: (show: boolean) => void;
  setShowInstructions: (show: boolean) => void;
  setMenuCollapsed: (collapsed: boolean) => void;

  setIsLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;

  setLanguage: (lang: Language) => void;

  startLevel: (level: number) => void;
  resetGame: () => void;

  // 排行榜
  getLeaderboard: () => LeaderboardEntry[];
  addScoreToLeaderboard: (score: number) => void;
  clearLeaderboard: () => void;
}

const createInitialPlayer = (index: number, canvasWidth: number, canvasHeight: number): Player => {
  // 玩家位置在右半邊中央
  const pos = { x: 0.75, y: 0.5 };
  return {
    x: canvasWidth * pos.x,
    y: canvasHeight * pos.y,
    hp: PLAYER_MAX_HP,
    alive: true,
    stunUntil: 0,
    charging: false,
    charge: 0,
    deadState: 0,
    deadTime: 0,
    baseX: canvasWidth * pos.x,
    baseY: canvasHeight * pos.y,
  };
};

const createInitialEnemy = (index: number, total: number, canvasWidth: number, canvasHeight: number): Enemy => {
  // 敵人在左半邊區域均勻分布
  const rows = Math.ceil(Math.sqrt(total));
  const cols = Math.ceil(total / rows);
  const row = Math.floor(index / cols);
  const col = index % cols;

  const xSpacing = (BOUNDS.enemy.maxX - BOUNDS.enemy.minX) / (cols + 1);
  const ySpacing = (BOUNDS.enemy.maxY - BOUNDS.enemy.minY) / (rows + 1);

  const x = canvasWidth * (BOUNDS.enemy.minX + xSpacing * (col + 1));
  const y = canvasHeight * (BOUNDS.enemy.minY + ySpacing * (row + 1));

  return {
    x,
    y,
    hp: ENEMY_MAX_HP,
    alive: true,
    stunUntil: 0,
    throwState: 'idle',
    throwStateStart: 0,
    walkFrame: 0,
    deadState: 0,
    deadTime: 0,
    moveSpeed: ENEMY_BASE_SPEED * (0.8 + Math.random() * 0.4),
    targetX: x,
    targetY: y,
    lastTargetChange: 0,
    targetChangeInterval: ENEMY_TARGET_CHANGE_MIN + Math.random() * (ENEMY_TARGET_CHANGE_MAX - ENEMY_TARGET_CHANGE_MIN),
    charge: 0,
    chargeStart: 0,
  };
};

export const useGameStore = create<GameStore>((set, get) => {
  // 初始化語言：優先使用儲存的語言，否則使用瀏覽器語言
  const initialLanguage = getStoredLanguage() || getBrowserLanguage();

  return {
    // 初始狀態
    gameState: 'showGreeting',
    level: 1,
    score: 0,
    greetingStartTime: 0,
    hitCount: 0,
    hitTarget: ENEMY_START_COUNT,

    players: [],
    enemies: [],
    snowballs: [],
    barriers: [],

    selectedPlayerIndex: null,
    isDragging: false,

    canvasSize: {
      width: BASE_WIDTH_DESKTOP,
      height: BASE_HEIGHT_DESKTOP,
      scale: 1,
    },

    showLeaderboard: false,
    showInstructions: false,
    menuCollapsed: false,
    previousGameState: null,

    isLoading: true,
    loadingProgress: 0,

    // 語言
    language: initialLanguage,
    t: translations[initialLanguage],

    // Actions
  setGameState: (state) => set({ gameState: state }),
  setLevel: (level) => set({ level }),
  setScore: (score) => set({ score }),
  addScore: (points) => set((state) => ({ score: state.score + points })),
  setGreetingStartTime: (time) => set({ greetingStartTime: time }),
  addHitCount: () => set((state) => ({ hitCount: state.hitCount + 1 })),
  resetHitCount: () => set({ hitCount: 0 }),

  initPlayers: () => {
    const { canvasSize } = get();
    const players = Array.from({ length: PLAYER_COUNT }, (_, i) =>
      createInitialPlayer(i, canvasSize.width, canvasSize.height)
    );
    set({ players });
  },

  initEnemies: (count) => {
    const { canvasSize } = get();
    const enemies = Array.from({ length: count }, (_, i) =>
      createInitialEnemy(i, count, canvasSize.width, canvasSize.height)
    );
    set({ enemies });
  },

  initBarriers: () => {
    const { canvasSize } = get();
    const scale = canvasSize.width / 960;
    const barrierRadius = BASE_PLAYER_RADIUS * scale * 1.5;

    // 在玩家側（右半邊左側邊緣）三等分放置掩體，面對敵人方向
    const barrierX = canvasSize.width * 0.58; // 玩家區域左側
    const barriers: Barrier[] = [
      {
        x: barrierX,
        y: canvasSize.height * 0.25, // 上方
        radius: barrierRadius,
        hp: 10,
      },
      {
        x: barrierX,
        y: canvasSize.height * 0.50, // 中央
        radius: barrierRadius,
        hp: 10,
      },
      {
        x: barrierX,
        y: canvasSize.height * 0.75, // 下方
        radius: barrierRadius,
        hp: 10,
      },
    ];
    set({ barriers });
  },

  updatePlayer: (index, updates) =>
    set((state) => ({
      players: state.players.map((p, i) => (i === index ? { ...p, ...updates } : p)),
    })),

  updateEnemy: (index, updates) =>
    set((state) => ({
      enemies: state.enemies.map((e, i) => (i === index ? { ...e, ...updates } : e)),
    })),

  updateBarrier: (index, updates) =>
    set((state) => ({
      barriers: state.barriers.map((b, i) => (i === index ? { ...b, ...updates } : b)),
    })),

  addSnowball: (snowball) =>
    set((state) => ({ snowballs: [...state.snowballs, snowball] })),

  removeSnowball: (index) =>
    set((state) => ({
      snowballs: state.snowballs.filter((_, i) => i !== index),
    })),

  updateSnowball: (index, updates) =>
    set((state) => ({
      snowballs: state.snowballs.map((s, i) => (i === index ? { ...s, ...updates } : s)),
    })),

  clearSnowballs: () => set({ snowballs: [] }),

  setSelectedPlayer: (index) => set({ selectedPlayerIndex: index }),
  setIsDragging: (dragging) => set({ isDragging: dragging }),

  setCanvasSize: (size) => set({ canvasSize: size }),

  setShowLeaderboard: (show) => {
    const { gameState, previousGameState } = get();
    if (show) {
      // 打開時：保存當前狀態並暫停
      if (gameState === 'playing') {
        set({ showLeaderboard: true, previousGameState: gameState, gameState: 'pause' });
      } else {
        set({ showLeaderboard: true });
      }
    } else {
      // 關閉時：恢復之前的狀態
      if (previousGameState) {
        set({ showLeaderboard: false, gameState: previousGameState, previousGameState: null });
      } else {
        set({ showLeaderboard: false });
      }
    }
  },
  setShowInstructions: (show) => {
    const { gameState, previousGameState } = get();
    if (show) {
      // 打開時：保存當前狀態並暫停
      if (gameState === 'playing') {
        set({ showInstructions: true, previousGameState: gameState, gameState: 'pause' });
      } else {
        set({ showInstructions: true });
      }
    } else {
      // 關閉時：恢復之前的狀態
      if (previousGameState) {
        set({ showInstructions: false, gameState: previousGameState, previousGameState: null });
      } else {
        set({ showInstructions: false });
      }
    }
  },
  setMenuCollapsed: (collapsed) => set({ menuCollapsed: collapsed }),

  setIsLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),

  setLanguage: (lang) => {
    setStoredLanguage(lang);
    set({ language: lang, t: translations[lang] });
  },

  startLevel: (level) => {
    const enemyCount = ENEMY_START_COUNT + (level - 1) * ENEMY_ADD_PER_LEVEL;
    get().initPlayers();
    get().initEnemies(enemyCount);
    get().initBarriers(); // 初始化掩體
    set({
      level,
      gameState: 'playing',
      snowballs: [],
      selectedPlayerIndex: null,
      isDragging: false,
      hitCount: 0,
      hitTarget: enemyCount, // 過關所需命中次數 = 敵方人數
    });
  },

  resetGame: () => {
    set({ score: 0, level: 1, hitCount: 0 });
    get().startLevel(1);
  },

  // 排行榜
  getLeaderboard: () => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem('snowball-fight-leaderboard');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addScoreToLeaderboard: (score) => {
    if (typeof window === 'undefined') return;
    const leaderboard = get().getLeaderboard();
    const now = new Date();
    const entry: LeaderboardEntry = {
      score,
      date: now.toLocaleDateString('zh-TW'),
      time: now.toLocaleTimeString('zh-TW'),
    };
    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    const top10 = leaderboard.slice(0, 10);
    localStorage.setItem('snowball-fight-leaderboard', JSON.stringify(top10));
  },

  clearLeaderboard: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('snowball-fight-leaderboard');
  },
};
});
