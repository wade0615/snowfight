import type { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowfight.vercel.app';

export const metadata: Metadata = {
  title: '隱私政策 Privacy Policy - 打雪仗 Snowball Fight',
  description: '打雪仗遊戲隱私政策：了解我們如何收集、使用和保護您的資訊。Snowball Fight privacy policy: Learn how we collect, use, and protect your information.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: '隱私政策 Privacy Policy - 打雪仗 Snowball Fight',
    description: '打雪仗遊戲隱私政策。Snowball Fight privacy policy.',
    url: '/privacy',
    type: 'website',
  },
};

// WebPage JSON-LD
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy - Snowball Fight',
  description: 'Privacy policy for Snowball Fight game.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Snowball Fight',
    url: siteUrl,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PrivacyClient />
    </>
  );
}
