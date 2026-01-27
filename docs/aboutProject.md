# Snowball Fight - 打雪仗 專案文檔

## 項目概述

**Snowball Fight** 是一款免費線上打雪仗遊戲，支援電腦和手機兩個平台。專案採用現代化的 Web 技術棧（Next.js 16 + React 19 + TypeScript + Canvas），提供跨設備的無縫遊戲體驗。

- **項目名稱**：Snowball Fight（打雪仗）
- **開發者**：Cruxover
- **版本**：0.1.0
- **上線地址**：https://snowcraft-rho.vercel.app
- **儲存庫**：https://github.com/wade0615/snowfight
- **部署平台**：Vercel
- **開源協議**：MIT License

---

## 遊戲玩法詳細說明

### 遊戲目標

玩家控制一個紅色角色，在雪地戰場上與綠色敵人對戰。通過投擲雪球攻擊敵人，擊敗所有敵人即可進入下一關。最多支援 50 個關卡。

### 操作方式

#### 💻 桌面版（Desktop）
- **移動**：使用滑鼠拖曳紅色角色進行移動和選中
- **攻擊**：按住空白鍵（Spacebar）蓄力，放開發射雪球
- **蓄力機制**：按住時間越長，雪球投擲距離越遠（最大 800px）
- **最優體驗**：建議 1440×810 解析度以上

#### 📱 手機版（Mobile）
- **移動**：觸控拖曳紅色角色進行移動和選中
- **攻擊**：按住左下角的攻擊按鈕蓄力，放開發射雪球
- **蓄力機制**：與桌面版相同，長按獲得更遠的距離
- **屏幕方向**：自動旋轉為橫向（Landscape）遊戲模式
- **優化**：針對 960×540 基礎解析度優化

### 遊戲元素

#### 角色

| 屬性 | 玩家 | 敵人 |
|------|------|------|
| **初始數量** | 1 | 關卡 1：3 個 |
| **血量上限** | 5 HP | 3 HP |
| **移動速度** | 玩家控制 | 1.5 像素/幀 |
| **顏色** | 紅色（#E04040） | 綠色（#30A14E） |
| **碰撞半徑** | 16 像素 | 16 像素 |

#### 敵人數量成長曲線

- **關卡 1-10**：每關增加 2 個敵人
- **關卡 11+**：繼續每關增加 2 個敵人
- **關卡 50**：最多同屏敵人數達 103 個
- **難度調整**：無動態難度調整，純粹以敵人數量增加提升難度

#### 雪球物理

| 參數 | 數值 |
|------|------|
| **初始半徑** | 6 像素 |
| **基礎速度** | 2 像素/幀 |
| **最大速度** | 8 像素/幀 |
| **最大飛行距離** | 800 像素 |
| **蓄力時間** | 700 毫秒（滿蓄力） |

#### 掩體（雪堆）

- 遊戲中心區域可能出現雪堆掩體
- 血量上限：10 HP
- 玩家和敵人投擲的雪球都能摧毀掩體
- 提供遊戲策略性障礙物

### 戰鬥機制

#### 得分系統
- **每次命中**：+50 分
- **無獲勝獎勵**：完成關卡無額外分數，僅累計命中分

#### 控制狀態
- **暈眩機制**：被雪球擊中後暈眩 1 秒，無法行動
- **死亡動畫**：角色死亡後有倒地動畫（500 毫秒持續時間）
- **重新生成**：玩家死亡時直接遊戲結束（非重新生成）

#### 敵人 AI
- **反應延遲**：遊戲開始後至少 5 秒才開始投擲（ENEMY_FIRST_THROW_DELAY）
- **投擲間隔**：每隔 3-5 秒投擲一次
- **移動策略**：
  - 目標位置每 1.5-3 秒隨機變更一次
  - 持續向目標位置移動，製造不可預測性
- **準確度**：40% 命中率（ENEMY_ACCURACY = 0.4）
  - 瞄準有偏差，玩家有躲避機會
- **動畫狀態機**：蹲下 → 準備 → 投擲 → 站起，每個狀態有不同的時長

---

## 技術架構

### 技術棧

| 層級 | 技術 | 版本 |
|------|------|------|
| **框架** | Next.js | 16.0.10 |
| **前端庫** | React | 19.2.0 |
| **語言** | TypeScript | ^5.0 |
| **狀態管理** | Zustand | ^5.0.9 |
| **樣式** | Tailwind CSS | ^4.0 |
| **渲染引擎** | HTML5 Canvas API | 原生 |
| **構建工具** | Next.js 內建 | - |

