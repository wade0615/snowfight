'use client';

import { useGameStore } from '@/stores/gameStore';
import { isMobileDevice } from '@/utils/deviceDetection';

export default function Instructions() {
  const { showInstructions, setShowInstructions, t } = useGameStore();
  const isMobile = isMobileDevice();

  if (!showInstructions) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.6)' }}
      onClick={() => setShowInstructions(false)}
    >
      <div
        className={`pixel-border w-full max-w-md mx-4 overflow-y-auto ${isMobile ? 'max-h-[80vw]' : 'max-h-[80vh]'}`}
        style={{
          background: '#FAF5EB',
          padding: '24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '14px',
              color: '#1a1a2e',
            }}
          >
            {t.instructionsTitle}
          </h2>
          <button
            onClick={() => setShowInstructions(false)}
            className="cursor-pointer"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '16px',
              color: '#1a1a2e',
            }}
          >
            x
          </button>
        </div>

        <div
          className="space-y-4"
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: '18px',
            color: '#333',
          }}
        >
          <section>
            <h3
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '10px',
                color: '#1a1a2e',
                marginBottom: '8px',
              }}
            >
              {t.instructionsGoalTitle}
            </h3>
            <p>{t.instructionsGoalDesc}</p>
          </section>

          <div style={{ borderTop: '2px dashed #C8B8A0' }} />

          <section>
            <h3
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '10px',
                color: '#1a1a2e',
                marginBottom: '8px',
              }}
            >
              {t.instructionsControlsTitle}
            </h3>
            <div className="space-y-3">
              <div>
                <p style={{ color: '#3E7DC9', fontWeight: 'bold', marginBottom: '4px' }}>
                  {t.instructionsControlsPC}
                </p>
                <ul className="list-none space-y-1 ml-2">
                  <li>&gt; {t.instructionsControlsPCMove}</li>
                  <li>&gt; {t.instructionsControlsPCAttack}</li>
                  <li>&gt; {t.instructionsControlsPCCharge}</li>
                  <li>&gt; {t.instructionsControlsPCFire}</li>
                </ul>
              </div>
              <div>
                <p style={{ color: '#30A14E', fontWeight: 'bold', marginBottom: '4px' }}>
                  {t.instructionsControlsMobile}
                </p>
                <ul className="list-none space-y-1 ml-2">
                  <li>&gt; {t.instructionsControlsMobileMove}</li>
                  <li>&gt; {t.instructionsControlsMobileAttack}</li>
                  <li>&gt; {t.instructionsControlsMobileCharge}</li>
                  <li>&gt; {t.instructionsControlsMobileFire}</li>
                </ul>
              </div>
            </div>
          </section>

          <div style={{ borderTop: '2px dashed #C8B8A0' }} />

          <section>
            <h3
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '10px',
                color: '#1a1a2e',
                marginBottom: '8px',
              }}
            >
              {t.instructionsHealthTitle}
            </h3>
            <ul className="list-none space-y-1">
              <li>&gt; {t.instructionsHealthPlayer}</li>
              <li>&gt; {t.instructionsHealthEnemy}</li>
              <li>&gt; {t.instructionsHealthDamage}</li>
            </ul>
          </section>

          <div style={{ borderTop: '2px dashed #C8B8A0' }} />

          <section>
            <h3
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '10px',
                color: '#1a1a2e',
                marginBottom: '8px',
              }}
            >
              {t.instructionsScoreTitle}
            </h3>
            <ul className="list-none space-y-1">
              <li>&gt; {t.instructionsScoreHit}</li>
              <li>&gt; {t.instructionsScoreRecord}</li>
            </ul>
          </section>

          <div style={{ borderTop: '2px dashed #C8B8A0' }} />

          <section>
            <h3
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '10px',
                color: '#1a1a2e',
                marginBottom: '8px',
              }}
            >
              {t.instructionsTipsTitle}
            </h3>
            <ul className="list-none space-y-1">
              <li>&gt; {t.instructionsTip1}</li>
              <li>&gt; {t.instructionsTip2}</li>
              <li>&gt; {t.instructionsTip3}</li>
            </ul>
          </section>
        </div>

        <button
          onClick={() => setShowInstructions(false)}
          className="w-full mt-6 pixel-btn cursor-pointer"
          style={{
            padding: '10px 16px',
            background: '#3E7DC9',
            color: '#FFF',
            fontSize: '10px',
          }}
        >
          {t.instructionsClose}
        </button>
      </div>
    </div>
  );
}
