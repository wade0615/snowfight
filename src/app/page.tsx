'use client';

import GameCanvas from '@/components/GameCanvas';
import GameUI from '@/components/GameUI';
import Leaderboard from '@/components/modals/Leaderboard';
import SkipLevel from '@/components/modals/SkipLevel';
import Instructions from '@/components/modals/Instructions';

export default function Home() {
  return (
    <main className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <div className="relative w-full h-full">
        <GameCanvas />
        <GameUI />
        <Leaderboard />
        <SkipLevel />
        <Instructions />
      </div>
    </main>
  );
}
