/**
 * Google Ads 配置
 * Publisher ID 從環境變數讀取
 * 請在 .env.local 中設定 NEXT_PUBLIC_ADSENSE_ID
 */

export const ADS_CONFIG = {
  // Publisher ID - 從環境變數讀取
  PUBLISHER_ID: process.env.NEXT_PUBLIC_ADSENSE_ID || "",

  // 廣告單元配置
  AD_SLOTS: {
    // 遊戲畫面下方橫幅廣告（桌面版）
    GAME_BOTTOM_BANNER: "5579450459",

    // 遊戲畫面右側摩天大樓廣告（桌面版寬螢幕）
    GAME_RIGHT_SIDEBAR: "5579450459",
  },
} as const;

/**
 * 獲取廣告單元 ID
 */
export function getAdSlot(slotKey: keyof typeof ADS_CONFIG.AD_SLOTS): string {
  return ADS_CONFIG.AD_SLOTS[slotKey];
}

/**
 * 獲取 Publisher ID
 */
export function getPublisherId(): string {
  return ADS_CONFIG.PUBLISHER_ID;
}

/**
 * 檢查是否為開發環境
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * 檢查是否為審核模式
 * 審核期間設為 true，通過後設為 false
 */
export function isReviewMode(): boolean {
  return process.env.NEXT_PUBLIC_ADS_ENABLED === "false";
}

/**
 * 檢查是否應該顯示廣告
 */
export function shouldShowAds(): boolean {
  // 在開發環境中不顯示廣告
  if (isDevelopment()) {
    return false;
  }

  // 如果設定為開發模式，不顯示廣告
  if (process.env.NEXT_PUBLIC_DEV_MODE === "true") {
    return false;
  }

  // 在審核模式中不顯示實際廣告（但保留容器）
  if (isReviewMode()) {
    return false;
  }

  // 檢查是否有有效的 Publisher ID
  return !!ADS_CONFIG.PUBLISHER_ID && ADS_CONFIG.PUBLISHER_ID.startsWith("ca-pub-");
}

/**
 * 檢查是否應該載入 AdSense 腳本
 * 審核期間也要載入腳本，確保審核通過
 */
export function shouldLoadAdSenseScript(): boolean {
  // 開發環境不載入
  if (isDevelopment()) {
    return false;
  }

  // 生產環境都要載入（包括審核期間）
  return process.env.NODE_ENV === "production";
}
