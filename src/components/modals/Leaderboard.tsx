'use client';

import { useGameStore } from '@/stores/gameStore';

// 格式化時長（毫秒 -> mm:ss）
function formatDuration(ms: number): string {
  if (!ms || ms <= 0) return '-';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function Leaderboard() {
  const { showLeaderboard, setShowLeaderboard, getLeaderboard, clearLeaderboard, score, t } =
    useGameStore();

  if (!showLeaderboard) return null;

  const leaderboard = getLeaderboard();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setShowLeaderboard(false)}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">🏆 {t.leaderboardTitle}</h2>
          <button
            onClick={() => setShowLeaderboard(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {leaderboard.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left text-gray-600">{t.leaderboardRank}</th>
                  <th className="px-3 py-2 text-left text-gray-600">{t.leaderboardScore}</th>
                  <th className="px-3 py-2 text-left text-gray-600">{t.leaderboardLevel}</th>
                  <th className="px-3 py-2 text-left text-gray-600">{t.leaderboardDuration}</th>
                  <th className="px-3 py-2 text-left text-gray-600">{t.leaderboardDate}</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr
                    key={index}
                    className={`
                      border-t border-gray-100
                      ${entry.score === score ? 'bg-yellow-50' : ''}
                      ${index === 0 ? 'bg-amber-50' : ''}
                    `}
                  >
                    <td className="px-3 py-2">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${index + 1}`}
                    </td>
                    <td className="px-3 py-2 font-bold">{entry.score}</td>
                    <td className="px-3 py-2">{entry.level || '-'}</td>
                    <td className="px-3 py-2">{formatDuration(entry.duration)}</td>
                    <td className="px-3 py-2 text-sm text-gray-500">
                      {entry.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {t.leaderboardEmpty}
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => {
              if (confirm(t.leaderboardClearConfirm)) {
                clearLeaderboard();
              }
            }}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded"
          >
            {t.leaderboardClear}
          </button>
          <button
            onClick={() => setShowLeaderboard(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t.leaderboardClose}
          </button>
        </div>
      </div>
    </div>
  );
}
