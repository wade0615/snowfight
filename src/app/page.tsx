'use client';

import { useState, useEffect } from 'react';
import GameCanvas from '@/components/GameCanvas';
import GameUI from '@/components/GameUI';
import Leaderboard from '@/components/modals/Leaderboard';
import Instructions from '@/components/modals/Instructions';
import GoogleAds from '@/components/GoogleAds';
import { isMobileDevice } from '@/utils/deviceDetection';
import { useGameStore } from '@/stores/gameStore';
import { ADS_CONFIG } from '@/config/ads';
import { translations } from '@/utils/i18n';

export default function Home() {
  // 使用 useState 初始化為 false，避免 SSR hydration mismatch
  const [isMobile, setIsMobile] = useState(false);
  const language = useGameStore((s) => s.language);
  const t = translations[language];

  // 在客戶端掛載後檢測裝置類型
  // 使用 requestAnimationFrame 延遲到下一幀更新，避免在 effect 中直接 setState
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMobile(isMobileDevice());
    });
  }, []);

  // 同步 <html lang> 屬性與用戶語言偏好
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-Hant' : 'en-US';
  }, [language]);

  return (
    <>
    <main
      className={`w-screen h-screen overflow-hidden ${isMobile ? '' : 'flex items-center justify-center'}`}
      style={{ background: '#1a1a2e' }}
    >
      <h1 className="sr-only">打雪仗 Snowball Fight - 免費線上雪球大戰網頁遊戲</h1>
      <div
        className="relative"
        style={{
          // 手機版：填滿整個 viewport，旋轉後會正確顯示
          width: isMobile ? '100vh' : '100%',
          height: isMobile ? '100vw' : '100%',
          // 手機版時需要手動置中（因為旋轉後的定位）
          ...(isMobile ? {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(90deg)',
          } : {
            transform: 'none',
          }),
        }}
      >
        <GameCanvas />
        <GameUI />
        <Leaderboard />
        <Instructions />
      </div>

      {/* Desktop-only ads in dark letterbox areas */}
      {!isMobile && (
        <>
          {/* Bottom banner — visible when viewport is tall enough */}
          <div
            className="hidden min-[660px]:block fixed bottom-0 left-1/2 -translate-x-1/2 z-50"
            style={{ pointerEvents: 'auto' }}
          >
            <GoogleAds
              adSlot={ADS_CONFIG.AD_SLOTS.GAME_BOTTOM_BANNER}
              adFormat="banner"
              responsive
              style={{
                width: '728px',
                maxWidth: '100vw',
                height: '90px',
                margin: 0,
              }}
            />
          </div>

          {/* Right sidebar skyscraper — visible on wide screens */}
          <div
            className="hidden min-[1300px]:flex fixed right-0 top-1/2 -translate-y-1/2 z-50"
            style={{ pointerEvents: 'auto' }}
          >
            <GoogleAds
              adSlot={ADS_CONFIG.AD_SLOTS.GAME_RIGHT_SIDEBAR}
              adFormat="skyscraper"
              responsive={false}
              style={{
                width: '160px',
                height: '600px',
                margin: 0,
              }}
            />
          </div>
        </>
      )}
    </main>

    {/* SEO content section — visible below the game */}
    <section
      style={{
        background: '#1a1a2e',
        color: '#FAF5EB',
        padding: '4rem 2rem',
        fontFamily: 'Georgia, serif',
        lineHeight: '1.9',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* About */}
        <h2
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '13px',
            color: '#FAF5EB',
            marginBottom: '1.25rem',
            letterSpacing: '0.05em',
          }}
        >
          {t.homeDescTitle}
        </h2>
        <p style={{ marginBottom: '1rem', fontSize: '15px', color: '#E8DDD0' }}>{t.homeDescP1}</p>
        <p style={{ marginBottom: '3rem', fontSize: '15px', color: '#E8DDD0' }}>{t.homeDescP2}</p>

        {/* Quick Start */}
        <h2
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '13px',
            color: '#FAF5EB',
            marginBottom: '1.25rem',
            letterSpacing: '0.05em',
          }}
        >
          {t.homeHowToTitle}
        </h2>
        <ol style={{ paddingLeft: '1.5rem', marginBottom: '3rem' }}>
          {[
            t.homeHowToStep1,
            t.homeHowToStep2,
            t.homeHowToStep3,
            t.homeHowToStep4,
            t.homeHowToStep5,
          ].map((step, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', fontSize: '15px', color: '#E8DDD0' }}>
              {step}
            </li>
          ))}
        </ol>

        {/* Why Play */}
        <h2
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '13px',
            color: '#FAF5EB',
            marginBottom: '1.25rem',
            letterSpacing: '0.05em',
          }}
        >
          {t.homeWhyTitle}
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {[t.homeWhy1, t.homeWhy2, t.homeWhy3, t.homeWhy4, t.homeWhy5].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', fontSize: '15px', color: '#E8DDD0' }}>
              {'> '}{item}
            </li>
          ))}
        </ul>
      </div>
    </section>
    </>
  );
}
