'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { usePageLanguage } from '@/components/layouts/PageLayout';
import { translations } from '@/utils/i18n';

export default function AboutClient() {
  const language = usePageLanguage();
  const t = translations[language];

  return (
    <PageLayout title={t.aboutTitle}>
      {/* Game Description */}
      <Section title={t.aboutGameTitle}>
        <p className="mb-3">{t.aboutGameDesc1}</p>
        <p>{t.aboutGameDesc2}</p>
      </Section>

      {/* Features */}
      <Section title={t.aboutFeaturesTitle}>
        <ul className="list-none space-y-2">
          <li>&gt; {t.aboutFeature1}</li>
          <li>&gt; {t.aboutFeature2}</li>
          <li>&gt; {t.aboutFeature3}</li>
          <li>&gt; {t.aboutFeature4}</li>
          <li>&gt; {t.aboutFeature5}</li>
        </ul>
      </Section>

      {/* Technical Info */}
      <Section title={t.aboutTechTitle}>
        <p>{t.aboutTechStack}</p>
      </Section>

      {/* Developer */}
      <Section title={t.aboutDeveloperTitle}>
        <p>{t.aboutDeveloperDesc}</p>
      </Section>

      {/* Contact */}
      <Section title={t.aboutContactTitle} isLast>
        <p>{t.aboutContactDesc}</p>
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
