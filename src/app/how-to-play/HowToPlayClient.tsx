'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { usePageLanguage } from '@/components/layouts/PageLayout';
import { translations } from '@/utils/i18n';

export default function HowToPlayClient() {
  const language = usePageLanguage();
  const t = translations[language];

  return (
    <PageLayout title={t.howToPlayTitle}>
      <p className="mb-6">{t.howToPlayIntro}</p>

      {/* Game Goal */}
      <Section title={t.howToPlayGoalTitle}>
        <p>{t.howToPlayGoalDesc}</p>
      </Section>

      {/* Controls */}
      <Section title={t.howToPlayControlsTitle}>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-blue-600 mb-2">{t.howToPlayControlsPCTitle}</h4>
            <ul className="list-none space-y-1 ml-2">
              <li>&gt; {t.howToPlayControlsPCMove}</li>
              <li>&gt; {t.howToPlayControlsPCSelect}</li>
              <li>&gt; {t.howToPlayControlsPCCharge}</li>
              <li>&gt; {t.howToPlayControlsPCFire}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-green-600 mb-2">{t.howToPlayControlsMobileTitle}</h4>
            <ul className="list-none space-y-1 ml-2">
              <li>&gt; {t.howToPlayControlsMobileMove}</li>
              <li>&gt; {t.howToPlayControlsMobileSelect}</li>
              <li>&gt; {t.howToPlayControlsMobileCharge}</li>
              <li>&gt; {t.howToPlayControlsMobileFire}</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Health System */}
      <Section title={t.howToPlayHealthTitle}>
        <ul className="list-none space-y-1">
          <li>&gt; {t.howToPlayHealthPlayer}</li>
          <li>&gt; {t.howToPlayHealthEnemy}</li>
          <li>&gt; {t.howToPlayHealthDamage}</li>
          <li>&gt; {t.howToPlayHealthInvincible}</li>
        </ul>
      </Section>

      {/* Scoring */}
      <Section title={t.howToPlayScoringTitle}>
        <ul className="list-none space-y-1">
          <li>&gt; {t.howToPlayScoringHit}</li>
          <li>&gt; {t.howToPlayScoringLevel}</li>
          <li>&gt; {t.howToPlayScoringLeaderboard}</li>
        </ul>
      </Section>

      {/* Barriers */}
      <Section title={t.howToPlayBarriersTitle} isLast>
        <p>{t.howToPlayBarriersDesc}</p>
      </Section>
    </PageLayout>
  );
}

function Section({
  title,
  children,
  isLast = false,
}: {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <section className={isLast ? '' : 'mb-6'}>
      <h2
        className="mb-3"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '12px',
          color: '#1a1a2e',
        }}
      >
        {title}
      </h2>
      {children}
      {!isLast && (
        <div className="mt-4" style={{ borderTop: '2px dashed #C8B8A0' }} />
      )}
    </section>
  );
}
