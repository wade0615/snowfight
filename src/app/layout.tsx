import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

const gaId = process.env.NEXT_PUBLIC_GA_ID || '';

// Pixel Art fonts loaded via CSS @import in globals.css (Press Start 2P + VT323)

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowcraft-rho.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '打雪仗 Snowball Fight - 雪球大戰網頁遊戲 | Free Online Snowball Game',
  description: '免費線上打雪仗遊戲！體驗刺激的雪球大戰，支援電腦和手機。Free online snowball fight game! Battle enemies in an epic snowball war. Play on desktop and mobile.',
  keywords: [
    'snowball fight',
    'snowball game',
    'snowfight',
    'snowcraft',
    'snowball war',
    'online game',
    'free browser game',
    'web game',
    'free game',
    '雪球戰爭',
    '雪球大戰',
    '打雪仗',
    '雪球遊戲',
    '網頁遊戲',
    '免費遊戲',
    '線上遊戲',
  ],
  authors: [{ name: 'Cruxover' }],
  creator: 'Cruxover',
  publisher: 'Cruxover',
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: '打雪仗 Snowball Fight - 雪球大戰 | Free Snowball Game',
    description: '免費線上雪球大戰！與敵人對戰，體驗刺激的打雪仗遊戲。Free online snowball fight! Battle enemies in an epic snowball war.',
    url: '/',
    type: 'website',
    locale: 'zh_TW',
    alternateLocale: 'en_US',
    siteName: 'Snowball Fight 雪球大戰',
  },
  twitter: {
    card: 'summary_large_image',
    title: '打雪仗 Snowball Fight - 雪球大戰 | Free Snowball Game',
    description: '免費線上雪球大戰遊戲！Free online snowball fight game!',
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '打雪仗 Snowball Fight',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#1a1a2e',
};

// VideoGame JSON-LD 結構化資料
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '打雪仗 Snowball Fight',
  alternateName: 'Snowball Fight - Free Online Snowball War Game',
  description: '免費線上打雪仗遊戲！體驗刺激的雪球大戰。Free online snowball fight game! Battle enemies in an epic snowball war.',
  url: siteUrl,
  genre: ['Action', 'Casual'],
  gamePlatform: ['Web Browser', 'Mobile'],
  applicationCategory: 'Game',
  operatingSystem: 'Any',
  author: {
    '@type': 'Person',
    name: 'Cruxover',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  inLanguage: ['zh-Hant', 'en'],
  numberOfPlayers: {
    '@type': 'QuantitativeValue',
    value: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </head>
      <body className="overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
