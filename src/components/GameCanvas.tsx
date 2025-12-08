'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useCanvasEvents } from '@/hooks/useCanvasEvents';
import AttackButton from '@/components/AttackButton';
import type { GameImages } from '@/types/game';
import {
  ASPECT_RATIO,
} from '@/utils/constants';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<GameImages>({
    player: null,
    playerPrepare: null,
    playerDead: null,
    crouch: null,
    prepare: null,
    standup: null,
    throw: null,
    walk1: null,
    walk2: null,
    dead: null,
    pain: null,
    fall: null,
  });

  const {
    setCanvasSize,
    setIsLoading,
    setLoadingProgress,
    isLoading,
  } = useGameStore();

  // 載入圖片
  useEffect(() => {
    const imageList: { key: keyof GameImages; src: string }[] = [
      // 玩家圖片
      { key: 'player', src: '/img/player.png' },           // 站立狀態
      { key: 'playerPrepare', src: '/img/player_prepare.png' }, // 蓄力狀態
      { key: 'playerDead', src: '/img/player_dead.png' },  // 死亡狀態
      // 敵人圖片
      { key: 'crouch', src: '/img/crouch.png' },
      { key: 'prepare', src: '/img/prepare.png' },
      { key: 'standup', src: '/img/standup.png' },
      { key: 'throw', src: '/img/throw.png' },
      { key: 'walk1', src: '/img/walk1.png' },
      { key: 'walk2', src: '/img/walk2.png' },
      { key: 'dead', src: '/img/dead.png' },
      { key: 'pain', src: '/img/pain.png' },
      { key: 'fall', src: '/img/fall.png' },
    ];

    let loaded = 0;
    const total = imageList.length;
    const loadedImages: Partial<GameImages> = {};

    const checkAllLoaded = () => {
      loaded++;
      setLoadingProgress((loaded / total) * 100);

      if (loaded >= total) {
        setImages(loadedImages as GameImages);
        setIsLoading(false);
      }
    };

    imageList.forEach(({ key, src }) => {
      const img = new Image();
      img.onload = () => {
        loadedImages[key] = img;
        checkAllLoaded();
      };
      img.onerror = () => {
        // 圖片載入失敗，使用 null（會 fallback 到幾何圖形）
        loadedImages[key] = null;
        checkAllLoaded();
      };
      // 設定超時
      setTimeout(() => {
        if (!loadedImages[key]) {
          loadedImages[key] = null;
          checkAllLoaded();
        }
      }, 2000);
      img.src = src;
    });
  }, [setIsLoading, setLoadingProgress]);

  // 調整 Canvas 尺寸
  const resizeCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 固定使用 960x540 尺寸
    const maxWidth = 960;
    const maxHeight = 540;

    // 計算容器可用空間
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // 計算顯示尺寸（不超過最大尺寸，保持比例）
    let displayWidth = Math.min(containerWidth, maxWidth);
    let displayHeight = displayWidth / ASPECT_RATIO;

    if (displayHeight > Math.min(containerHeight, maxHeight)) {
      displayHeight = Math.min(containerHeight, maxHeight);
      displayWidth = displayHeight * ASPECT_RATIO;
    }

    // 設定 Canvas 邏輯尺寸（固定 960x540）
    canvas.width = maxWidth;
    canvas.height = maxHeight;

    // 設定 Canvas 顯示尺寸
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // 更新 store 中的尺寸
    setCanvasSize({
      width: maxWidth,
      height: maxHeight,
      scale: 1,
    });
  }, [setCanvasSize]);

  // 監聽視窗大小變化
  useEffect(() => {
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
    };
  }, [resizeCanvas]);

  // 使用遊戲迴圈和事件處理
  const { handleCanvasClick } = useGameLoop(canvasRef, images);
  const { handleTouchAttackStart, handleTouchAttackEnd } = useCanvasEvents(canvasRef, handleCanvasClick);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ backgroundColor: '#e5e5e5' }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="shadow-2xl cursor-pointer"
        style={{
          maxWidth: '960px',
          maxHeight: '540px',
          touchAction: 'none', // 防止瀏覽器預設的觸控行為
        }}
      />

      {/* 手機版攻擊按鈕 */}
      <AttackButton
        onAttackStart={handleTouchAttackStart}
        onAttackEnd={handleTouchAttackEnd}
      />

      {/* 載入中 */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200/80">
          <div className="text-gray-700 text-2xl mb-4">載入中...</div>
          <div className="w-64 h-2 bg-gray-400 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${useGameStore.getState().loadingProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
