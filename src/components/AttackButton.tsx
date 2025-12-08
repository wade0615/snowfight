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
  const { gameState, selectedPlayerIndex } = useGameStore();

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

  // 手機版畫面會旋轉 90 度，按鈕也會跟著旋轉
  // 使用 absolute 定位相對於旋轉容器
  // 在旋轉前的座標系統中，left-12 bottom-6 會在旋轉後顯示在左下角
  return (
    <div
      className="absolute left-12 bottom-6 z-50"
      style={{
        width: "80px",
        height: "80px",
        touchAction: "none",
        pointerEvents: "auto", // 確保觸控事件可以被捕獲
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
          ${
            selectedPlayerIndex === null
              ? "bg-gray-400/30 cursor-not-allowed"
              : isCharging
              ? "bg-blue-500/60 scale-110"
              : "bg-blue-500/40 active:scale-95"
          }
          border-2 border-white/50
          shadow-lg
        `}
        style={{
          background:
            selectedPlayerIndex !== null && isCharging
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
