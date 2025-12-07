'use client';

import { useGameStore } from '@/stores/gameStore';

export default function Instructions() {
  const { showInstructions, setShowInstructions } = useGameStore();

  if (!showInstructions) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setShowInstructions(false)}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">❓ 遊戲說明</h2>
          <button
            onClick={() => setShowInstructions(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 text-gray-700">
          <section>
            <h3 className="font-bold text-lg mb-2">🎯 遊戲目標</h3>
            <p>消滅所有敵人（綠色）來過關！小心不要被敵人的雪球打到。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">🎮 操作方式</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-blue-600 mb-1">💻 電腦版：</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>滑鼠拖曳紅色角色來移動和選中</li>
                  <li>按住空白鍵蓄力攻擊</li>
                  <li>蓄力越久，投擲距離越遠</li>
                  <li>放開空白鍵發射雪球</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-green-600 mb-1">📱 手機版：</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>拖曳紅色角色來移動和選中</li>
                  <li>按住左下角攻擊按鈕蓄力</li>
                  <li>蓄力越久，投擲距離越遠</li>
                  <li>放開按鈕發射雪球</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">❤️ 生命值</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>你的角色有 2 點血量</li>
              <li>敵人有 3 點血量</li>
              <li>被雪球打中會損失 1 點血量</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">📊 計分</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>每擊中敵人一次得 50 分</li>
              <li>分數會記錄在排行榜中</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">💡 小技巧</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>被打中後有短暫無敵時間</li>
              <li>善用三個角色輪流攻擊</li>
              <li>注意敵人的蓄力動作</li>
            </ul>
          </section>
        </div>

        <button
          onClick={() => setShowInstructions(false)}
          className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          了解了！
        </button>
      </div>
    </div>
  );
}
