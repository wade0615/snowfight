/**
 * 國際化 (i18n) 工具
 * 支援中文和英文雙語
 */

export type Language = 'zh' | 'en';

export interface Translations {
  // 遊戲 UI
  gameInfo: string;
  level: string;
  score: string;
  hitProgress: string;
  leaderboard: string;
  instructions: string;

  // 排行榜
  leaderboardTitle: string;
  leaderboardRank: string;
  leaderboardScore: string;
  leaderboardLevel: string;
  leaderboardDuration: string;
  leaderboardDate: string;
  leaderboardTime: string;
  leaderboardEmpty: string;
  leaderboardClear: string;
  leaderboardClearConfirm: string;
  leaderboardClose: string;

  // 遊戲說明
  instructionsTitle: string;
  instructionsGoalTitle: string;
  instructionsGoalDesc: string;
  instructionsControlsTitle: string;
  instructionsControlsPC: string;
  instructionsControlsPCMove: string;
  instructionsControlsPCAttack: string;
  instructionsControlsPCCharge: string;
  instructionsControlsPCFire: string;
  instructionsControlsMobile: string;
  instructionsControlsMobileMove: string;
  instructionsControlsMobileAttack: string;
  instructionsControlsMobileCharge: string;
  instructionsControlsMobileFire: string;
  instructionsHealthTitle: string;
  instructionsHealthPlayer: string;
  instructionsHealthEnemy: string;
  instructionsHealthDamage: string;
  instructionsScoreTitle: string;
  instructionsScoreHit: string;
  instructionsScoreRecord: string;
  instructionsTipsTitle: string;
  instructionsTip1: string;
  instructionsTip2: string;
  instructionsTip3: string;
  instructionsClose: string;

  // 遊戲狀態
  levelComplete: string;
  levelCompleted: string;
  clickToNextLevel: string;
  gameOver: string;
  finalScore: string;
  reachedLevel: string;
  clickToRestart: string;

  // 開場畫面
  greetingTitle: string;
  greetingControlsPC: string;
  greetingControlsPCDesc: string;
  greetingControlsMobile: string;
  greetingControlsMobileDesc: string;
  greetingStart: string;

  // 攻擊按鈕
  attackButtonHint: string;

  // 語言切換
  language: string;
  chinese: string;
  english: string;

  // ===== SEO 頁面翻譯 =====

  // 導航
  navBackToGame: string;
  navHowToPlay: string;
  navTips: string;
  navLevels: string;
  navAbout: string;
  navPrivacy: string;

  // How to Play 頁面
  howToPlayTitle: string;
  howToPlayIntro: string;
  howToPlayGoalTitle: string;
  howToPlayGoalDesc: string;
  howToPlayControlsTitle: string;
  howToPlayControlsPCTitle: string;
  howToPlayControlsPCMove: string;
  howToPlayControlsPCSelect: string;
  howToPlayControlsPCCharge: string;
  howToPlayControlsPCFire: string;
  howToPlayControlsMobileTitle: string;
  howToPlayControlsMobileMove: string;
  howToPlayControlsMobileSelect: string;
  howToPlayControlsMobileCharge: string;
  howToPlayControlsMobileFire: string;
  howToPlayHealthTitle: string;
  howToPlayHealthPlayer: string;
  howToPlayHealthEnemy: string;
  howToPlayHealthDamage: string;
  howToPlayHealthInvincible: string;
  howToPlayScoringTitle: string;
  howToPlayScoringHit: string;
  howToPlayScoringLevel: string;
  howToPlayScoringLeaderboard: string;
  howToPlayBarriersTitle: string;
  howToPlayBarriersDesc: string;

  // Tips 頁面
  tipsTitle: string;
  tipsIntro: string;
  tipsBasicTitle: string;
  tipsBasic1: string;
  tipsBasic2: string;
  tipsBasic3: string;
  tipsBasic4: string;
  tipsAdvancedTitle: string;
  tipsAdvanced1: string;
  tipsAdvanced2: string;
  tipsAdvanced3: string;
  tipsAdvanced4: string;
  tipsSurvivalTitle: string;
  tipsSurvival1: string;
  tipsSurvival2: string;
  tipsSurvival3: string;

  // Levels 頁面
  levelsTitle: string;
  levelsIntro: string;
  levelsFormulaTitle: string;
  levelsFormulaDesc: string;
  levelsFormulaExample: string;
  levelsDifficultyTitle: string;
  levelsDifficultyEarly: string;
  levelsDifficultyEarlyDesc: string;
  levelsDifficultyMid: string;
  levelsDifficultyMidDesc: string;
  levelsDifficultyLate: string;
  levelsDifficultyLateDesc: string;
  levelsProgressionTitle: string;
  levelsProgressionDesc: string;

