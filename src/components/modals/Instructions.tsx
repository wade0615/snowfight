'use client';

import { useGameStore } from '@/stores/gameStore';

export default function Instructions() {
  const { showInstructions, setShowInstructions, t } = useGameStore();

  if (!showInstructions) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setShowInstructions(false)}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">❓ {t.instructionsTitle}</h2>
          <button
            onClick={() => setShowInstructions(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 text-gray-700">
          <section>
            <h3 className="font-bold text-lg mb-2">{t.instructionsGoalTitle}</h3>
            <p>{t.instructionsGoalDesc}</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">{t.instructionsControlsTitle}</h3>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-blue-600 mb-1">{t.instructionsControlsPC}</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>{t.instructionsControlsPCMove}</li>
                  <li>{t.instructionsControlsPCAttack}</li>
                  <li>{t.instructionsControlsPCCharge}</li>
                  <li>{t.instructionsControlsPCFire}</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-green-600 mb-1">{t.instructionsControlsMobile}</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>{t.instructionsControlsMobileMove}</li>
                  <li>{t.instructionsControlsMobileAttack}</li>
                  <li>{t.instructionsControlsMobileCharge}</li>
                  <li>{t.instructionsControlsMobileFire}</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">{t.instructionsHealthTitle}</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>{t.instructionsHealthPlayer}</li>
              <li>{t.instructionsHealthEnemy}</li>
              <li>{t.instructionsHealthDamage}</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">{t.instructionsScoreTitle}</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>{t.instructionsScoreHit}</li>
              <li>{t.instructionsScoreRecord}</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-2">{t.instructionsTipsTitle}</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>{t.instructionsTip1}</li>
              <li>{t.instructionsTip2}</li>
              <li>{t.instructionsTip3}</li>
            </ul>
          </section>
        </div>

        <button
          onClick={() => setShowInstructions(false)}
          className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t.instructionsClose}
        </button>
      </div>
    </div>
  );
}
