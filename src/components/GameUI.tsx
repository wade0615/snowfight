"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useGameStore } from "@/stores/gameStore";
import { isMobileDevice } from "@/utils/deviceDetection";

export default function GameUI() {
  const {
    level,
    score,
    hitCount,
    hitTarget,
    gameState,
    menuCollapsed,
    setMenuCollapsed,
    setShowLeaderboard,
    setShowInstructions,
    t,
    language,
    setLanguage,
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
      {/* 遊戲資訊面板 - Pixel Art 風格 */}
      <div
        className={`
          absolute top-4 left-10 z-10
          pixel-border hand-drawn
          ${menuCollapsed ? "w-14 h-14" : "p-5"}
        `}
        style={{
          background: '#FAF5EB',
          imageRendering: 'pixelated',
        }}
      >
        {menuCollapsed ? (
          <button
            onClick={() => setMenuCollapsed(false)}
            className="w-full h-full flex items-center justify-center cursor-pointer"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '16px',
              color: '#1a1a2e',
            }}
            aria-label="展開選單"
          >
            =
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-3">
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '14px',
                  color: '#1a1a2e',
                }}
              >
                {t.gameInfo}
              </span>
              <button
                onClick={() => setMenuCollapsed(true)}
                className="cursor-pointer"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '18px',
                  color: '#1a1a2e',
                  lineHeight: 1,
                }}
                aria-label="Close menu"
              >
                x
              </button>
            </div>

            <div style={{ fontFamily: "'VT323', monospace", fontSize: '24px', color: '#1a1a2e' }}>
              <div className="flex justify-between">
                <span>{t.level}:</span>
                <span style={{ color: '#3E7DC9', fontWeight: 'bold' }}>{level}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.score}:</span>
                <span style={{ color: '#30A14E', fontWeight: 'bold' }}>{score}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.hitProgress}:</span>
                <span style={{ color: '#E8A317', fontWeight: 'bold' }}>{hitCount} / {hitTarget}</span>
              </div>
            </div>

            <div
              className="pt-3 mt-3 space-y-2"
              style={{ borderTop: '2px dashed #C8B8A0' }}
            >
              <button
                onClick={() => setShowLeaderboard(true)}
                className="w-full text-left px-3 py-2 cursor-pointer pixel-btn"
                style={{
                  fontSize: '12px',
                  background: '#FAF5EB',
                  color: '#1a1a2e',
                }}
              >
                {t.leaderboard}
              </button>
              <button
                onClick={() => setShowInstructions(true)}
                className="w-full text-left px-3 py-2 cursor-pointer pixel-btn"
                style={{
                  fontSize: '12px',
                  background: '#FAF5EB',
                  color: '#1a1a2e',
                }}
              >
                {t.instructions}
              </button>
            </div>

            <div
              className="pt-3 mt-3"
              style={{ borderTop: '2px dashed #C8B8A0' }}
            >
              <div
                className="mb-2"
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: '18px',
                  color: '#888',
                }}
              >
                {t.language}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage('zh')}
                  className="flex-1 px-3 py-2 cursor-pointer pixel-btn"
                  style={{
                    fontSize: '12px',
                    background: language === 'zh' ? '#3E7DC9' : '#FAF5EB',
                    color: language === 'zh' ? '#FFF' : '#1a1a2e',
                  }}
                >
                  {t.chinese}
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className="flex-1 px-3 py-2 cursor-pointer pixel-btn"
                  style={{
                    fontSize: '12px',
                    background: language === 'en' ? '#3E7DC9' : '#FAF5EB',
                    color: language === 'en' ? '#FFF' : '#1a1a2e',
                  }}
                >
                  {t.english}
                </button>
              </div>
            </div>

            {/* SEO Pages Navigation */}
            <div
              className="pt-3 mt-3 space-y-2"
              style={{ borderTop: '2px dashed #C8B8A0' }}
            >
              <Link
                href="/how-to-play"
                className="block w-full text-left px-3 py-2 pixel-btn"
                style={{
                  fontSize: '12px',
                  background: '#FAF5EB',
                  color: '#1a1a2e',
                  textDecoration: 'none',
                }}
              >
                {t.navHowToPlay}
              </Link>
              <Link
                href="/tips"
                className="block w-full text-left px-3 py-2 pixel-btn"
                style={{
                  fontSize: '12px',
                  background: '#FAF5EB',
                  color: '#1a1a2e',
                  textDecoration: 'none',
                }}
              >
                {t.navTips}
              </Link>
              <Link
                href="/levels"
                className="block w-full text-left px-3 py-2 pixel-btn"
                style={{
                  fontSize: '12px',
                  background: '#FAF5EB',
                  color: '#1a1a2e',
                  textDecoration: 'none',
                }}
              >
                {t.navLevels}
              </Link>
              <Link
                href="/about"
                className="block w-full text-left px-3 py-2 pixel-btn"
                style={{
                  fontSize: '12px',
                  background: '#FAF5EB',
                  color: '#1a1a2e',
                  textDecoration: 'none',
                }}
              >
                {t.navAbout}
              </Link>
              <Link
                href="/privacy"
                className="block w-full text-left px-3 py-2 pixel-btn"
                style={{
                  fontSize: '12px',
                  background: '#FAF5EB',
                  color: '#1a1a2e',
                  textDecoration: 'none',
                }}
              >
                {t.navPrivacy}
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
