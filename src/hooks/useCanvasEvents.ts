import { useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '@/stores/gameStore';
import type { Snowball } from '@/types/game';
import {
  findPlayerAtPosition,
  constrainPlayerPosition,
  calculateThrowVelocity,
  calculateMaxDistance,
} from '@/utils/physics';
import {
  SNOWBALL_BASE_SPEED,
  SNOWBALL_MAX_SPEED,
  CHARGE_TIME,
} from '@/utils/constants';

export function useCanvasEvents(
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  const chargeStartRef = useRef<number>(0);

  const {
    gameState,
    players,
    updatePlayer,
    selectedPlayerIndex,
    setSelectedPlayer,
    isDragging,
    setIsDragging,
    addSnowball,
    canvasSize,
  } = useGameStore();

  // 將螢幕座標轉換為 Canvas 座標
  const getCanvasCoords = useCallback(
    (clientX: number, clientY: number): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      // 使用 store 中的邏輯尺寸進行座標轉換
      const { width, height } = canvasSize;
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    },
    [canvasRef, canvasSize]
  );

  // 處理滑鼠/觸控按下
  const handlePointerDown = useCallback(
    (x: number, y: number) => {
      if (gameState !== 'playing') return;

      const { scale } = canvasSize;
      const playerIndex = findPlayerAtPosition(x, y, players, scale);

      if (playerIndex !== null) {
        const player = players[playerIndex];
        if (player.alive && Date.now() >= player.stunUntil) {
          setSelectedPlayer(playerIndex);
          setIsDragging(true);
          chargeStartRef.current = Date.now();
          updatePlayer(playerIndex, {
            charging: true,
            charge: chargeStartRef.current,
          });
        }
      }
    },
    [gameState, players, canvasSize, setSelectedPlayer, setIsDragging, updatePlayer]
  );

  // 處理滑鼠/觸控移動
  const handlePointerMove = useCallback(
    (x: number, y: number) => {
      if (!isDragging || selectedPlayerIndex === null) return;

      const { width, height, scale } = canvasSize;
      const constrained = constrainPlayerPosition(x, y, width, height, scale);

      updatePlayer(selectedPlayerIndex, {
        x: constrained.x,
        y: constrained.y,
      });
    },
    [isDragging, selectedPlayerIndex, canvasSize, updatePlayer]
  );

  // 處理滑鼠/觸控放開
  const handlePointerUp = useCallback(() => {
    if (!isDragging || selectedPlayerIndex === null) return;

    const player = players[selectedPlayerIndex];
    if (!player) return;

    const { scale } = canvasSize;
    const chargeTime = Date.now() - chargeStartRef.current;
    const charge = Math.min(1, chargeTime / CHARGE_TIME);

    // 固定朝左上方投擲
    const finalTargetX = player.x - 500;
    const finalTargetY = player.y - 500;

    const velocity = calculateThrowVelocity(
      player.x,
      player.y,
      finalTargetX,
      finalTargetY,
      charge,
      SNOWBALL_BASE_SPEED * scale,
      SNOWBALL_MAX_SPEED * scale
    );

    const snowball: Snowball = {
      x: player.x,
      y: player.y,
      vx: velocity.vx,
      vy: velocity.vy,
      from: 'player',
      maxDistance: calculateMaxDistance(charge),
      startX: player.x,
      startY: player.y,
    };

    addSnowball(snowball);

    // 玩家留在釋放位置，更新 baseX/baseY 為新位置
    updatePlayer(selectedPlayerIndex, {
      baseX: player.x,
      baseY: player.y,
      charging: false,
      charge: 0,
    });

    setSelectedPlayer(null);
    setIsDragging(false);
  }, [
    isDragging,
    selectedPlayerIndex,
    players,
    canvasSize,
    addSnowball,
    updatePlayer,
    setSelectedPlayer,
    setIsDragging,
  ]);

  // 綁定事件
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      if (coords) handlePointerDown(coords.x, coords.y);
    };

    const onMouseMove = (e: MouseEvent) => {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      if (coords) handlePointerMove(coords.x, coords.y);
    };

    const onMouseUp = () => {
      handlePointerUp();
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const coords = getCanvasCoords(touch.clientX, touch.clientY);
      if (coords) handlePointerDown(coords.x, coords.y);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const coords = getCanvasCoords(touch.clientX, touch.clientY);
      if (coords) handlePointerMove(coords.x, coords.y);
    };

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      handlePointerUp();
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);

      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [
    canvasRef,
    getCanvasCoords,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  ]);
}
