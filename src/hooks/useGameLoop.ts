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
  GREETING_DURATION,
  STUN_DURATION,
  CHARGE_TIME,
  SCORE_PER_HIT,
} from '@/utils/constants';

export function useGameLoop(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  images: GameImages
) {
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const {
    gameState,
    setGameState,
    level,
    score,
    greetingStartTime,
    setGreetingStartTime,
    players,
    enemies,
    snowballs,
    barriers,
    updatePlayer,
    updateEnemy,
    updateBarrier,
    addSnowball,
    removeSnowball,
    clearSnowballs,
    addScore,
    canvasSize,
    startLevel,
    resetGame,
    addScoreToLeaderboard,
    selectedPlayerIndex,
  } = useGameStore();

  // 更新蓄力中的玩家
  const updateChargingPlayers = useCallback((now: number) => {
    players.forEach((player, index) => {
      if (player.charging) {
        const chargeProgress = Math.min(1, (now - player.charge) / CHARGE_TIME);
        updatePlayer(index, { charge: chargeProgress });
      }
    });
  }, [players, updatePlayer]);

  // 更新雪球
  const updateSnowballs = useCallback((now: number) => {
    const { width, height, scale } = canvasSize;
    const toRemove: number[] = [];

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

      // 檢查碰撞
      if (snowball.from === 'player') {
        // 玩家雪球打敵人
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          if (checkSnowballHitEnemy(updated, enemy, scale)) {
            const hitResult = handleEnemyHit(enemy, now);
            updateEnemy(i, hitResult);
            addScore(SCORE_PER_HIT);
            toRemove.push(index);
            return;
          }
        }
      } else {
        // 敵人雪球先檢查是否擊中掩體
        for (let i = 0; i < barriers.length; i++) {
          const barrier = barriers[i];
          if (checkSnowballHitBarrier(updated, barrier, scale)) {
            const newHp = barrier.hp - 1;
            updateBarrier(i, { hp: newHp });
            toRemove.push(index);
            return;
          }
        }

        // 敵人雪球打玩家
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
            toRemove.push(index);
            return;
          }
        }
      }

      // 更新雪球位置 (透過 store)
      useGameStore.setState((state) => ({
        snowballs: state.snowballs.map((s, i) =>
          i === index ? updated : s
        ),
      }));
    });

    // 移除已處理的雪球（從後往前刪除避免索引問題）
    toRemove
      .sort((a, b) => b - a)
      .forEach((index) => removeSnowball(index));
  }, [snowballs, players, enemies, barriers, canvasSize, updatePlayer, updateEnemy, updateBarrier, addScore, removeSnowball]);

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
      drawGreeting(ctx, width, height);
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
        drawGameOver(ctx, true, level, score, width, height);
      } else if (gameState === 'lose') {
        drawGameOver(ctx, false, level, score, width, height);
      }
    }
  }, [gameState, players, enemies, snowballs, barriers, level, score, canvasSize, images]);

  // 遊戲主迴圈
  const gameLoop = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [
    canvasRef,
    gameState,
    greetingStartTime,
    setGreetingStartTime,
    startLevel,
    updateChargingPlayers,
    updateSnowballs,
    updateEnemies,
    checkGameEnd,
    render,
  ]);

  // 啟動遊戲迴圈
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameLoop]);

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
