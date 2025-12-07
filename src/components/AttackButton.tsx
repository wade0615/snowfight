'use client';

import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';

interface AttackButtonProps {
  onAttackStart: () => void;
  onAttackEnd: () => void;
}

export default function AttackButton({ onAttackStart, onAttackEnd }: AttackButtonProps) {
  const [isCharging, setIsCharging] = useState(false);
  const [chargeProgress, setChargeProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const chargeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { gameState, selectedPlayerIndex } = useGameStore();

  // 偵測手機裝置
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 只在手機端且遊戲進行中顯示
  const shouldShow = isMobile && gameState === 'playing';

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedPlayerIndex === null) return;

    setIsCharging(true);
    setChargeProgress(0);
    onAttackStart();

    // 開始更新蓄力進度動畫
    const startTime = Date.now();
    chargeIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / 1000) * 100); // 1 秒達到 100%
      setChargeProgress(progress);
    }, 16); // 約 60fps
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isCharging) return;

    setIsCharging(false);
    setChargeProgress(0);
    onAttackEnd();

    if (chargeIntervalRef.current) {
      clearInterval(chargeIntervalRef.current);
      chargeIntervalRef.current = null;
    }
  };

  // 清理計時器
  useEffect(() => {
    return () => {
      if (chargeIntervalRef.current) {
        clearInterval(chargeIntervalRef.current);
      }
    };
  }, []);

  if (!shouldShow) return null;

  // 手機版畫面會旋轉 90 度，但按鈕本身也會跟著旋轉
  // 我們希望按鈕在視覺上（旋轉後）位於左下角
  // 直接使用 left-6 bottom-6，按鈕會隨容器旋轉到正確位置
  return (
    <div
      className="fixed left-6 bottom-6 z-50"
      style={{
        width: '80px',
        height: '80px',
        touchAction: 'none',
      }}
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className={`
          relative w-full h-full rounded-full
          flex items-center justify-center
          transition-all duration-150
          ${selectedPlayerIndex === null
            ? 'bg-gray-400/30 cursor-not-allowed'
            : isCharging
              ? 'bg-blue-500/60 scale-110'
              : 'bg-blue-500/40 active:scale-95'
          }
          border-2 border-white/50
          shadow-lg
        `}
        style={{
          background: selectedPlayerIndex !== null && isCharging
            ? `conic-gradient(
                rgba(59, 130, 246, 0.8) ${chargeProgress}%,
                rgba(59, 130, 246, 0.3) ${chargeProgress}%
              )`
            : undefined,
        }}
      >
        {/* 內圈 */}
        <div className="absolute inset-2 rounded-full bg-white/20 flex items-center justify-center">
          {/* 雪球圖標 (簡單的圓點) */}
          <div className="w-6 h-6 rounded-full bg-white/80" />
        </div>

        {/* 提示文字 */}
        {selectedPlayerIndex === null && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/70 bg-black/40 px-2 py-1 rounded">
            先選擇角色
          </div>
        )}
      </div>
    </div>
  );
}
