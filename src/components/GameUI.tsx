'use client';

import { useGameStore } from '@/stores/gameStore';

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

  if (gameState === 'showGreeting') {
    return null;
  }

  return (
    <>
      {/* 遊戲資訊面板 */}
      <div
        className={`
          absolute top-4 left-4 z-10
          bg-white/90 backdrop-blur-sm rounded-lg shadow-lg
          transition-all duration-300
          ${menuCollapsed ? 'w-12 h-12' : 'p-4'}
        `}
      >
        {menuCollapsed ? (
          <button
            onClick={() => setMenuCollapsed(false)}
            className="w-full h-full flex items-center justify-center text-xl"
            aria-label="展開選單"
          >
            ☰
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-800">遊戲資訊</span>
              <button
                onClick={() => setMenuCollapsed(true)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="收合選單"
              >
                ✕
              </button>
            </div>

            <div className="text-gray-700">
              <div className="flex justify-between">
                <span>關卡:</span>
                <span className="font-bold">{level}</span>
              </div>
              <div className="flex justify-between">
                <span>分數:</span>
                <span className="font-bold">{score}</span>
              </div>
            </div>

            <div className="border-t pt-2 mt-2 space-y-1">
              <button
                onClick={() => setShowLeaderboard(true)}
                className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm"
              >
                🏆 排行榜
              </button>
              <button
                onClick={() => setShowSkipLevel(true)}
                className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm"
              >
                ⏭️ 跳關
              </button>
              <button
                onClick={() => setShowInstructions(true)}
                className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm"
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