  // About 頁面
  aboutTitle: string;
  aboutGameTitle: string;
  aboutGameDesc1: string;
  aboutGameDesc2: string;
  aboutFeaturesTitle: string;
  aboutFeature1: string;
  aboutFeature2: string;
  aboutFeature3: string;
  aboutFeature4: string;
  aboutFeature5: string;
  aboutTechTitle: string;
  aboutTechStack: string;
  aboutDeveloperTitle: string;
  aboutDeveloperDesc: string;
  aboutContactTitle: string;
  aboutContactDesc: string;

  // 首頁描述
  homeDescTitle: string;
  homeDescP1: string;
  homeDescP2: string;
  homeHowToTitle: string;
  homeHowToStep1: string;
  homeHowToStep2: string;
  homeHowToStep3: string;
  homeHowToStep4: string;
  homeHowToStep5: string;
  homeWhyTitle: string;
  homeWhy1: string;
  homeWhy2: string;
  homeWhy3: string;
  homeWhy4: string;
  homeWhy5: string;

  // Tips 頁面擴充
  tipsBasicIntro: string;
  tipsAdvancedIntro: string;
  tipsSurvivalIntro: string;
  tipsBasic5: string;
  tipsAdvanced5: string;
  tipsSurvival4: string;

  // Levels 頁面擴充
  levelsTacticsTitle: string;
  levelsTactics1: string;
  levelsTactics2: string;
  levelsTactics3: string;

  // About 頁面擴充
  aboutStoryTitle: string;
  aboutStoryDesc1: string;
  aboutStoryDesc2: string;

  // Privacy 頁面
  privacyTitle: string;
  privacyIntro: string;
  privacyDataTitle: string;
  privacyDataDesc: string;
  privacyDataItem1: string;
  privacyDataItem2: string;
  privacyLocalStorageTitle: string;
  privacyLocalStorageDesc: string;
  privacyLocalStorageItem1: string;
  privacyLocalStorageItem2: string;
  privacyAdsTitle: string;
  privacyAdsDesc: string;
  privacyAnalyticsTitle: string;
  privacyAnalyticsDesc: string;
  privacyThirdPartyTitle: string;
  privacyThirdPartyDesc: string;
  privacyChangesTitle: string;
  privacyChangesDesc: string;
  privacyContactTitle: string;
  privacyContactDesc: string;
  privacyLastUpdated: string;
}

