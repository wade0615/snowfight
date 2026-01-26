'use client';

import { useState, useEffect } from 'react';
import GameCanvas from '@/components/GameCanvas';
import GameUI from '@/components/GameUI';
import Leaderboard from '@/components/modals/Leaderboard';
import Instructions from '@/components/modals/Instructions';
import { isMobileDevice } from '@/utils/deviceDetection';
import { useGameStore } from '@/stores/gameStore';

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
    </main>
  );
}
