'use client';

import { useGameStore } from '@/stores/gameStore';
import { MAX_LEVEL } from '@/utils/constants';

export default function SkipLevel() {
  const {
    showSkipLevel,
    setShowSkipLevel,
    skipToLevel,
    setSkipToLevel,
    startLevel,
    setScore,
  } = useGameStore();

  if (!showSkipLevel) return null;

  const handleSkip = () => {
    setScore(0);
    startLevel(skipToLevel);
    setShowSkipLevel(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setShowSkipLevel(false)}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">⏭️ 跳關</h2>
          <button
            onClick={() => setShowSkipLevel(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">選擇關卡</label>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setSkipToLevel(Math.max(1, skipToLevel - 1))}
              className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg text-2xl font-bold"
              disabled={skipToLevel <= 1}
            >
              -
            </button>
            <span className="text-4xl font-bold w-20 text-center">{skipToLevel}</span>
            <button
              onClick={() => setSkipToLevel(Math.min(MAX_LEVEL, skipToLevel + 1))}
              className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg text-2xl font-bold"
              disabled={skipToLevel >= MAX_LEVEL}
            >
              +
            </button>
          </div>
          <div className="text-center text-gray-500 text-sm mt-2">
            第 1 - {MAX_LEVEL} 關
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowSkipLevel(false)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            取消
          </button>
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            開始
          </button>
        </div>
      </div>
    </div>
  );
}