### 專案結構

```
src/
├── app/
│   ├── layout.tsx           # 根佈局 + SEO 元數據
│   ├── page.tsx             # 主頁面 + Google Ads 整合
│   ├── globals.css          # 全局樣式
│   ├── opengraph-image.tsx  # OG 圖片生成
│   ├── robots.ts            # robots.txt 配置
│   └── sitemap.ts           # Sitemap 配置
├── components/
│   ├── GameCanvas.tsx       # Canvas 畫布 & 物理渲染
│   ├── GameUI.tsx           # UI 面板（生命值、分數、等級）
│   ├── AttackButton.tsx      # 攻擊按鈕（手機版）
│   ├── GoogleAds.tsx         # Google AdSense 組件
│   └── modals/
│       ├── Instructions.tsx  # 遊戲說明對話框
│       └── Leaderboard.tsx   # 排行榜對話框
├── hooks/
│   ├── useGameLoop.ts       # 60 FPS 遊戲主迴圈 Hook
│   └── useCanvasEvents.ts    # 滑鼠/觸控事件處理 Hook
├── stores/
│   └── gameStore.ts         # Zustand 全局狀態（語言、音效開關等）
├── config/
│   └── ads.ts               # Google AdSense 配置
├── types/
│   └── game.ts              # 遊戲類型定義
└── utils/
    ├── constants.ts         # 遊戲常數（速度、傷害、顏色等）
    ├── deviceDetection.ts   # 設備偵測工具
    ├── enemyAI.ts           # 敵人 AI 邏輯
    ├── physics.ts           # 物理碰撞計算
    ├── renderer.ts          # Canvas 繪製函數
    └── i18n.ts              # 多語言支持（中英）
```

### 核心特性

#### Canvas 渲染優化
- **自適應解析度**：根據設備自動調整畫布尺寸
  - 桌面版：1440×810（基準）
  - 手機版：960×540（基準）+ 動態縮放
- **60 FPS 遊戲迴圈**：RequestAnimationFrame 驅動
- **離屏繪製**：減少重排和重繪

#### 響應式設計
- **桌面版**：標準全屏遊戲體驗，可同時顯示廣告
- **手機版**：
  - 自動檢測縱向/橫向，強制橫向模式
  - 觸控優化的 UI 和按鈕
  - 隱藏廣告（避免遊戲區域擁擠）

#### 跨平台事件處理
- **滑鼠事件**：`mousedown`, `mousemove`, `mouseup`, `mouseleave`
- **觸控事件**：`touchstart`, `touchmove`, `touchend`
- **鍵盤事件**：Spacebar 蓄力攻擊

#### 多語言支持
- **中文（繁體）**：zh-Hant（預設）
- **英文**：en-US
- 使用 Zustand 存儲語言偏好，並同步 HTML lang 屬性

---

## SEO 配置

### 元數據與結構化資料

#### Metadata 配置

```typescript
// 在 src/app/layout.tsx 中設定
{
  title: '打雪仗 Snowball Fight - 雪球大戰網頁遊戲 | Free Online Snowball Game',
  description: '免費線上打雪仗遊戲！體驗刺激的雪球大戰，支援電腦和手機。...',
  keywords: [
    'snowball fight',
    'snowball game',
    'snowfight',
    'snowcraft',
    'free browser game',
    'web game',
    '雪球戰爭',
    '雪球大戰',
    '打雪仗',
    '網頁遊戲',
    '免費遊戲'
  ]
}
```

#### 關鍵詞涵蓋
- **英文關鍵詞**：snowball fight, snowball game, online game, free browser game, web game
- **中文關鍵詞**：打雪仗、雪球大戰、網頁遊戲、免費遊戲、線上遊戲

#### Open Graph (OG) 配置

```typescript
{
  openGraph: {
    title: '打雪仗 Snowball Fight - 雪球大戰 | Free Snowball Game',
    description: '免費線上雪球大戰！與敵人對戰，體驗刺激的打雪仗遊戲。',
    type: 'website',
    locale: 'zh_TW',
    alternateLocale: 'en_US',
    siteName: 'Snowball Fight 雪球大戰'
  }
}
```

#### Twitter Card
- **類型**：summary_large_image
- **適配**：社交媒體分享優化

#### Robots Meta
```
robots: index, follow
```

#### Canonical URL
- **指向**：`/` （根域名）
- **用途**：避免重複內容問題

#### 結構化資料 (JSON-LD)

使用 VideoGame Schema 結構化資料：

