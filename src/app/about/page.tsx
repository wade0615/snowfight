import type { Metadata } from 'next';
import AboutClient from './AboutClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowfight.vercel.app';

export const metadata: Metadata = {
  title: '關於 About - 打雪仗 Snowball Fight',
  description: '關於打雪仗遊戲：一款免費的像素風格雪球大戰網頁遊戲。About Snowball Fight: A free pixel-art snowball battle web game.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: '關於 About - 打雪仗 Snowball Fight',
    description: '關於打雪仗遊戲。About Snowball Fight game.',
    url: '/about',
    type: 'website',
  },
};

// WebPage JSON-LD
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'About Snowball Fight',
  description: 'About Snowball Fight - a free pixel-art snowball battle web game.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Snowball Fight',
    url: siteUrl,
  },
  author: {
    '@type': 'Person',
    name: 'Cruxover',
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
