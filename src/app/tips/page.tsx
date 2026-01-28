import type { Metadata } from 'next';
import TipsClient from './TipsClient';

export const metadata: Metadata = {
  title: '遊戲技巧 Tips - 打雪仗 Snowball Fight',
  description: '打雪仗遊戲攻略和技巧！學習如何取得高分的秘訣。Snowball Fight tips and strategies! Learn the secrets to getting high scores.',
  alternates: {
    canonical: '/tips',
  },
  openGraph: {
    title: '遊戲技巧 Tips - 打雪仗 Snowball Fight',
    description: '打雪仗遊戲攻略和技巧！Learn Snowball Fight tips and strategies!',
    url: '/tips',
    type: 'website',
  },
};

// WebPage JSON-LD
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Snowball Fight Tips and Strategies',
  description: 'Learn tips and strategies for Snowball Fight game to improve your gameplay and get higher scores.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Snowball Fight',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://snowfight.vercel.app',
  },
};

export default function TipsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TipsClient />
    </>
  );
}
