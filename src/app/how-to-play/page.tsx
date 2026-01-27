import type { Metadata } from 'next';
import HowToPlayClient from './HowToPlayClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snowfight.vercel.app';

export const metadata: Metadata = {
  title: '遊戲說明 How to Play - 打雪仗 Snowball Fight',
  description: '學習如何玩打雪仗遊戲！完整的操作說明、計分規則和生命值系統介紹。Learn how to play Snowball Fight! Complete guide to controls, scoring, and health system.',
  alternates: {
    canonical: '/how-to-play',
  },
  openGraph: {
    title: '遊戲說明 How to Play - 打雪仗 Snowball Fight',
    description: '學習如何玩打雪仗遊戲！完整操作指南。Learn how to play Snowball Fight!',
    url: '/how-to-play',
    type: 'website',
  },
};

// FAQPage JSON-LD for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I play Snowball Fight on PC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On PC, drag the red character with your mouse to move. Hold SPACE to charge your throw, and release to fire. Longer charge means farther throw distance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I play Snowball Fight on mobile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On mobile, drag the red character to move. Use the attack button in the bottom-left corner to charge and throw snowballs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the goal of Snowball Fight?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The goal is to eliminate all enemies (green characters) to complete each level. Avoid getting hit by enemy snowballs to preserve your health.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does scoring work in Snowball Fight?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each hit on an enemy gives 50 points. Your scores are saved to the local leaderboard when the game ends.',
      },
    },
  ],
};

export default function HowToPlayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HowToPlayClient />
    </>
  );
}
