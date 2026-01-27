import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '@/stores/gameStore';
import type { GameImages } from '@/types/game';
import {
  drawBackground,
  drawPlayer,
  drawEnemy,
  drawSnowball,
  drawBarrier,
  drawGreeting,
  drawGameOver,
  setupPixelRendering,
} from '@/utils/renderer';
import {
  checkSnowballHitPlayer,
  checkSnowballHitEnemy,
  checkSnowballHitBarrier,
  checkSnowballMaxDistance,
  checkSnowballOutOfBounds,
  updateSnowballPosition,
} from '@/utils/physics';
import { updateEnemyAI, handleEnemyHit, setLevelStartTime } from '@/utils/enemyAI';
import {
  STUN_DURATION,
  CHARGE_TIME,
  SCORE_PER_HIT,
} from '@/utils/constants';

export function useGameLoop(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  images: GameImages
) {
  const animationFrameRef = useRef<number>(0);

  // 精細化 Zustand 訂閱，避免過度訂閱
  // 使用選擇器只訂閱需要的狀態，減少不必要的 re-render
  const gameState = useGameStore((s) => s.gameState);
  const setGameState = useGameStore((s) => s.setGameState);
  const level = useGameStore((s) => s.level);
  const score = useGameStore((s) => s.score);
  const players = useGameStore((s) => s.players);
  const enemies = useGameStore((s) => s.enemies);
  const snowballs = useGameStore((s) => s.snowballs);
  const barriers = useGameStore((s) => s.barriers);
  const updatePlayer = useGameStore((s) => s.updatePlayer);
  const updateEnemy = useGameStore((s) => s.updateEnemy);
  const updateBarrier = useGameStore((s) => s.updateBarrier);
  const addSnowball = useGameStore((s) => s.addSnowball);
  const removeSnowball = useGameStore((s) => s.removeSnowball);
  const addScore = useGameStore((s) => s.addScore);
  const canvasSize = useGameStore((s) => s.canvasSize);
  const startLevel = useGameStore((s) => s.startLevel);
  const resetGame = useGameStore((s) => s.resetGame);
  const addScoreToLeaderboard = useGameStore((s) => s.addScoreToLeaderboard);
  const hitCount = useGameStore((s) => s.hitCount);
  const hitTarget = useGameStore((s) => s.hitTarget);
  const addHitCount = useGameStore((s) => s.addHitCount);

  // 更新蓄力中的玩家
  const updateChargingPlayers = useCallback((now: number) => {
    players.forEach((player, index) => {
      if (player.charging) {
        const chargeProgress = Math.min(1, (now - player.charge) / CHARGE_TIME);
        updatePlayer(index, { charge: chargeProgress });
      }
    });
  }, [players, updatePlayer]);

  // 批量更新雪球狀態，避免多次 setState
  // 一次性收集所有狀態變化，然後批量更新
  const updateSnowballs = useCallback((now: number) => {
    const { width, height, scale } = canvasSize;
    const toRemove: number[] = [];
    const updatedSnowballs: typeof snowballs = [];

    snowballs.forEach((snowball, index) => {
      // 更新位置
      const updated = updateSnowballPosition(snowball);

      // 檢查是否出界或超過最大距離
      if (
        checkSnowballOutOfBounds(updated, width, height) ||
        checkSnowballMaxDistance(updated, scale)
      ) {
        toRemove.push(index);
        return;
      }

      let shouldRemove = false;

      // 檢查碰撞
      if (snowball.from === 'player') {
        // 玩家雪球打敵人
        // 明確的早期退出點，避免邏輯混亂
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          if (checkSnowballHitEnemy(updated, enemy, scale)) {
            const hitResult = handleEnemyHit(enemy, now);
            updateEnemy(i, hitResult);
            addScore(SCORE_PER_HIT);
            addHitCount(); // 增加命中計數
            shouldRemove = true;
            break; // 退出敵人迴圈
          }
        }
      } else {
        // 敵人雪球檢測優先級：掩體 > 玩家
        // 分層碰撞檢測，先檢查掩體再檢查玩家

        // 第一層：檢查是否擊中掩體
        for (let i = 0; i < barriers.length; i++) {
          const barrier = barriers[i];
          if (checkSnowballHitBarrier(updated, barrier, scale)) {
            const newHp = barrier.hp - 1;
            updateBarrier(i, { hp: newHp });
            shouldRemove = true;
            break; // 掩體被擊中，不再檢查玩家
          }
        }

        // 第二層：僅在未擊中掩體的情況下檢查玩家
        if (!shouldRemove) {
          for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (checkSnowballHitPlayer(updated, player, scale)) {
              const newHp = player.hp - 1;
              if (newHp <= 0) {
                updatePlayer(i, {
                  hp: 0,
                  alive: false,
                  deadState: 1,
                  deadTime: now,
                });
              } else {
                updatePlayer(i, {
                  hp: newHp,
                  stunUntil: now + STUN_DURATION,
                });
              }
              shouldRemove = true;
              break; // 玩家被擊中，退出迴圈
            }
          }
        }
      }

      // 只將未移除的雪球加入更新列表
      if (!shouldRemove) {
        updatedSnowballs.push(updated);
      }
    });

    // 一次性批量更新所有雪球狀態
    useGameStore.setState({ snowballs: updatedSnowballs });

    // 移除已處理的雪球（從後往前刪除避免索引問題）
    // 注：由於改用 updatedSnowballs 重建列表，不需要逐個 removeSnowball
  }, [snowballs, players, enemies, barriers, canvasSize, updatePlayer, updateEnemy, updateBarrier, addScore, addHitCount]);

  // 更新敵人 AI
  const updateEnemies = useCallback((now: number) => {
    const { width, height, scale } = canvasSize;

    enemies.forEach((enemy, index) => {
      if (!enemy.alive) return;

      const result = updateEnemyAI(enemy, players, now, width, height, scale);

      if (Object.keys(result.enemy).length > 0) {
        updateEnemy(index, result.enemy);
      }

      if (result.snowball) {
        addSnowball(result.snowball);
      }
    });
  }, [enemies, players, canvasSize, updateEnemy, addSnowball]);

  // 檢查遊戲結束條件
  const checkGameEnd = useCallback(() => {
    const allPlayersDead = players.every((p) => !p.alive);
    const allEnemiesDead = enemies.every((e) => !e.alive);

    if (allPlayersDead && gameState === 'playing') {
      setGameState('lose');
      addScoreToLeaderboard(score);
    } else if (allEnemiesDead && gameState === 'playing') {
      setGameState('win');
    }
  }, [players, enemies, gameState, score, setGameState, addScoreToLeaderboard]);

  // 渲染遊戲畫面
  const render = useCallback((ctx: CanvasRenderingContext2D, now: number) => {
    const { width, height, scale } = canvasSize;

    // 清空畫布
    ctx.clearRect(0, 0, width, height);

    // 繪製背景
    drawBackground(ctx, width, height);

    // 根據遊戲狀態繪製
    if (gameState === 'showGreeting') {
      const { t } = useGameStore.getState();
      drawGreeting(ctx, width, height, t);
    } else {
      // 繪製掩體（雪堆）
      barriers.forEach((barrier) => {
        drawBarrier(ctx, barrier, scale);
      });

      // 繪製玩家
      players.forEach((player) => {
        drawPlayer(ctx, player, scale, images, now);
      });

      // 繪製敵人
      enemies.forEach((enemy) => {
        drawEnemy(ctx, enemy, scale, images, now);
      });

      // 繪製雪球
      snowballs.forEach((snowball) => {
        drawSnowball(ctx, snowball, scale);
      });

      // 繪製遊戲結束畫面
      if (gameState === 'win') {
        const { t } = useGameStore.getState();
        drawGameOver(ctx, true, level, score, width, height, t);
      } else if (gameState === 'lose') {
        const { t } = useGameStore.getState();
        drawGameOver(ctx, false, level, score, width, height, t);
      }
    }
  }, [gameState, players, enemies, snowballs, barriers, level, score, canvasSize, images]);

  // 遊戲主迴圈 - 使用 useRef 存儲最新的函數避免 immutability 問題
  const gameLoopRef = useRef<((timestamp: number) => void) | null>(null);

  // 使用 useEffect 更新 gameLoopRef，避免在 render 期間更新 ref
  useEffect(() => {
    gameLoopRef.current = (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 確保像素渲染模式 (每幀重設，因為瀏覽器可能重置)
      setupPixelRendering(ctx);

      const now = timestamp;

      // 開場畫面不自動開始，等待玩家點擊
      // （點擊處理在 handleCanvasClick 中）

      // 遊戲進行中更新邏輯
      if (gameState === 'playing') {
        updateChargingPlayers(now);
        updateSnowballs(now);
        updateEnemies(now);
        checkGameEnd();
      }

      // 渲染
      render(ctx, now);

      // 繼續下一幀
      animationFrameRef.current = requestAnimationFrame((ts) => gameLoopRef.current?.(ts));
    };
  });

  // 加強 RAF cleanup，避免記憶體洩漏
  // 明確檢查 canvas 是否存在，確保 RAF 不會在已卸載的 DOM 上運行
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // 提前退出，避免無效的 RAF 啟動

    animationFrameRef.current = requestAnimationFrame((ts) => gameLoopRef.current?.(ts));

    return () => {
      // cleanup：取消所有待定的 RAF
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // 只在 mount 時啟動一次

  // 處理畫布點擊（開場開始 & 遊戲結束後的重啟）
  const handleCanvasClick = useCallback(() => {
    if (gameState === 'showGreeting') {
      setLevelStartTime(performance.now()); // 記錄關卡開始時間
      startLevel(1);
    } else if (gameState === 'win') {
      setLevelStartTime(performance.now()); // 記錄新關卡開始時間
      startLevel(level + 1);
    } else if (gameState === 'lose') {
      setLevelStartTime(performance.now()); // 記錄新關卡開始時間
      resetGame();
    }
  }, [gameState, level, startLevel, resetGame]);

  return { handleCanvasClick };
}
