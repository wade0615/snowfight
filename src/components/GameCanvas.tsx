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
import { isMobileDevice } from '@/utils/deviceDetection';

// 手機版場地放大倍率
const MOBILE_CANVAS_SCALE = 1.2;

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

  const [isMobile] = useState(() => isMobileDevice());

  const {
    setCanvasSize,
    setIsLoading,
    setLoadingProgress,
    isLoading,
  } = useGameStore();

  // 載入圖片 (使用 SVG)
  useEffect(() => {
    const imageList: { key: keyof GameImages; src: string }[] = [
      // 玩家圖片
      { key: 'player', src: '/img/player.svg' },           // 站立狀態
      { key: 'playerPrepare', src: '/img/player_prepare.svg' }, // 蓄力狀態
      { key: 'playerDead', src: '/img/player_dead.svg' },  // 死亡狀態
      // 敵人圖片
      { key: 'crouch', src: '/img/bot_crouch.svg' },
      { key: 'prepare', src: '/img/bot_prepare.svg' },
      { key: 'standup', src: '/img/bot_stand.svg' },       // 使用站立圖作為站起
      { key: 'throw', src: '/img/bot_throw.svg' },
      { key: 'walk1', src: '/img/bot_walk1.svg' },
      { key: 'walk2', src: '/img/bot_walk2.svg' },
      { key: 'dead', src: '/img/bot_dead.svg' },
      { key: 'pain', src: '/img/bot_pain.svg' },
      { key: 'fall', src: '/img/bot_fall.svg' },
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
      style={{ backgroundColor: '#1a1a2e' }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="cursor-pointer"
        style={{
          maxWidth: '960px',
          maxHeight: '540px',
          touchAction: 'none',
          imageRendering: 'pixelated',
          border: isMobile ? 'none' : '4px solid #1a1a2e',
          boxShadow: isMobile ? 'none' : '6px 6px 0px 0px #0d0d1a',
          // 手機版放大 1.2 倍，讓場地與人物更大更清楚
          transform: isMobile ? `scale(${MOBILE_CANVAS_SCALE})` : 'none',
          transformOrigin: 'center center',
        }}
      />

      {/* 手機版攻擊按鈕 */}
      <AttackButton
        onAttackStart={handleTouchAttackStart}
        onAttackEnd={handleTouchAttackEnd}
      />

      {/* 載入中 - Pixel Art 風格 */}
      {isLoading && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: '#FAF5EB' }}
        >
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '16px',
              color: '#1a1a2e',
              marginBottom: '24px',
            }}
          >
            LOADING...
          </div>
          <div
            style={{
              width: '256px',
              height: '16px',
              background: '#1a1a2e',
              border: '3px solid #1a1a2e',
              boxShadow: '3px 3px 0px 0px #0d0d1a',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: '#30A14E',
                width: `${useGameStore.getState().loadingProgress}%`,
                imageRendering: 'pixelated',
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: '18px',
              color: '#888',
              marginTop: '12px',
            }}
          >
            {Math.round(useGameStore.getState().loadingProgress)}%
          </div>
        </div>
      )}
    </div>
  );
}