```json
{
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "打雪仗 Snowball Fight",
  "description": "免費線上打雪仗遊戲！...",
  "url": "https://snowcraft-rho.vercel.app",
  "genre": ["Action", "Casual"],
  "gamePlatform": ["Web Browser", "Mobile"],
  "applicationCategory": "Game",
  "operatingSystem": "Any",
  "author": {
    "@type": "Person",
    "name": "Cruxover"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "inLanguage": ["zh-Hant", "en"],
  "numberOfPlayers": {
    "@type": "QuantitativeValue",
    "value": 1
  }
}
```

**Schema 優點**：
- 幫助搜尋引擎理解網站是遊戲內容
- 提升 Google 搜尋結果展示效果
- 增加在應用程式和遊戲搜尋中的曝光

### Sitemap 配置

```typescript
// src/app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

**當前狀態**：
- ✅ Sitemap 已生成
- ⚠️ **建議改進**：考慮添加其他關鍵頁面（如排行榜、關卡說明等）

### Robots.txt 配置

```
# 自動生成位置：public/robots.txt
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://snowcraft-rho.vercel.app/sitemap.xml
```

**當前設定**：允許所有爬蟲索引

### SEO 現狀評估

| SEO 項目 | 狀態 | 說明 |
|---------|------|------|
| **標題標籤** | ✅ 已設定 | 中英雙語，包含目標關鍵詞 |
| **Meta 描述** | ✅ 已設定 | 簡潔且包含主要特性 |
| **結構化資料** | ✅ 已設定 | VideoGame Schema JSON-LD |
| **Open Graph** | ✅ 已設定 | 社交分享優化 |
| **多語言標籤** | ✅ 已設定 | hreflang alternates 配置 |
| **Sitemap** | ✅ 已生成 | 自動生成，可進一步擴展 |
| **Robots.txt** | ✅ 配置 | 標準配置 |
| **行動設備優化** | ✅ 已優化 | Viewport 和響應式設計 |
| **頁面速度** | ⚠️ 需監控 | 建議使用 PageSpeed Insights 監控 |
| **內部連結** | ⚠️ 當前無 | 單頁應用，暫無多頁面 |

---

## Google Ads 配置

### AdSense 集成

#### 廣告配置檔案

位置：`src/config/ads.ts`

```typescript
export const ADS_CONFIG = {
  // Publisher ID 從環境變數 NEXT_PUBLIC_ADSENSE_ID 讀取
  PUBLISHER_ID: process.env.NEXT_PUBLIC_ADSENSE_ID || "",

  // 廣告單元配置
  AD_SLOTS: {
    GAME_BOTTOM_BANNER: "5579450459",      // 底部橫幅 728×90
    GAME_RIGHT_SIDEBAR: "5579450459",      // 右側摩天樓 160×600
  }
};
```

#### 廣告位置配置

| 廣告類型 | 規格 | 位置 | 顯示條件 | 單元 ID |
|---------|------|------|---------|---------|
| **Banner** | 728×90 | 遊戲畫面下方 | 桌面版 ≥ 660px 高度 | 5579450459 |
| **Skyscraper** | 160×600 | 遊戲畫面右側 | 桌面版 ≥ 1300px 寬度 | 5579450459 |
| **行動版** | - | 隱藏 | 手機版隱藏廣告 | - |

#### 環境變數配置

需在 `.env.local` 中設定：

```
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://snowcraft-rho.vercel.app
```

#### 廣告顯示邏輯

```typescript
export function shouldShowAds(): boolean {
  // 不在以下情況顯示廣告：
  // 1. 開發環境（NODE_ENV = 'development'）
  // 2. 開發模式（NEXT_PUBLIC_DEV_MODE = 'true'）
  // 3. 審核期間（NEXT_PUBLIC_ADS_ENABLED = 'false'）
  
  // 審核中仍會載入 AdSense 腳本，確保 Google 能審核
  return !!PUBLISHER_ID && PUBLISHER_ID.startsWith("ca-pub-");
}
```

### AdSense 審核狀態

#### 審核流程

1. **提交待審**：初期需提交給 Google AdSense 審核
2. **審核期間設定**：
   ```
   NEXT_PUBLIC_ADS_ENABLED=false  # 隱藏廣告，但載入腳本供 Google 審核
   ```
3. **審核通過後**：
   ```
   NEXT_PUBLIC_ADS_ENABLED=true   # 顯示實際廣告
   ```

#### 廣告投放要求

- ✅ **政策合規**：遊戲內容無違規內容
- ✅ **足量流量**：需要達到 Google AdSense 最低流量門檻
- ⚠️ **當前狀態**：尚需根據實際審核結果調整配置

### Google Analytics 集成

#### GA4 配置

```typescript
// 在 layout.tsx 中自動注入 GA 標籤
{gaId && (
  <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
    <Script>
      {`gtag('config','${gaId}');`}
    </Script>
  </>
)}
```

#### 需追蹤的事件

- 頁面瀏覽（自動）
- 遊戲開始
- 遊戲結束
- 排行榜查看
- 廣告展示與點擊（AdSense 自動追蹤）

#### 環境變數

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 創收模式與增長潛力

### 當前創收方式

#### 1. Google AdSense（主要收入來源）

**廣告形式**：
- 728×90 Banner 廣告（桌面下方）
- 160×600 Skyscraper 廣告（桌面右側）
- 行動版隱藏（避免影響遊戲體驗）

**預計 CPM 與 RPM**：

| 流量級別 | 預計 CPM* | 預計 RPM** | 月度收益（100K 訪問） | 月度收益（1M 訪問） |
|---------|----------|-----------|-------------------|------------------|
| **新網站** | $2-5 | $1-3 | $100-300 | $1,000-3,000 |
| **成熟網站** | $5-15 | $2-8 | $200-800 | $2,000-8,000 |
| **高質量流量** | $15-30 | $5-15 | $500-1,500 | $5,000-15,000 |

*CPM = Cost Per Mille（每千次展示收費）  
**RPM = Revenue Per Mille（實際每千次展示收益）

**影響因素**：
- 流量質量（地理位置、設備類型）
- 訪客停留時長
- 廣告相關性

---

### SEO 增長預測

#### 自然流量增長路徑

##### 第一階段：奠基期（0-3 個月）
- **預計訪問量**：50-200 次/天
- **主要來源**：直接流量、社交分享
- **SEO 工作**：建立反向鏈接、內容優化
- **月均收益**：$3-30（基於 CPM $2-5）

##### 第二階段：成長期（3-12 個月）
- **預計訪問量**：500-3,000 次/天
- **主要來源**：SEO 排名改善、社交媒體增長
- **SEO 工作**：長尾關鍵詞優化、用戶體驗改善
- **月均收益**：$50-300

##### 第三階段：穩定期（12+ 個月）
- **預計訪問量**：3,000-10,000 次/天
- **主要來源**：自然搜尋（60%+）、直接訪問
- **SEO 優勢**：品牌知名度提升、高排名穩定性
- **月均收益**：$300-1,000+

#### 達到 $1/天 收益的時間估計

**假設條件**：
- 平均 CPM = $3
- 平均 RPM = $1.5（考慮 50% 廣告填充率損失）
- 每位訪客平均停留 3-5 分鐘
- 每位訪客展示 1-2 次廣告

**所需訪客計算**：
```
$1 / 天 = $30 / 月（極限情況）
需要 RPM × 訪客數 ≥ $30
若 RPM = $1.5，需要 20,000 訪客/月 ≈ 667 訪客/天
```

**時間預估**：

| 成長速度 | 所需時間 | 前置條件 | 難度 |
|---------|---------|---------|------|
| **悲觀** | 18-24 個月 | 低流量增長、低 CPM | 高 |
| **中等** | 9-12 個月 | 適度 SEO、社交推廣 | 中 |
| **樂觀** | 4-6 個月 | 積極推廣、病毒式增長 | 低 |

**關鍵推動因素**：
1. **SEO 優化**：關鍵詞排名穩定性
2. **社交媒體**：遊戲分享與推廣
3. **反向鏈接**：遊戲社區、內容平台引入
4. **用戶留存**：排行榜、競賽、定期更新

---

## 版權與侵權風險評估

### 遊戲概念分析

#### Snowball Fight 創意來源

**遊戲模式**：經典的「堡壘攻防」或「投射物競技」機制

**類似的已存在遊戲**：
- 2D 投射類遊戲（如 Worms 系列）
- 物理沙盒遊戲（如 Angry Birds）
- 塔防策略遊戲（某些拖曳機制相似）

#### 侵權風險評估

| 風險項目 | 評分 | 說明 | 建議 |
|---------|------|------|------|
| **遊戲玩法** | 🟢 低 | 打雪仗是通用玩法，無專利保護 | 無需改動 |
| **藝術風格** | 🟢 低 | 像素藝術風格廣泛使用，無侵權 | 持續使用 |
| **角色設計** | 🟢 低 | 原創簡單幾何人物，無相似性 | 無需修改 |
| **音效/音樂** | 🟡 中 | 取決於音效來源授權 | 確認所有音效的授權來源 |
| **品牌名稱** | 🟢 低 | "Snowcraft"無知名品牌衝突 | 監控商標 |
| **程式碼** | 🟢 低 | 自行開發，無第三方程式碼複製 | 定期開源協議檢查 |

### 具體風險分析

#### 1. 遊戲玩法（無侵權風險）

**理由**：
- 投射物遊戲玩法是通用遊戲設計模式
- 打雪仗主題並無專利保護
- 無複製特定遊戲的核心玩法

**結論**：✅ **安全**

#### 2. 藝術資源

**檢查項目**：
- ✅ 像素藝術風格（通用）
- ✅ 角色設計（簡化幾何形狀）
- ❓ 背景資源（需確認）

**建議**：確認 `public/img/` 中所有圖片資源的來源

#### 3. 音效與音樂

**當前配置**：位置 `public/sound/`

**需要檢查**：
- 音效是否來自開源庫（如 Freesound.org、Zapsplat）
- 是否遵守 CC 協議（Creative Commons）
- 是否有正確歸屬標註

**建議**：
```
如果使用第三方音效，應在遊戲或文檔中註明：
"Sound effects from [來源名稱] under [協議類型]"
```

#### 4. 開源依賴與授權

**當前依賴**：
```json
{
  "next": "MIT",
  "react": "MIT",
  "zustand": "MIT",
  "tailwindcss": "MIT",
  "typescript": "Apache 2.0"
}
```

**授權相容性**：✅ **全部相容** - MIT 和 Apache 2.0 可混用

**專案授權**：MIT License ✅

---

### 侵權風險總結

| 項目 | 風險等級 | 建議行動 |
|------|---------|---------|
| **遊戲玩法** | 🟢 無風險 | 無需採取行動 |
| **視覺設計** | 🟢 無風險 | 持續使用原創設計 |
| **音效資源** | 🟡 需確認 | 檢查所有音效授權狀態 |
| **代碼與依賴** | 🟢 無風險 | 已遵守所有開源協議 |
| **商標/品牌** | 🟢 無風險 | 無知名品牌衝突 |

**整體評估**：✅ **侵權風險低** - 主要需確認音效資源授權來源

---

## 推薦改進項目

### SEO 優化

1. **內容擴展**
   - 添加遊戲攻略頁面
   - 創建遊戲技巧博客文章
   - 發佈開發者日誌

2. **技術 SEO**
   - 監控 Core Web Vitals
   - 實現預渲染頁面
   - 新增更多結構化資料

3. **建立反向鏈接**
   - 提交至遊戲社區網站
   - 與遊戲部落格合作
   - 創建可分享的內容

### 廣告優化

1. **廣告位置優化**
   - A/B 測試不同廣告尺寸
   - 優化廣告展示時機
   - 監控廣告品質評分

2. **用戶體驗**
   - 避免廣告影響遊戲性
   - 實現廣告間隙（遊戲暫停時）
   - 考慮無廣告付費版本

3. **流量質量**
   - 專注高 CPM 地區流量
   - 優化用戶停留時長
   - 提升用戶重訪率

### 遊戲內容

1. **新增功能**
   - 多人線上對戰（需伺服器）
   - 特殊能力與道具系統
   - 季節性活動和限時模式

2. **社區建設**
   - 製作遊戲周邊（Discord、Reddit）
   - 舉辦每週排行榜競賽
   - 收集用戶反饋與改進

3. **平台擴展**
   - 移動應用版本（React Native）
   - Steam 平台發佈
   - 遊戲主機移植（遠期）

---

## 總結

**Snowball Fight** 是一款精心設計的網頁遊戲，具備以下特點：

✅ **技術棧現代化** - Next.js 16 + React 19 + TypeScript  
✅ **SEO 基礎完善** - 結構化資料、多語言支持、響應式設計  
✅ **廣告整合恰當** - Google AdSense 配置靈活，不影響遊戲體驗  
✅ **侵權風險低** - 遊戲玩法與設計原創性強  
✅ **成長潛力** - 預計 4-12 個月達到 $1/天 收益（需積極推廣）

**最大機會點**：通過 SEO 和社交媒體有機增長，結合高質量內容創作，逐步建立遊戲社區和品牌認知度。

---

**文檔最後更新**：2026年1月27日  
**編制人**：Cruxover  
**版本**：v1.0
