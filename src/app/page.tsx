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

export default function Home() {
  // 使用 useState 初始化為 false，避免 SSR hydration mismatch
  const [isMobile, setIsMobile] = useState(false);
  const language = useGameStore((s) => s.language);

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
  );
}
