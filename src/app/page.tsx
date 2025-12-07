'use client';

import { useState, useEffect } from 'react';
import GameCanvas from '@/components/GameCanvas';
import GameUI from '@/components/GameUI';
import Leaderboard from '@/components/modals/Leaderboard';
import SkipLevel from '@/components/modals/SkipLevel';
import Instructions from '@/components/modals/Instructions';
import { isMobileDevice } from '@/utils/deviceDetection';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 使用 User Agent 偵測行動裝置
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <main className={`w-screen h-screen bg-gray-900 overflow-hidden ${isMobile ? '' : 'flex items-center justify-center'}`}>
      <div
        className="relative transition-transform duration-300"
        style={{
          transform: isMobile ? 'rotate(90deg)' : 'none',
          // 手機版：填滿整個 viewport，旋轉後會正確顯示
          width: isMobile ? '100vh' : '100%',
          height: isMobile ? '100vw' : '100%',
          // 手機版時需要手動置中（因為旋轉後的定位）
          ...(isMobile ? {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(90deg)',
          } : {}),
        }}
      >
        <GameCanvas />
        <GameUI />
        <Leaderboard />
        <SkipLevel />
        <Instructions />
      </div>
    </main>
  );
}
