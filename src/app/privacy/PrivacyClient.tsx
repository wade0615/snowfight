'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { usePageLanguage } from '@/components/layouts/PageLayout';
import { translations } from '@/utils/i18n';

export default function PrivacyClient() {
  const language = usePageLanguage();
  const t = translations[language];

  return (
    <PageLayout title={t.privacyTitle}>
      <p className="mb-6">{t.privacyIntro}</p>

      {/* Data Collection */}
      <Section title={t.privacyDataTitle}>
        <p className="mb-2">{t.privacyDataDesc}</p>
        <ul className="list-none space-y-1">
          <li>&gt; {t.privacyDataItem1}</li>
          <li>&gt; {t.privacyDataItem2}</li>
        </ul>
      </Section>

      {/* Local Storage */}
      <Section title={t.privacyLocalStorageTitle}>
        <p className="mb-2">{t.privacyLocalStorageDesc}</p>
        <ul className="list-none space-y-1">
          <li>&gt; {t.privacyLocalStorageItem1}</li>
          <li>&gt; {t.privacyLocalStorageItem2}</li>
        </ul>
      </Section>

      {/* Advertising */}
      <Section title={t.privacyAdsTitle}>
        <p>{t.privacyAdsDesc}</p>
      </Section>

      {/* Analytics */}
      <Section title={t.privacyAnalyticsTitle}>
        <p>{t.privacyAnalyticsDesc}</p>
      </Section>

      {/* Third-Party Services */}
      <Section title={t.privacyThirdPartyTitle}>
        <p>{t.privacyThirdPartyDesc}</p>
      </Section>

      {/* Policy Updates */}
      <Section title={t.privacyChangesTitle}>
        <p>{t.privacyChangesDesc}</p>
      </Section>

      {/* Contact */}
      <Section title={t.privacyContactTitle}>
        <p>{t.privacyContactDesc}</p>
      </Section>

      {/* Last Updated */}
      <p
        className="mt-6 text-center"
        style={{ color: '#888', fontSize: '16px' }}
      >
        {t.privacyLastUpdated}
      </p>
    </PageLayout>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
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
      <div className="mt-4" style={{ borderTop: '2px dashed #C8B8A0' }} />
    </section>
  );
}
