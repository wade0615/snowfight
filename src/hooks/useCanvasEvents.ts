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
import { isMobileDevice } from '@/utils/deviceDetection';

export function useCanvasEvents(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  handleCanvasClick: () => void
): {
  handleTouchAttackStart: () => void;
  handleTouchAttackEnd: () => void;
} {
  const chargeStartRef = useRef<number>(0);
  // 記錄點擊時的偏移量（參考 main.js）
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  // 用於區分 PC 和移動端
  const isTouchDeviceRef = useRef<boolean>(false);
  // 空白鍵蓄力相關
  const spaceChargeStartRef = useRef<number>(0);
  const isSpaceChargingRef = useRef<boolean>(false);

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
      const { width, height } = canvasSize;

      // 檢查是否為手機裝置（會旋轉 90 度）
      const isMobile = isMobileDevice();

      if (isMobile) {
        // 手機版畫面旋轉了 90 度，需要反向轉換座標
        // 旋轉後：觸控的 X 對應 canvas 的 Y，觸控的 Y 對應 canvas 的 X（但方向相反）
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 計算相對於旋轉中心的偏移
        const offsetX = clientX - centerX;
        const offsetY = clientY - centerY;

        // 逆向旋轉 90 度：(x, y) -> (y, -x)
        const rotatedX = offsetY;
        const rotatedY = -offsetX;

        // 轉換回 canvas 坐標
        const scaleX = width / rect.height;  // 注意：旋轉後寬高互換
        const scaleY = height / rect.width;

        return {
          x: (rotatedX + rect.height / 2) * scaleX,
          y: (rotatedY + rect.width / 2) * scaleY,
        };
      } else {
        // PC 版不旋轉，直接轉換
        const scaleX = width / rect.width;
        const scaleY = height / rect.height;

        return {
          x: (clientX - rect.left) * scaleX,
          y: (clientY - rect.top) * scaleY,
        };
      }
    },
    [canvasRef, canvasSize]
  );

  // 處理滑鼠/觸控按下
  const handlePointerDown = useCallback(
    (x: number, y: number) => {
      if (gameState !== 'playing') return;

      const playerIndex = findPlayerAtPosition(x, y, players);

      if (playerIndex !== null) {
        const player = players[playerIndex];
        if (player.alive && Date.now() >= player.stunUntil) {
          // 記錄點擊位置與玩家位置的偏移量（參考 main.js）
          dragOffsetRef.current = {
            x: x - player.x,
            y: y - player.y,
          };
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
    [gameState, players, setSelectedPlayer, setIsDragging, updatePlayer]
  );

  // 處理滑鼠/觸控移動
  const handlePointerMove = useCallback(
    (x: number, y: number) => {
      if (!isDragging || selectedPlayerIndex === null) return;

      const { width, height, scale } = canvasSize;
      // 使用偏移量計算新位置，避免玩家「跳」到滑鼠位置（參考 main.js）
      const newX = x - dragOffsetRef.current.x;
      const newY = y - dragOffsetRef.current.y;
      const constrained = constrainPlayerPosition(newX, newY, width, height, scale);

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

    // 玩家留在釋放位置，更新 baseX/baseY 為新位置
    updatePlayer(selectedPlayerIndex, {
      baseX: player.x,
      baseY: player.y,
      charging: false,
      charge: 0,
    });

    // PC 端保持選中狀態，手機端也保持選中（改為使用攻擊按鈕）
    setIsDragging(false);
  }, [
    isDragging,
    selectedPlayerIndex,
    players,
    updatePlayer,
    setIsDragging,
  ]);

  // 處理空白鍵按下（開始蓄力）
  const handleSpaceDown = useCallback(() => {
    if (gameState !== 'playing') return;
    if (selectedPlayerIndex === null) return;
    if (isSpaceChargingRef.current) return; // 防止重複觸發

    const player = players[selectedPlayerIndex];
    if (!player || !player.alive || Date.now() < player.stunUntil) return;

    isSpaceChargingRef.current = true;
    spaceChargeStartRef.current = Date.now();
    updatePlayer(selectedPlayerIndex, {
      charging: true,
      charge: spaceChargeStartRef.current,
    });
  }, [gameState, selectedPlayerIndex, players, updatePlayer]);

  // 處理空白鍵放開（發射雪球）
  const handleSpaceUp = useCallback(() => {
    if (!isSpaceChargingRef.current) return;
    if (selectedPlayerIndex === null) return;

    const player = players[selectedPlayerIndex];
    if (!player) return;

    const { scale } = canvasSize;
    const chargeTime = Date.now() - spaceChargeStartRef.current;
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

    // 重置蓄力狀態
    updatePlayer(selectedPlayerIndex, {
      charging: false,
      charge: 0,
    });

    isSpaceChargingRef.current = false;
    spaceChargeStartRef.current = 0;
  }, [selectedPlayerIndex, players, canvasSize, addSnowball, updatePlayer]);

  // 觸控攻擊按鈕 - 開始蓄力
  const handleTouchAttackStart = useCallback(() => {
    if (gameState !== 'playing') return;
    if (selectedPlayerIndex === null) return;

    const player = players[selectedPlayerIndex];
    if (!player || !player.alive || Date.now() < player.stunUntil) return;

    spaceChargeStartRef.current = Date.now();
    updatePlayer(selectedPlayerIndex, {
      charging: true,
      charge: spaceChargeStartRef.current,
    });
  }, [gameState, selectedPlayerIndex, players, updatePlayer]);

  // 觸控攻擊按鈕 - 放開發射
  const handleTouchAttackEnd = useCallback(() => {
    if (selectedPlayerIndex === null) return;

    const player = players[selectedPlayerIndex];
    if (!player || !player.charging) return;

    const { scale } = canvasSize;
    const chargeTime = Date.now() - spaceChargeStartRef.current;
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

    // 重置蓄力狀態
    updatePlayer(selectedPlayerIndex, {
      charging: false,
      charge: 0,
    });

    spaceChargeStartRef.current = 0;
  }, [selectedPlayerIndex, players, canvasSize, addSnowball, updatePlayer]);

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
      isTouchDeviceRef.current = true; // 標記為觸控裝置

      // 在開場、win、lose 畫面時，直接處理點擊
      if (gameState === 'showGreeting' || gameState === 'win' || gameState === 'lose') {
        handleCanvasClick();
        return;
      }

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

    // Keyboard events (全局監聽，因為 canvas 不一定有焦點)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault(); // 防止頁面滾動
        handleSpaceDown();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleSpaceUp();
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd, { passive: false });

    // 鍵盤事件綁定到 window，確保不會漏掉
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);

      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);

      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [
    canvasRef,
    getCanvasCoords,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleSpaceDown,
    handleSpaceUp,
    handleCanvasClick,
    gameState,
  ]);

  return {
    handleTouchAttackStart,
    handleTouchAttackEnd,
  };
}
