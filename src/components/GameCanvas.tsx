'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { useGameLoop } from '@/hooks/useGameLoop';
import { useCanvasEvents } from '@/hooks/useCanvasEvents';
import type { GameImages } from '@/types/game';
import {
  BASE_WIDTH_DESKTOP,
  BASE_HEIGHT_DESKTOP,
  BASE_WIDTH_MOBILE,
  BASE_HEIGHT_MOBILE,
  ASPECT_RATIO,
} from '@/utils/constants';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<GameImages>({
    player: null,
    playerIdle: null,
    playerPrepare: null,
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
    canvasSize,
    setIsLoading,
    setLoadingProgress,
    isLoading,
    gameState,
  } = useGameStore();

  // 載入圖片
  useEffect(() => {
    const imageList: { key: keyof GameImages; src: string }[] = [
      { key: 'player', src: '/img/player.png' },
      { key: 'playerIdle', src: '/img/player_idle.png' },
      { key: 'playerPrepare', src: '/img/player_prepare.png' },
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

    const isMobile = window.innerWidth < 768;
    const baseWidth = isMobile ? BASE_WIDTH_MOBILE : BASE_WIDTH_DESKTOP;
    const baseHeight = isMobile ? BASE_HEIGHT_MOBILE : BASE_HEIGHT_DESKTOP;

    // 計算容器可用空間
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // 根據容器尺寸計算縮放
    let width = containerWidth;
    let height = containerWidth / ASPECT_RATIO;

    if (height > containerHeight) {
      height = containerHeight;
      width = containerHeight * ASPECT_RATIO;
    }

    // 設定 Canvas 尺寸（不使用 dpr，簡化座標計算）
    canvas.width = baseWidth;
    canvas.height = baseHeight;

    // 設定 Canvas 顯示尺寸
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // 更新 store 中的尺寸
    setCanvasSize({
      width: baseWidth,
      height: baseHeight,
      scale: baseWidth / BASE_WIDTH_MOBILE,
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
  useCanvasEvents(canvasRef);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center bg-gray-900"
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="rounded-lg shadow-2xl cursor-pointer"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />

      {/* 載入中 */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80">
          <div className="text-white text-2xl mb-4">載入中...</div>
          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
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
