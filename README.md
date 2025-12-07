# SnowCraft - 雪球大戰

一款有趣的網頁打雪仗遊戲，支援電腦和手機！

## 遊戲介紹

在雪球戰爭中與敵人對戰，體驗刺激的雪球大戰。操作你的角色移動、蓄力攻擊，擊敗所有敵人即可進入下一關。

### 遊戲特色

- 雙平台優化：PC 和手機不同操作體驗
- 50 個關卡挑戰
- 排行榜系統
- 響應式設計，支援電腦和手機
- 手機版橫向遊戲模式

### 操作方式

#### 💻 電腦版
- **移動**：滑鼠拖曳紅色角色來移動和選中
- **攻擊**：按住空白鍵蓄力，放開發射雪球
- **蓄力**：按住越久，投擲距離越遠

#### 📱 手機版
- **移動**：觸控拖曳紅色角色來移動和選中
- **攻擊**：按住左下角攻擊按鈕蓄力，放開發射雪球
- **蓄力**：按住越久，投擲距離越遠
- **模式**：自動旋轉為橫向遊戲模式

## 技術架構

- **框架**：Next.js 16 + React 19
- **語言**：TypeScript
- **狀態管理**：Zustand
- **樣式**：Tailwind CSS 4
- **渲染**：Canvas API

## 專案結構

```
src/
├── app/                 # Next.js App Router
├── components/          # React 元件
│   ├── GameCanvas.tsx   # 遊戲畫布
│   ├── GameUI.tsx       # UI 面板
│   └── modals/          # 彈窗元件
├── hooks/               # 自訂 Hooks
│   ├── useGameLoop.ts   # 遊戲主迴圈
│   └── useCanvasEvents.ts # 事件處理
├── stores/              # Zustand 狀態
├── types/               # TypeScript 型別
└── utils/               # 工具函數
    ├── constants.ts     # 遊戲常數
    ├── physics.ts       # 物理計算
    ├── enemyAI.ts       # 敵人 AI
    └── renderer.ts      # Canvas 繪製
```

## 開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構
npm run build

# 啟動生產伺服器
npm start
```

開啟 [http://localhost:3000](http://localhost:3000) 即可遊玩。

## 部署

可直接部署至 [Vercel](https://vercel.com)：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cruxover/snowcraft)

## 授權

MIT License
