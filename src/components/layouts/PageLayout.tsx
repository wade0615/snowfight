'use client';

import { useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import GoogleAds from '@/components/GoogleAds';
import { ADS_CONFIG } from '@/config/ads';
import type { Language } from '@/utils/i18n';
import {
  getBrowserLanguage,
  getStoredLanguage,
  setStoredLanguage,
} from '@/utils/i18n';

interface PageLayoutProps {
  children: React.ReactNode;
  /** Page title displayed in header */
  title: string;
}

// Storage subscription for useSyncExternalStore
function subscribeToLanguageStorage(callback: () => void) {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === 'snowball-fight-language') {
      callback();
    }
  };
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}

function getLanguageSnapshot(): Language {
  return getStoredLanguage() || getBrowserLanguage();
}

function getLanguageServerSnapshot(): Language {
  return 'zh';
}

/**
 * Shared layout for SEO pages
 * - Deep blue background (#1a1a2e)
 * - Cream content area (#FAF5EB) with pixel border
 * - Back to game button
 * - Language toggle
 * - Desktop ads (bottom banner + right sidebar)
 */
export default function PageLayout({ children, title }: PageLayoutProps) {
  // Use useSyncExternalStore for proper hydration-safe language state
  const language = useSyncExternalStore(
    subscribeToLanguageStorage,
    getLanguageSnapshot,
    getLanguageServerSnapshot
  );

  useEffect(() => {
    // Update html lang attribute (external system sync - this is appropriate for useEffect)
    document.documentElement.lang = language === 'zh' ? 'zh-Hant' : 'en-US';
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setStoredLanguage(newLang);
    // Trigger re-render by dispatching a storage event for same-tab updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'snowball-fight-language',
      newValue: newLang,
    }));
  };

  // Navigation translations
  const navText = {
    backToGame: language === 'zh' ? '返回遊戲' : 'Back to Game',
  };

  return (
    <div
      className="page-scrollable min-h-screen w-full"
      style={{ background: '#1a1a2e' }}
    >
      {/* Main content area */}
      <div className="flex flex-col items-center px-4 py-8 min-h-screen">
        {/* Header with navigation */}
        <header className="w-full max-w-3xl flex justify-between items-center mb-6">
          <Link
            href="/"
            className="pixel-btn px-3 py-2"
            style={{
              background: '#3E7DC9',
              color: '#FFF',
              fontSize: '10px',
              textDecoration: 'none',
            }}
          >
            {navText.backToGame}
          </Link>

          <button
            onClick={toggleLanguage}
            className="pixel-btn px-3 py-2"
            style={{
              background: '#FAF5EB',
              color: '#1a1a2e',
              fontSize: '10px',
            }}
          >
            {language === 'zh' ? 'EN' : '中'}
          </button>
        </header>

        {/* Content card */}
        <main
          className="pixel-border w-full max-w-3xl overflow-y-auto"
          style={{
            background: '#FAF5EB',
            padding: '24px',
            maxHeight: 'calc(100vh - 200px)',
          }}
        >
          {/* Page title */}
          <h1
            className="mb-6 text-center"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '16px',
              color: '#1a1a2e',
              lineHeight: '1.6',
            }}
          >
            {title}
          </h1>

          {/* Page content */}
          <div
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: '20px',
              color: '#333',
              lineHeight: '1.5',
            }}
          >
            {children}
          </div>
        </main>

        {/* Footer links */}
        <footer className="w-full max-w-3xl mt-6 flex flex-wrap justify-center gap-4">
          <FooterLink href="/how-to-play">
            {language === 'zh' ? '遊戲說明' : 'How to Play'}
          </FooterLink>
          <FooterLink href="/tips">
            {language === 'zh' ? '遊戲技巧' : 'Tips'}
          </FooterLink>
          <FooterLink href="/levels">
            {language === 'zh' ? '關卡介紹' : 'Levels'}
          </FooterLink>
          <FooterLink href="/about">
            {language === 'zh' ? '關於' : 'About'}
          </FooterLink>
          <FooterLink href="/privacy">
            {language === 'zh' ? '隱私政策' : 'Privacy'}
          </FooterLink>
        </footer>
      </div>

      {/* Desktop-only ads */}
      <>
        {/* Bottom banner - visible on tall screens */}
        <div
          className="hidden md:block fixed bottom-0 left-1/2 -translate-x-1/2 z-50"
          style={{ pointerEvents: 'auto' }}
        >
          <GoogleAds
            adSlot={ADS_CONFIG.AD_SLOTS.GAME_BOTTOM_BANNER}
            adFormat="banner"
            responsive
            style={{
              width: '728px',
              maxWidth: '100vw',
              height: '90px',
              margin: 0,
            }}
          />
        </div>

        {/* Right sidebar skyscraper - visible on wide screens */}
        <div
          className="hidden xl:flex fixed right-0 top-1/2 -translate-y-1/2 z-50"
          style={{ pointerEvents: 'auto' }}
        >
          <GoogleAds
            adSlot={ADS_CONFIG.AD_SLOTS.GAME_RIGHT_SIDEBAR}
            adFormat="skyscraper"
            responsive={false}
            style={{
              width: '160px',
              height: '600px',
              margin: 0,
            }}
          />
        </div>
      </>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:underline"
      style={{
        fontFamily: "'VT323', monospace",
        fontSize: '16px',
        color: '#8899aa',
      }}
    >
      {children}
    </Link>
  );
}

// Export a helper hook for pages to use
export function usePageLanguage(): Language {
  return useSyncExternalStore(
    subscribeToLanguageStorage,
    getLanguageSnapshot,
    getLanguageServerSnapshot
  );
}
