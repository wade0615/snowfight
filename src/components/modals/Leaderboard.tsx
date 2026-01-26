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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.6)' }}
      onClick={() => setShowLeaderboard(false)}
    >
      <div
        className="pixel-border w-full max-w-md mx-4"
        style={{
          background: '#FAF5EB',
          padding: '24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '14px',
              color: '#1a1a2e',
            }}
          >
            {t.leaderboardTitle}
          </h2>
          <button
            onClick={() => setShowLeaderboard(false)}
            className="cursor-pointer"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '16px',
              color: '#1a1a2e',
            }}
          >
            x
          </button>
        </div>

        {leaderboard.length > 0 ? (
          <div className="pixel-border-thin overflow-hidden">
            <table
              className="w-full"
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: '18px',
              }}
            >
              <thead>
                <tr style={{ background: '#E8DCC8' }}>
                  <th className="px-3 py-2 text-left" style={{ color: '#1a1a2e', fontFamily: "'Press Start 2P', monospace", fontSize: '7px' }}>{t.leaderboardRank}</th>
                  <th className="px-3 py-2 text-left" style={{ color: '#1a1a2e', fontFamily: "'Press Start 2P', monospace", fontSize: '7px' }}>{t.leaderboardScore}</th>
                  <th className="px-3 py-2 text-left" style={{ color: '#1a1a2e', fontFamily: "'Press Start 2P', monospace", fontSize: '7px' }}>{t.leaderboardLevel}</th>
                  <th className="px-3 py-2 text-left" style={{ color: '#1a1a2e', fontFamily: "'Press Start 2P', monospace", fontSize: '7px' }}>{t.leaderboardDuration}</th>
                  <th className="px-3 py-2 text-left" style={{ color: '#1a1a2e', fontFamily: "'Press Start 2P', monospace", fontSize: '7px' }}>{t.leaderboardDate}</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr
                    key={index}
                    style={{
                      borderTop: '2px solid #E8DCC8',
                      color: '#333',
                      background: entry.score === score
                        ? '#FFF8DC'
                        : index === 0
                          ? '#FFF5E0'
                          : 'transparent',
                    }}
                  >
                    <td className="px-3 py-2" style={{ fontWeight: 'bold' }}>
                      {index === 0 && '* 1 *'}
                      {index === 1 && '* 2 *'}
                      {index === 2 && '* 3 *'}
                      {index > 2 && `#${index + 1}`}
                    </td>
                    <td className="px-3 py-2" style={{ fontWeight: 'bold', color: '#E04040' }}>{entry.score}</td>
                    <td className="px-3 py-2">{entry.level || '-'}</td>
                    <td className="px-3 py-2">{formatDuration(entry.duration)}</td>
                    <td className="px-3 py-2" style={{ fontSize: '16px', color: '#888' }}>
                      {entry.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            className="text-center py-8"
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: '20px',
              color: '#888',
            }}
          >
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
            className="pixel-btn cursor-pointer"
            style={{
              padding: '8px 16px',
              background: '#FAF5EB',
              color: '#E04040',
              fontSize: '8px',
            }}
          >
            {t.leaderboardClear}
          </button>
          <button
            onClick={() => setShowLeaderboard(false)}
            className="pixel-btn cursor-pointer"
            style={{
              padding: '8px 16px',
              background: '#3E7DC9',
              color: '#FFF',
              fontSize: '10px',
            }}
          >
            {t.leaderboardClose}
          </button>
        </div>
      </div>
    </div>
  );
}
