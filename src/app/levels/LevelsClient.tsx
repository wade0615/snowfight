'use client';

import PageLayout from '@/components/layouts/PageLayout';
import { usePageLanguage } from '@/components/layouts/PageLayout';
import { translations } from '@/utils/i18n';

export default function LevelsClient() {
  const language = usePageLanguage();
  const t = translations[language];

  return (
    <PageLayout title={t.levelsTitle}>
      <p className="mb-6">{t.levelsIntro}</p>

      {/* Enemy Count Formula */}
      <Section title={t.levelsFormulaTitle}>
        <p className="mb-2">{t.levelsFormulaDesc}</p>
        <div
          className="p-3 my-3"
          style={{
            background: '#E8E0D0',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '10px',
            lineHeight: '2',
          }}
        >
          {t.levelsFormulaExample}
        </div>

        {/* Level-enemy count table */}
        <table className="w-full mt-4" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1a1a2e', color: '#FAF5EB' }}>
              <th className="p-2 text-left" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}>
                {language === 'zh' ? '關卡' : 'Level'}
              </th>
              <th className="p-2 text-left" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '10px' }}>
                {language === 'zh' ? '敵人數' : 'Enemies'}
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
              <tr
                key={level}
                style={{
                  background: level % 2 === 0 ? '#F0E6D3' : '#FAF5EB',
                }}
              >
                <td className="p-2">{level}</td>
                <td className="p-2">{3 + (level - 1) * 2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Difficulty Stages */}
      <Section title={t.levelsDifficultyTitle}>
        <div className="space-y-4">
          <div>
            <h4
              className="font-bold mb-1"
              style={{ color: '#30A14E' }}
            >
              {t.levelsDifficultyEarly}
            </h4>
            <p>{t.levelsDifficultyEarlyDesc}</p>
          </div>
          <div>
            <h4
              className="font-bold mb-1"
              style={{ color: '#E9A620' }}
            >
              {t.levelsDifficultyMid}
            </h4>
            <p>{t.levelsDifficultyMidDesc}</p>
          </div>
          <div>
            <h4
              className="font-bold mb-1"
              style={{ color: '#E74C3C' }}
            >
              {t.levelsDifficultyLate}
            </h4>
            <p>{t.levelsDifficultyLateDesc}</p>
          </div>
        </div>
      </Section>

      {/* Progression */}
      <Section title={t.levelsProgressionTitle}>
        <p>{t.levelsProgressionDesc}</p>
      </Section>

      {/* Tactics */}
      <Section title={t.levelsTacticsTitle} isLast>
        <ul className="list-none space-y-3">
          <li style={{ fontSize: '13px' }}>{t.levelsTactics1}</li>
          <li style={{ fontSize: '13px' }}>{t.levelsTactics2}</li>
          <li style={{ fontSize: '13px' }}>{t.levelsTactics3}</li>
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
