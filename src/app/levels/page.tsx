import type { Metadata } from 'next';
import LevelsClient from './LevelsClient';

export const metadata: Metadata = {
  title: '關卡介紹 Levels - 打雪仗 Snowball Fight',
  description: '打雪仗關卡設計詳解！了解敵人數量公式和難度階段。Snowball Fight level guide! Learn about enemy count formula and difficulty stages.',
  alternates: {
    canonical: '/levels',
  },
  openGraph: {
    title: '關卡介紹 Levels - 打雪仗 Snowball Fight',
    description: '打雪仗關卡設計詳解！Snowball Fight level guide!',
    url: '/levels',
    type: 'website',
  },
};

// WebPage JSON-LD
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Snowball Fight Level Guide',
  description: 'Complete guide to Snowball Fight levels including enemy count formula, difficulty stages, and progression system.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Snowball Fight',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://snowfight.vercel.app',
  },
};

export default function LevelsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LevelsClient />
    </>
  );
}
