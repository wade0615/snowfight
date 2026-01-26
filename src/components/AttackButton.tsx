"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { isMobileDevice } from "@/utils/deviceDetection";

interface AttackButtonProps {
  onAttackStart: () => void;
  onAttackEnd: () => void;
}

export default function AttackButton({
  onAttackStart,
  onAttackEnd,
}: AttackButtonProps) {
  const [isCharging, setIsCharging] = useState(false);
  const [chargeProgress, setChargeProgress] = useState(0);
  // 直接在初始化時偵測，避免 useEffect 中的 setState
  const [isMobile] = useState(() => isMobileDevice());
  const chargeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { gameState, selectedPlayerIndex, t } = useGameStore();

  // 只在行動裝置且遊戲進行中顯示
  const shouldShow = isMobile && gameState === "playing";

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

  return (
    <div
      className="absolute left-12 bottom-6 z-50"
      style={{
        width: "80px",
        height: "80px",
        touchAction: "none",
        pointerEvents: "auto",
      }}
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className="relative w-full h-full flex items-center justify-center"
        style={{
          border: '3px solid #1a1a2e',
          boxShadow: isCharging
            ? '1px 1px 0px 0px #0d0d1a'
            : '3px 3px 0px 0px #0d0d1a',
          background: selectedPlayerIndex === null
            ? 'rgba(150, 150, 150, 0.4)'
            : isCharging
              ? 'rgba(62, 125, 201, 0.7)'
              : 'rgba(62, 125, 201, 0.5)',
          transform: isCharging ? 'translate(2px, 2px)' : 'none',
          transition: 'transform 0.1s, box-shadow 0.1s',
          imageRendering: 'pixelated',
          cursor: selectedPlayerIndex === null ? 'not-allowed' : 'pointer',
        }}
      >
        {/* 蓄力進度指示 - 像素方塊填充 */}
        {isCharging && selectedPlayerIndex !== null && (
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: `${chargeProgress}%`,
              background: 'rgba(62, 125, 201, 0.5)',
              transition: 'height 16ms linear',
            }}
          />
        )}

        {/* 內圈 - 像素風格 */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            inset: '8px',
            border: '2px dashed rgba(255, 255, 255, 0.4)',
          }}
        >
          {/* 雪球圖標 (像素方塊) */}
          <div
            style={{
              width: '20px',
              height: '20px',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.6)',
            }}
          />
        </div>

        {/* 提示文字 */}
        {selectedPlayerIndex === null && (
          <div
            className="absolute whitespace-nowrap"
            style={{
              top: '-32px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '6px',
              color: 'rgba(255,255,255,0.7)',
              background: 'rgba(0,0,0,0.6)',
              padding: '4px 8px',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
          >
            {t.attackButtonHint}
          </div>
        )}
      </div>
    </div>
  );
}
