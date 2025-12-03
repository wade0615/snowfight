import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '打雪仗 SnowCraft',
  description: '一個有趣的網頁打雪仗遊戲',
  keywords: ['遊戲', 'game', '打雪仗', 'snowball', 'snowcraft'],
  authors: [{ name: 'Cruxover' }],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '打雪仗',
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
      <body className="antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
