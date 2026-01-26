import type { Metadata, Viewport } from 'next';
import './globals.css';

// Pixel Art fonts loaded via CSS @import in globals.css (Press Start 2P + VT323)

export const metadata: Metadata = {
  title: '打雪仗 Snowball Fight - 雪球大戰網頁遊戲',
  description: '免費線上打雪仗遊戲！在雪球戰爭中與敵人對戰，體驗刺激的雪球大戰。支援電腦和手機，隨時隨地享受 Snowball Fight 雪球對戰的樂趣。',
  keywords: [
    'snowball fight',
    'snowball game',
    'snowfight',
    'snowcraft',
    '雪球戰爭',
    '雪球大戰',
    '打雪仗',
    '雪球遊戲',
    '網頁遊戲',
    'web game',
    '免費遊戲',
    'free game',
  ],
  authors: [{ name: 'Cruxover' }],
  creator: 'Cruxover',
  publisher: 'Cruxover',
  openGraph: {
    title: '打雪仗 Snowball Fight - 雪球大戰網頁遊戲',
    description: '免費線上打雪仗遊戲！在雪球戰爭中與敵人對戰，體驗刺激的雪球大戰。',
    type: 'website',
    locale: 'zh_TW',
    siteName: 'Snowball Fight 雪球大戰',
  },
  twitter: {
    card: 'summary_large_image',
    title: '打雪仗 Snowball Fight - 雪球大戰網頁遊戲',
    description: '免費線上打雪仗遊戲！體驗刺激的雪球戰爭。',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className="overflow-hidden">
        {children}
      </body>
    </html>
  );
}
