"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import {
  getPublisherId,
  shouldShowAds,
  shouldLoadAdSenseScript,
  isReviewMode,
} from "@/config/ads";

interface GoogleAdsProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "banner" | "leaderboard" | "skyscraper";
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
}

/**
 * Google Ads 廣告組件
 * 支援多種廣告格式和響應式設計
 * 審核期間會隱藏廣告但保留容器結構
 */
export default function GoogleAds({
  adSlot,
  adFormat = "auto",
  style,
  className = "",
  responsive = true,
}: GoogleAdsProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 只有在應該顯示廣告且不是審核模式時才觸發廣告載入
    if (
      typeof window !== "undefined" &&
      window.adsbygoogle &&
      shouldShowAds() &&
      !isReviewMode()
    ) {
      try {
        // 觸發廣告載入
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("Google Ads 載入錯誤:", error);
      }
    }
  }, []);

  // 如果不應該顯示廣告，返回隱形容器（保持佈局）
  if (!shouldShowAds()) {
    return (
      <div
        className={`google-ads-placeholder ${className}`}
        style={{
          display: "block",
          textAlign: "center",
          margin: "20px auto",
          backgroundColor: "transparent",
          borderRadius: "8px",
          padding: "10px",
          minHeight: "100px",
          border: "1px dashed rgba(255, 255, 255, 0.1)",
          ...style,
        }}
        data-ad-slot={adSlot}
        data-ad-review-mode="true"
      >
        {isReviewMode() ? (
          <div style={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "12px" }}>
            AdSense 審核中...
          </div>
        ) : (
          <div style={{ color: "rgba(255, 255, 255, 0.6)" }}>
            <p>廣告位置</p>
            <small>開發環境中不顯示廣告</small>
          </div>
        )}
      </div>
    );
  }

  // 根據廣告格式設定預設樣式
  const getDefaultStyle = () => {
    const baseStyle: React.CSSProperties = {
      display: "block",
      textAlign: "center",
      margin: "20px auto",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      padding: "10px",
      minHeight: "100px",
    };

    switch (adFormat) {
      case "rectangle":
        return { ...baseStyle, width: "300px", height: "250px" };
      case "banner":
        return { ...baseStyle, width: "728px", height: "90px" };
      case "leaderboard":
        return { ...baseStyle, width: "728px", height: "90px" };
      case "skyscraper":
        return { ...baseStyle, width: "160px", height: "600px" };
      default:
        return baseStyle;
    }
  };

  return (
    <>
      {/* Google AdSense 腳本 - 審核期間也要載入 */}
      {shouldLoadAdSenseScript() && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${getPublisherId()}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}

      {/* 廣告容器 */}
      <div
        ref={adRef}
        className={`google-ads-container ${className}`}
        style={{ ...getDefaultStyle(), ...style }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={getPublisherId()}
          data-ad-slot={adSlot}
          data-ad-format={responsive ? "auto" : adFormat}
          data-full-width-responsive={responsive}
        />
      </div>
    </>
  );
}

/**
 * 橫幅廣告組件
 * 適合放在頁面頂部或底部
 */
export function BannerAd({
  adSlot,
  className = "",
}: {
  adSlot: string;
  className?: string;
}) {
  return (
    <GoogleAds
      adSlot={adSlot}
      adFormat="banner"
      className={`banner-ad ${className}`}
      style={{
        width: "100%",
        maxWidth: "728px",
        height: "90px",
        margin: "20px auto",
      }}
    />
  );
}

/**
 * 矩形廣告組件
 * 適合放在側邊欄或內容中
 */
export function RectangleAd({
  adSlot,
  className = "",
}: {
  adSlot: string;
  className?: string;
}) {
  return (
    <GoogleAds
      adSlot={adSlot}
      adFormat="rectangle"
      className={`rectangle-ad ${className}`}
      style={{
        width: "300px",
        height: "250px",
        margin: "20px auto",
      }}
    />
  );
}

/**
 * 響應式廣告組件
 * 自動適應不同螢幕尺寸
 */
export function ResponsiveAd({
  adSlot,
  className = "",
}: {
  adSlot: string;
  className?: string;
}) {
  return (
    <GoogleAds
      adSlot={adSlot}
      adFormat="auto"
      responsive={true}
      className={`responsive-ad ${className}`}
      style={{
        width: "100%",
        maxWidth: "728px",
        margin: "20px auto",
      }}
    />
  );
}

/**
 * 側邊欄廣告組件
 * 適合放在側邊欄
 */
export function SidebarAd({
  adSlot,
  className = "",
}: {
  adSlot: string;
  className?: string;
}) {
  return (
    <GoogleAds
      adSlot={adSlot}
      adFormat="skyscraper"
      className={`sidebar-ad ${className}`}
      style={{
        width: "160px",
        height: "600px",
        margin: "20px auto",
      }}
    />
  );
}

// 擴展 Window 介面以包含 AdSense
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}
