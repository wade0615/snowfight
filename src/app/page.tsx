'use client';

import { useState, useEffect } from 'react';
import GameCanvas from '@/components/GameCanvas';
import GameUI from '@/components/GameUI';
import Leaderboard from '@/components/modals/Leaderboard';
import SkipLevel from '@/components/modals/SkipLevel';
import Instructions from '@/components/modals/Instructions';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 使用螢幕尺寸偵測手機裝置（寬度小於 768px）
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初始檢查
    checkMobile();

    // 監聽視窗大小變化
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <main className="w-screen h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <div
        className="relative transition-transform duration-300"
        style={{
          transform: isMobile ? 'rotate(90deg)' : 'none',
          // 旋轉後調整尺寸：寬高互換
          width: isMobile ? '100vh' : '100%',
          height: isMobile ? '100vw' : '100%',
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