export const translations: Record<Language, Translations> = {
  zh: {
    // 遊戲 UI
    gameInfo: '遊戲資訊',
    level: '關卡',
    score: '分數',
    hitProgress: '命中',
    leaderboard: '排行榜',
    instructions: '說明',

    // 排行榜
    leaderboardTitle: '排行榜',
    leaderboardRank: '排名',
    leaderboardScore: '分數',
    leaderboardLevel: '關卡',
    leaderboardDuration: '時長',
    leaderboardDate: '日期',
    leaderboardTime: '時間',
    leaderboardEmpty: '尚無紀錄',
    leaderboardClear: '清除紀錄',
    leaderboardClearConfirm: '確定要清除所有排行榜紀錄嗎？',
    leaderboardClose: '關閉',

    // 遊戲說明
    instructionsTitle: '遊戲說明',
    instructionsGoalTitle: '🎯 遊戲目標',
    instructionsGoalDesc: '消滅所有敵人（綠色）來過關！小心不要被敵人的雪球打到。',
    instructionsControlsTitle: '🎮 操作方式',
    instructionsControlsPC: '💻 電腦版：',
    instructionsControlsPCMove: '滑鼠拖曳紅色角色來移動和選中',
    instructionsControlsPCAttack: '按住空白鍵蓄力攻擊',
    instructionsControlsPCCharge: '蓄力越久，投擲距離越遠',
    instructionsControlsPCFire: '放開空白鍵發射雪球',
    instructionsControlsMobile: '📱 手機版：',
    instructionsControlsMobileMove: '拖曳紅色角色來移動和選中',
    instructionsControlsMobileAttack: '按住左下角攻擊按鈕蓄力',
    instructionsControlsMobileCharge: '蓄力越久，投擲距離越遠',
    instructionsControlsMobileFire: '放開按鈕發射雪球',
    instructionsHealthTitle: '❤️ 生命值',
    instructionsHealthPlayer: '你的角色有 5 點血量',
    instructionsHealthEnemy: '敵人有 3 點血量',
    instructionsHealthDamage: '被雪球打中會損失 1 點血量',
    instructionsScoreTitle: '📊 計分',
    instructionsScoreHit: '每擊中敵人一次得 50 分',
    instructionsScoreRecord: '分數會記錄在排行榜中',
    instructionsTipsTitle: '💡 小技巧',
    instructionsTip1: '被打中後有短暫無敵時間',
    instructionsTip2: '善用掩體躲避敵人攻擊',
    instructionsTip3: '注意敵人的蓄力動作',
    instructionsClose: '了解了！',

    // 遊戲狀態
    levelComplete: '🎉 過關！',
    levelCompleted: '關完成',
    clickToNextLevel: '點擊任意處進入下一關',
    gameOver: '💀 遊戲結束',
    finalScore: '最終分數',
    reachedLevel: '到達第',
    clickToRestart: '點擊任意處重新開始',

    // 開場畫面
    greetingTitle: '❄️ 打雪仗 ❄️',
    greetingControlsPC: '💻 電腦版操作：',
    greetingControlsPCDesc: '滑鼠拖曳角色移動 → 空白鍵蓄力攻擊',
    greetingControlsMobile: '📱 手機版操作：',
    greetingControlsMobileDesc: '拖曳角色移動 → 按住左下角按鈕蓄力',
    greetingStart: '點擊畫面開始遊戲！',

    // 攻擊按鈕
    attackButtonHint: '先選擇角色',

    // 語言切換
    language: '語言',
    chinese: '中文',
    english: 'English',

    // ===== SEO 頁面翻譯 =====

    // 導航
    navBackToGame: '返回遊戲',
    navHowToPlay: '遊戲說明',
    navTips: '遊戲技巧',
    navLevels: '關卡介紹',
    navAbout: '關於',
    navPrivacy: '隱私政策',

    // How to Play 頁面
    howToPlayTitle: '遊戲說明',
    howToPlayIntro: '歡迎來到打雪仗！這是一款有趣的雪球戰鬥遊戲，你需要擊敗所有敵人才能過關。',
    howToPlayGoalTitle: '遊戲目標',
    howToPlayGoalDesc: '消滅所有敵人（綠色角色）來完成關卡。小心不要被敵人的雪球擊中！',
    howToPlayControlsTitle: '操作方式',
    howToPlayControlsPCTitle: '電腦版操作',
    howToPlayControlsPCMove: '使用滑鼠拖曳紅色角色來移動',
    howToPlayControlsPCSelect: '點擊角色可以選中',
    howToPlayControlsPCCharge: '按住空白鍵蓄力攻擊，蓄力越久投擲距離越遠',
    howToPlayControlsPCFire: '放開空白鍵發射雪球',
    howToPlayControlsMobileTitle: '手機版操作',
    howToPlayControlsMobileMove: '拖曳紅色角色來移動',
    howToPlayControlsMobileSelect: '點擊角色可以選中',
    howToPlayControlsMobileCharge: '按住左下角攻擊按鈕蓄力',
    howToPlayControlsMobileFire: '放開按鈕發射雪球',
    howToPlayHealthTitle: '生命值系統',
    howToPlayHealthPlayer: '玩家角色有 5 點血量',
    howToPlayHealthEnemy: '敵人有 3 點血量',
    howToPlayHealthDamage: '被雪球擊中會損失 1 點血量',
    howToPlayHealthInvincible: '被擊中後有短暫的無敵時間',
    howToPlayScoringTitle: '計分規則',
    howToPlayScoringHit: '每次擊中敵人得 50 分',
    howToPlayScoringLevel: '通過關卡不會額外得分',
    howToPlayScoringLeaderboard: '遊戲結束時分數會記錄在排行榜',
    howToPlayBarriersTitle: '掩體',
    howToPlayBarriersDesc: '場上有掩體可以幫助你躲避敵人的攻擊，善加利用它們！',

    // Tips 頁面
    tipsTitle: '遊戲技巧',
    tipsIntro: '想要在打雪仗中取得高分？這裡有一些實用的技巧幫助你！',
    tipsBasicTitle: '基礎技巧',
    tipsBasic1: '被擊中後會有短暫無敵時間，善用這段時間重新定位',
    tipsBasic2: '蓄力時間決定投擲距離，不要總是滿蓄力',
    tipsBasic3: '保持移動！站著不動很容易被敵人擊中',
    tipsBasic4: '注意敵人的蓄力動作，看到敵人舉手就準備閃避',
    tipsAdvancedTitle: '進階技巧',
    tipsAdvanced1: '利用掩體作為戰術位置，從掩體後面攻擊更安全',
    tipsAdvanced2: '優先攻擊血量低的敵人，快速減少場上敵人數量',
    tipsAdvanced3: '預判敵人移動方向，在敵人將到達的位置發射雪球',
    tipsAdvanced4: '別忘了你可以移動中蓄力，邊跑邊準備攻擊',
    tipsSurvivalTitle: '生存策略',
    tipsSurvival1: '不要貪心追擊，保住自己的血量才是最重要的',
    tipsSurvival2: '當敵人過多時，退到場邊先處理靠近的敵人',
    tipsSurvival3: '在高關卡時，掩體是你最好的朋友',

    // Levels 頁面
    levelsTitle: '關卡介紹',
    levelsIntro: '了解打雪仗的關卡設計，幫助你更好地規劃戰術！',
    levelsFormulaTitle: '敵人數量公式',
    levelsFormulaDesc: '每個關卡的敵人數量根據以下公式計算：',
    levelsFormulaExample: '敵人數 = 3 + (關卡數 - 1) × 2。例如：第 1 關有 3 個敵人，第 5 關有 11 個敵人，第 10 關有 21 個敵人。',
    levelsDifficultyTitle: '難度階段',
    levelsDifficultyEarly: '初期（第 1-3 關）',
    levelsDifficultyEarlyDesc: '敵人數量較少（3-7個），適合熟悉操作和練習瞄準。',
    levelsDifficultyMid: '中期（第 4-7 關）',
    levelsDifficultyMidDesc: '敵人數量增加（9-15個），需要開始運用掩體和走位策略。',
    levelsDifficultyLate: '後期（第 8 關以上）',
    levelsDifficultyLateDesc: '敵人數量眾多（17個以上），需要高超的技巧和謹慎的策略才能生存。',
    levelsProgressionTitle: '關卡進度',
    levelsProgressionDesc: '每關必須消滅所有敵人才能進入下一關。你的分數和關卡進度會記錄在排行榜中，挑戰你的最高紀錄吧！',

    // About 頁面
    aboutTitle: '關於遊戲',
    aboutGameTitle: '打雪仗',
    aboutGameDesc1: '打雪仗是一款像素風格的網頁遊戲，讓你體驗刺激的雪球戰鬥。這款遊戲支援電腦和手機雙平台，隨時隨地都能玩！',
    aboutGameDesc2: '遊戲採用經典的像素藝術風格，搭配簡單直覺的操作方式，無論是遊戲老手還是新手都能輕鬆上手。',
    aboutFeaturesTitle: '遊戲特色',
    aboutFeature1: '可愛的像素藝術風格',
    aboutFeature2: '簡單直覺的操作方式',
    aboutFeature3: '支援電腦和手機',
    aboutFeature4: '中英雙語支援',
    aboutFeature5: '本地排行榜系統',
    aboutTechTitle: '技術資訊',
    aboutTechStack: '本遊戲使用 Next.js、React、TypeScript 和 HTML5 Canvas 開發。',
    aboutDeveloperTitle: '開發者',
    aboutDeveloperDesc: '由 扳手 開發製作。',
    aboutContactTitle: '聯絡我們',
    aboutContactDesc: '如有任何問題或建議，歡迎透過 GitHub 聯繫我們。',

    // 首頁描述
    homeDescTitle: '關於這款遊戲',
    homeDescP1: '打雪仗是一款完全免費的像素風格網頁遊戲，讓你在瀏覽器中享受刺激的雪球大戰！操控你的像素小人，投擲雪球擊敗所有綠色敵人才能進入下一關。每一關的敵人數量都會增加，持續挑戰你的反應速度和策略思考。',
    homeDescP2: '遊戲無需下載或註冊，直接在瀏覽器中即可遊玩。支援電腦（滑鼠與鍵盤）和手機（觸控，自動橫向模式），讓你隨時隨地都能享受打雪仗的樂趣。善用掩體躲避敵人的攻擊，蓄力越久投擲距離越遠，靈活走位才能在高關卡中存活！挑戰自己的最高分，在排行榜上留下傲人成績。',
    homeHowToTitle: '快速上手',
    homeHowToStep1: '點擊畫面開始遊戲',
    homeHowToStep2: '用滑鼠（電腦）或手指（手機）拖曳紅色角色來移動',
    homeHowToStep3: '按住空白鍵（電腦）或左下角按鈕（手機）蓄力攻擊',
    homeHowToStep4: '放開鍵/按鈕，投擲雪球打中敵人',
    homeHowToStep5: '消滅所有綠色敵人，挑戰更難的下一關！',
    homeWhyTitle: '為什麼選擇打雪仗？',
    homeWhy1: '完全免費，無需帳號或任何下載',
    homeWhy2: '像素藝術風格，懷舊感十足',
    homeWhy3: '電腦和手機都支援，隨時能玩',
    homeWhy4: '本地排行榜自動記錄你的最高分',
    homeWhy5: '關卡難度不斷提升，永遠有新挑戰',

    // Tips 頁面擴充
    tipsBasicIntro: '掌握這些基礎技巧，幫助你在遊戲初期站穩腳跟，順利通過前幾關。',
    tipsAdvancedIntro: '熟悉基礎之後，這些進階策略能幫你在中高難度關卡取得更好的成績。',
    tipsSurvivalIntro: '在敵人越來越多的高關卡中，生存比進攻更重要。記住這些策略，才能撐到最後。',
    tipsBasic5: '先選中角色再蓄力，選中後角色會高亮顯示',
    tipsAdvanced5: '利用投擲弧線，嘗試繞過掩體攻擊躲在後方的敵人',
    tipsSurvival4: '場上剩最後一個敵人時，可以大膽移動到最佳攻擊位置',

    // Levels 頁面擴充
    levelsTacticsTitle: '分階段戰術建議',
    levelsTactics1: '初期（第 1-3 關）：熟悉蓄力機制，先練習短距離精準投擲，不要一開始就全力蓄力。',
    levelsTactics2: '中期（第 4-7 關）：開始善用掩體，以「打帶跑」策略避免被多個敵人同時鎖定。',
    levelsTactics3: '後期（第 8 關以上）：保持移動是關鍵，永遠不要站在場地中央，在掩體附近靈活走位。',

    // About 頁面擴充
    aboutStoryTitle: '開發背景',
    aboutStoryDesc1: '打雪仗的誕生源自一個簡單的想法：做一款在任何裝置上都能立即遊玩、操作簡單但具有深度的網頁小遊戲。選擇像素藝術風格是因為它懷舊、可愛，而且在所有螢幕尺寸上都能清晰呈現。',
    aboutStoryDesc2: '遊戲採用 HTML5 Canvas 搭配 React/Next.js 開發，確保在所有現代瀏覽器中都能流暢運行。從最基礎的雪球投擲概念出發，逐步加入掩體系統、蓄力機制、生命值和排行榜功能，讓這款看似簡單的小遊戲擁有更豐富的策略層次。',

    // Privacy 頁面
    privacyTitle: '隱私政策',
    privacyIntro: '本隱私政策說明打雪仗遊戲如何收集、使用和保護您的資訊。',
    privacyDataTitle: '資料收集',
    privacyDataDesc: '我們的遊戲收集以下類型的資料：',
    privacyDataItem1: '遊戲分數和進度（僅儲存在您的裝置上）',
    privacyDataItem2: '語言偏好設定（僅儲存在您的裝置上）',
    privacyLocalStorageTitle: '本地儲存',
    privacyLocalStorageDesc: '我們使用瀏覽器的 localStorage 來儲存：',
    privacyLocalStorageItem1: '排行榜資料',
    privacyLocalStorageItem2: '語言設定',
    privacyAdsTitle: '廣告',
    privacyAdsDesc: '本遊戲使用 Google AdSense 顯示廣告。Google 可能會使用 Cookie 來提供相關廣告。您可以透過 Google 的廣告設定來管理您的廣告偏好。',
    privacyAnalyticsTitle: '分析',
    privacyAnalyticsDesc: '我們使用 Google Analytics 來了解網站流量和使用情況。這有助於我們改善遊戲體驗。Google Analytics 會收集匿名的使用數據。',
    privacyThirdPartyTitle: '第三方服務',
    privacyThirdPartyDesc: '本遊戲使用以下第三方服務：Google AdSense（廣告）和 Google Analytics（分析）。這些服務有各自的隱私政策。',
    privacyChangesTitle: '政策更新',
    privacyChangesDesc: '我們可能會不時更新此隱私政策。任何更改都會在此頁面上公布。',
    privacyContactTitle: '聯絡方式',
    privacyContactDesc: '如果您對此隱私政策有任何疑問，請透過 GitHub 聯繫我們。',
    privacyLastUpdated: '最後更新日期：2025年1月',
  },

  en: {
    // 遊戲 UI
    gameInfo: 'Game Info',
    level: 'Level',
    score: 'Score',
    hitProgress: 'Hits',
    leaderboard: 'Leaderboard',
    instructions: 'Instructions',

    // 排行榜
    leaderboardTitle: 'Leaderboard',
    leaderboardRank: 'Rank',
    leaderboardScore: 'Score',
    leaderboardLevel: 'Level',
    leaderboardDuration: 'Time',
    leaderboardDate: 'Date',
    leaderboardTime: 'Time',
    leaderboardEmpty: 'No records yet',
    leaderboardClear: 'Clear Records',
    leaderboardClearConfirm: 'Are you sure you want to clear all leaderboard records?',
    leaderboardClose: 'Close',

    // 遊戲說明
    instructionsTitle: 'Instructions',
    instructionsGoalTitle: '🎯 Game Goal',
    instructionsGoalDesc: 'Eliminate all enemies (green) to win! Watch out for enemy snowballs.',
    instructionsControlsTitle: '🎮 Controls',
    instructionsControlsPC: '💻 PC:',
    instructionsControlsPCMove: 'Drag red character with mouse to move and select',
    instructionsControlsPCAttack: 'Hold SPACE key to charge attack',
    instructionsControlsPCCharge: 'Hold longer for greater distance',
    instructionsControlsPCFire: 'Release SPACE to throw snowball',
    instructionsControlsMobile: '📱 Mobile:',
    instructionsControlsMobileMove: 'Drag red character to move and select',
    instructionsControlsMobileAttack: 'Hold attack button (bottom-left) to charge',
    instructionsControlsMobileCharge: 'Hold longer for greater distance',
    instructionsControlsMobileFire: 'Release button to throw snowball',
    instructionsHealthTitle: '❤️ Health Points',
    instructionsHealthPlayer: 'Your character has 5 HP',
    instructionsHealthEnemy: 'Enemies have 3 HP',
    instructionsHealthDamage: 'Getting hit reduces 1 HP',
    instructionsScoreTitle: '📊 Scoring',
    instructionsScoreHit: 'Hit an enemy for 50 points',
    instructionsScoreRecord: 'Scores are saved to leaderboard',
    instructionsTipsTitle: '💡 Tips',
    instructionsTip1: 'Brief invincibility after getting hit',
    instructionsTip2: 'Use barriers to dodge enemy attacks',
    instructionsTip3: 'Watch for enemy charging animation',
    instructionsClose: 'Got it!',

    // 遊戲狀態
    levelComplete: '🎉 Level Complete!',
    levelCompleted: 'completed',
    clickToNextLevel: 'Click anywhere to continue',
    gameOver: '💀 Game Over',
    finalScore: 'Final Score',
    reachedLevel: 'Reached Level',
    clickToRestart: 'Click anywhere to restart',

    // 開場畫面
    greetingTitle: '❄️ Snowball Fight ❄️',
    greetingControlsPC: '💻 PC Controls:',
    greetingControlsPCDesc: 'Drag to move → SPACE to charge attack',
    greetingControlsMobile: '📱 Mobile Controls:',
    greetingControlsMobileDesc: 'Drag to move → Hold button to charge',
    greetingStart: 'Click to start!',

    // 攻擊按鈕
    attackButtonHint: 'Select character first',

    // 語言切換
    language: 'Language',
    chinese: '中文',
    english: 'English',

    // ===== SEO Page Translations =====

    // Navigation
    navBackToGame: 'Back to Game',
    navHowToPlay: 'How to Play',
    navTips: 'Tips',
    navLevels: 'Levels',
    navAbout: 'About',
    navPrivacy: 'Privacy',

    // How to Play page
    howToPlayTitle: 'How to Play',
    howToPlayIntro: 'Welcome to Snowball Fight! This is a fun snowball battle game where you need to defeat all enemies to advance.',
    howToPlayGoalTitle: 'Game Goal',
    howToPlayGoalDesc: 'Eliminate all enemies (green characters) to complete each level. Watch out for enemy snowballs!',
    howToPlayControlsTitle: 'Controls',
    howToPlayControlsPCTitle: 'PC Controls',
    howToPlayControlsPCMove: 'Drag the red character with your mouse to move',
    howToPlayControlsPCSelect: 'Click on the character to select it',
    howToPlayControlsPCCharge: 'Hold SPACE to charge your throw - longer charge means farther throw',
    howToPlayControlsPCFire: 'Release SPACE to throw the snowball',
    howToPlayControlsMobileTitle: 'Mobile Controls',
    howToPlayControlsMobileMove: 'Drag the red character to move',
    howToPlayControlsMobileSelect: 'Tap the character to select it',
    howToPlayControlsMobileCharge: 'Hold the attack button in the bottom-left corner to charge',
    howToPlayControlsMobileFire: 'Release the button to throw the snowball',
    howToPlayHealthTitle: 'Health System',
    howToPlayHealthPlayer: 'Your character has 5 HP',
    howToPlayHealthEnemy: 'Enemies have 3 HP',
    howToPlayHealthDamage: 'Getting hit by a snowball costs 1 HP',
    howToPlayHealthInvincible: 'Brief invincibility after getting hit',
    howToPlayScoringTitle: 'Scoring',
    howToPlayScoringHit: 'Each hit on an enemy gives 50 points',
    howToPlayScoringLevel: 'No bonus points for completing levels',
    howToPlayScoringLeaderboard: 'Scores are saved to the leaderboard when game ends',
    howToPlayBarriersTitle: 'Barriers',
    howToPlayBarriersDesc: 'Use the barriers on the field to take cover from enemy attacks!',

    // Tips page
    tipsTitle: 'Game Tips',
    tipsIntro: 'Want to get a high score in Snowball Fight? Here are some useful tips to help you!',
    tipsBasicTitle: 'Basic Tips',
    tipsBasic1: 'You have brief invincibility after getting hit - use this time to reposition',
    tipsBasic2: 'Charge time determines throw distance - don\'t always fully charge',
    tipsBasic3: 'Keep moving! Standing still makes you an easy target',
    tipsBasic4: 'Watch for enemy charging animations - be ready to dodge when they raise their arm',
    tipsAdvancedTitle: 'Advanced Tips',
    tipsAdvanced1: 'Use barriers as tactical positions - attacking from behind cover is safer',
    tipsAdvanced2: 'Prioritize low-health enemies to quickly reduce enemy count',
    tipsAdvanced3: 'Predict enemy movement and throw where they\'re heading',
    tipsAdvanced4: 'You can charge while moving - run and prepare to attack simultaneously',
    tipsSurvivalTitle: 'Survival Strategies',
    tipsSurvival1: 'Don\'t be greedy - preserving your health is the priority',
    tipsSurvival2: 'When overwhelmed, retreat to the edge and deal with nearby enemies first',
    tipsSurvival3: 'In higher levels, barriers are your best friends',

    // Levels page
    levelsTitle: 'Level Guide',
    levelsIntro: 'Learn about Snowball Fight\'s level design to help plan your tactics!',
    levelsFormulaTitle: 'Enemy Count Formula',
    levelsFormulaDesc: 'The number of enemies in each level is calculated as follows:',
    levelsFormulaExample: 'Enemies = 3 + (Level - 1) × 2. For example: Level 1 has 3 enemies, Level 5 has 11 enemies, Level 10 has 21 enemies.',
    levelsDifficultyTitle: 'Difficulty Stages',
    levelsDifficultyEarly: 'Early (Levels 1-3)',
    levelsDifficultyEarlyDesc: 'Fewer enemies (3-7). Perfect for learning controls and practicing aim.',
    levelsDifficultyMid: 'Mid (Levels 4-7)',
    levelsDifficultyMidDesc: 'More enemies (9-15). Time to start using barriers and positioning strategies.',
    levelsDifficultyLate: 'Late (Level 8+)',
    levelsDifficultyLateDesc: 'Many enemies (17+). Requires advanced skills and careful strategy to survive.',
    levelsProgressionTitle: 'Level Progression',
    levelsProgressionDesc: 'Eliminate all enemies to advance to the next level. Your score and progress are saved to the leaderboard - challenge your high score!',

    // About page
    aboutTitle: 'About',
    aboutGameTitle: 'Snowball Fight',
    aboutGameDesc1: 'Snowball Fight is a pixel-art web game that lets you experience exciting snowball battles. The game supports both desktop and mobile platforms - play anytime, anywhere!',
    aboutGameDesc2: 'Featuring classic pixel art style with simple and intuitive controls, this game is easy to pick up for both gaming veterans and newcomers.',
    aboutFeaturesTitle: 'Game Features',
    aboutFeature1: 'Cute pixel art style',
    aboutFeature2: 'Simple and intuitive controls',
    aboutFeature3: 'Desktop and mobile support',
    aboutFeature4: 'Bilingual support (English & Chinese)',
    aboutFeature5: 'Local leaderboard system',
    aboutTechTitle: 'Technical Info',
    aboutTechStack: 'Built with Next.js, React, TypeScript, and HTML5 Canvas.',
    aboutDeveloperTitle: 'Developer',
    aboutDeveloperDesc: 'Developed by Spanner.',
    aboutContactTitle: 'Contact',
    aboutContactDesc: 'For questions or suggestions, please reach out via GitHub.',

    // Home page description
    homeDescTitle: 'About This Game',
    homeDescP1: 'Snowball Fight is a completely free pixel-art browser game where you battle waves of green enemies in thrilling snowball fights! Control your pixel character, throw snowballs to defeat all enemies on the field, and face progressively harder levels that test your reflexes and strategic thinking.',
    homeDescP2: 'No download or registration required — just open your browser and start playing! Fully compatible with both PC (mouse and keyboard) and mobile devices (touch controls with auto-landscape mode). Use barriers for cover, charge your throws for extra range, and move strategically to survive the higher levels. Compete for high scores and claim the top spot on the leaderboard!',
    homeHowToTitle: 'Quick Start Guide',
    homeHowToStep1: 'Click the screen to start the game',
    homeHowToStep2: 'Drag the red character with your mouse (PC) or finger (mobile) to move',
    homeHowToStep3: 'Hold SPACE (PC) or the bottom-left button (mobile) to charge your throw',
    homeHowToStep4: 'Release to throw the snowball at enemies',
    homeHowToStep5: 'Defeat all green enemies to advance to the next (harder) level!',
    homeWhyTitle: 'Why Play Snowball Fight?',
    homeWhy1: 'Completely free — no account or download required',
    homeWhy2: 'Charming pixel art style with a nostalgic retro feel',
    homeWhy3: 'Play on any device — desktop browser or mobile',
    homeWhy4: 'Local leaderboard automatically tracks your personal best',
    homeWhy5: 'Progressively challenging levels keep the game fresh',

    // Expanded Tips
    tipsBasicIntro: 'Master these fundamental techniques to build a strong foundation in the early levels and set yourself up for success.',
    tipsAdvancedIntro: 'Once you have the basics down, these advanced strategies will help you score higher and survive deeper into the game.',
    tipsSurvivalIntro: 'As levels get harder and enemies multiply, survival becomes more important than aggression. Keep these in mind to outlast the toughest waves.',
    tipsBasic5: 'Select your character before charging — the character glows when selected',
    tipsAdvanced5: 'Use the throw arc to lob snowballs over barriers and hit hiding enemies',
    tipsSurvival4: 'When only one enemy remains, safely reposition to your ideal attack spot',

    // Expanded Levels
    levelsTacticsTitle: 'Tactical Advice by Stage',
    levelsTactics1: 'Early (Levels 1-3): Focus on mastering the charge mechanic. Practice short-range precision throws before attempting maximum distance shots.',
    levelsTactics2: 'Mid (Levels 4-7): Start actively using barriers. Use a hit-and-run approach to avoid being targeted by multiple enemies at once.',
    levelsTactics3: 'Late (Level 8+): Constant movement is critical. Never stand in the open center — always stay near cover and keep repositioning.',

    // Expanded About
    aboutStoryTitle: 'Development Story',
    aboutStoryDesc1: 'Snowball Fight was born from a simple idea: create a browser game that can be played instantly on any device, with intuitive controls but enough strategic depth to keep players coming back. The pixel art style was chosen for its nostalgic charm and its ability to look crisp on screens of all sizes.',
    aboutStoryDesc2: 'Built with HTML5 Canvas and React/Next.js for smooth performance across all modern browsers on both desktop and mobile. Starting from the core concept of snowball throwing, the game evolved to include the barrier system, charge mechanics, health points, and leaderboard tracking — all designed to add strategic depth to what looks like a simple game.',

    // Privacy page
    privacyTitle: 'Privacy Policy',
    privacyIntro: 'This privacy policy explains how Snowball Fight collects, uses, and protects your information.',
    privacyDataTitle: 'Data Collection',
    privacyDataDesc: 'Our game collects the following types of data:',
    privacyDataItem1: 'Game scores and progress (stored only on your device)',
    privacyDataItem2: 'Language preferences (stored only on your device)',
    privacyLocalStorageTitle: 'Local Storage',
    privacyLocalStorageDesc: 'We use browser localStorage to store:',
    privacyLocalStorageItem1: 'Leaderboard data',
    privacyLocalStorageItem2: 'Language settings',
    privacyAdsTitle: 'Advertising',
    privacyAdsDesc: 'This game uses Google AdSense to display ads. Google may use cookies to serve relevant advertisements. You can manage your ad preferences through Google\'s ad settings.',
    privacyAnalyticsTitle: 'Analytics',
    privacyAnalyticsDesc: 'We use Google Analytics to understand site traffic and usage patterns. This helps us improve the game experience. Google Analytics collects anonymous usage data.',
    privacyThirdPartyTitle: 'Third-Party Services',
    privacyThirdPartyDesc: 'This game uses the following third-party services: Google AdSense (advertising) and Google Analytics (analytics). These services have their own privacy policies.',
    privacyChangesTitle: 'Policy Updates',
    privacyChangesDesc: 'We may update this privacy policy from time to time. Any changes will be posted on this page.',
    privacyContactTitle: 'Contact',
    privacyContactDesc: 'If you have any questions about this privacy policy, please contact us via GitHub.',
    privacyLastUpdated: 'Last updated: January 2025',
  },
};

/**
 * 獲取瀏覽器語言
 */
export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'zh';
  }

  const browserLang = navigator.language.toLowerCase();

  // 檢查是否為中文
  if (browserLang.startsWith('zh')) {
    return 'zh';
  }

  // 其他情況預設為英文
  return 'en';
}

/**
 * 從 localStorage 獲取語言偏好
 */
export function getStoredLanguage(): Language | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem('snowball-fight-language');
  if (stored === 'zh' || stored === 'en') {
    return stored;
  }

  return null;
}

/**
 * 儲存語言偏好到 localStorage
 */
export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('snowball-fight-language', lang);
}
