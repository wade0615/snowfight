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
  leaderboard: string;
  instructions: string;

  // 排行榜
  leaderboardTitle: string;
  leaderboardRank: string;
  leaderboardScore: string;
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
}

export const translations: Record<Language, Translations> = {
  zh: {
    // 遊戲 UI
    gameInfo: '遊戲資訊',
    level: '關卡',
    score: '分數',
    leaderboard: '排行榜',
    instructions: '說明',

    // 排行榜
    leaderboardTitle: '排行榜',
    leaderboardRank: '排名',
    leaderboardScore: '分數',
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
    instructionsHealthPlayer: '你的角色有 2 點血量',
    instructionsHealthEnemy: '敵人有 3 點血量',
    instructionsHealthDamage: '被雪球打中會損失 1 點血量',
    instructionsScoreTitle: '📊 計分',
    instructionsScoreHit: '每擊中敵人一次得 50 分',
    instructionsScoreRecord: '分數會記錄在排行榜中',
    instructionsTipsTitle: '💡 小技巧',
    instructionsTip1: '被打中後有短暫無敵時間',
    instructionsTip2: '善用三個角色輪流攻擊',
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
  },

  en: {
    // 遊戲 UI
    gameInfo: 'Game Info',
    level: 'Level',
    score: 'Score',
    leaderboard: 'Leaderboard',
    instructions: 'Instructions',

    // 排行榜
    leaderboardTitle: 'Leaderboard',
    leaderboardRank: 'Rank',
    leaderboardScore: 'Score',
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
    instructionsHealthPlayer: 'Your character has 2 HP',
    instructionsHealthEnemy: 'Enemies have 3 HP',
    instructionsHealthDamage: 'Getting hit reduces 1 HP',
    instructionsScoreTitle: '📊 Scoring',
    instructionsScoreHit: 'Hit an enemy for 50 points',
    instructionsScoreRecord: 'Scores are saved to leaderboard',
    instructionsTipsTitle: '💡 Tips',
    instructionsTip1: 'Brief invincibility after getting hit',
    instructionsTip2: 'Use all three characters strategically',
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
