"use client";

import { useEffect } from "react";
import { useGameStore } from "@/stores/gameStore";
import { isMobileDevice } from "@/utils/deviceDetection";

export default function GameUI() {
  const {
    level,
    score,
    gameState,
    menuCollapsed,
    setMenuCollapsed,
    setShowLeaderboard,
    setShowSkipLevel,
    setShowInstructions,
  } = useGameStore();

  // 根據裝置類型設定選單初始狀態
  useEffect(() => {
    // 使用 User Agent 偵測，行動裝置收起，桌面裝置展開
    setMenuCollapsed(isMobileDevice());
  }, [setMenuCollapsed]);

  if (gameState === "showGreeting") {
    return null;
  }

  return (
    <>
      {/* 遊戲資訊面板 */}
      <div
        className={`
          absolute top-4 left-4 z-10
          bg-white/95 backdrop-blur-sm rounded-lg shadow-lg
          transition-all duration-300
          ${menuCollapsed ? "w-12 h-12" : "p-4"}
        `}
      >
        {menuCollapsed ? (
          <button
            onClick={() => setMenuCollapsed(false)}
            className="w-full h-full flex items-center justify-center text-xl text-gray-800 hover:text-gray-600"
            aria-label="展開選單"
          >
            ☰
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-900">遊戲資訊</span>
              <button
                onClick={() => setMenuCollapsed(true)}
                className="text-gray-600 hover:text-gray-800 text-xl leading-none"
                aria-label="收合選單"
              >
                ✕
              </button>
            </div>

            <div className="text-gray-800">
              <div className="flex justify-between">
                <span className="font-medium">關卡:</span>
                <span className="font-bold text-blue-600">{level}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">分數:</span>
                <span className="font-bold text-green-600">{score}</span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-2 mt-2 space-y-1">
              <button
                onClick={() => setShowLeaderboard(true)}
                className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 text-sm text-gray-800 font-medium transition-colors"
              >
                🏆 排行榜
              </button>
              <button
                onClick={() => setShowSkipLevel(true)}
                className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 text-sm text-gray-800 font-medium transition-colors"
              >
                ⏭️ 跳關
              </button>
              <button
                onClick={() => setShowInstructions(true)}
                className="w-full text-left px-2 py-1 rounded hover:bg-gray-200 text-sm text-gray-800 font-medium transition-colors"
              >
                ❓ 說明
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
