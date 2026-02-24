'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { usePageLanguage } from '@/components/layouts/PageLayout';
import { translations } from '@/utils/i18n';

export default function TipsClient() {
  const language = usePageLanguage();
  const t = translations[language];

  return (
    <PageLayout title={t.tipsTitle}>
      <p className="mb-6">{t.tipsIntro}</p>

      {/* Basic Tips */}
      <Section title={t.tipsBasicTitle}>
        <p className="mb-3" style={{ fontSize: '13px', opacity: 0.85 }}>{t.tipsBasicIntro}</p>
        <ul className="list-none space-y-2">
          <li>&gt; {t.tipsBasic1}</li>
          <li>&gt; {t.tipsBasic2}</li>
          <li>&gt; {t.tipsBasic3}</li>
          <li>&gt; {t.tipsBasic4}</li>
          <li>&gt; {t.tipsBasic5}</li>
        </ul>
      </Section>

      {/* Advanced Tips */}
      <Section title={t.tipsAdvancedTitle}>
        <p className="mb-3" style={{ fontSize: '13px', opacity: 0.85 }}>{t.tipsAdvancedIntro}</p>
        <ul className="list-none space-y-2">
          <li>&gt; {t.tipsAdvanced1}</li>
          <li>&gt; {t.tipsAdvanced2}</li>
          <li>&gt; {t.tipsAdvanced3}</li>
          <li>&gt; {t.tipsAdvanced4}</li>
          <li>&gt; {t.tipsAdvanced5}</li>
        </ul>
      </Section>

      {/* Survival Strategies */}
      <Section title={t.tipsSurvivalTitle} isLast>
        <p className="mb-3" style={{ fontSize: '13px', opacity: 0.85 }}>{t.tipsSurvivalIntro}</p>
        <ul className="list-none space-y-2">
          <li>&gt; {t.tipsSurvival1}</li>
          <li>&gt; {t.tipsSurvival2}</li>
          <li>&gt; {t.tipsSurvival3}</li>
          <li>&gt; {t.tipsSurvival4}</li>
        </ul>
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
