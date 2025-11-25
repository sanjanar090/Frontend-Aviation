"use client";

import React from "react";

interface RiskMatrixProps {
  title: string;
  count: number;
  data: number[][];
  totalScore: number;
  scoreColors?: { primary: string; secondary: string };
}

/**
 * Severity order: TOP -> BOTTOM = HH, H, M, L, LL
 * Likelihood left->right = LL, L, M, H, HH
 */
const SEVERITY_LEVELS = ["HH", "H", "M", "L", "LL"];
const LIKELIHOOD_LEVELS = ["LL", "L", "M", "H", "HH"];

/** Simple color-class mapping used in screenshot */
const getCellColor = (severityIdx: number, likelihoodIdx: number) => {
  // severityIdx: 0=HH ... 4=LL, likelihoodIdx: 0=LL ... 4=HH
  // produce similar visual palette as the screenshot
  // high risk zone: top-right
  if (severityIdx <= 1 && likelihoodIdx >= 2) return "bg-rose-300"; // high/vhigh
  if (severityIdx === 2 && likelihoodIdx >= 3) return "bg-rose-300";
  if (severityIdx === 2 && likelihoodIdx === 2) return "bg-yellow-300";
  if (severityIdx === 3 && likelihoodIdx >= 3) return "bg-yellow-200";
  if (severityIdx >= 3 && likelihoodIdx <= 1) return "bg-cyan-100";
  if (severityIdx === 2 && likelihoodIdx <= 1) return "bg-green-400";
  return "bg-amber-100";
};

export default function RiskMatrix({
  title,
  count,
  data,
  totalScore,
  scoreColors,
}: RiskMatrixProps) {
  // SAFETY: guarantee 5x5 matrix and keep severity order matching the screenshot (HH->LL)
  const safeMatrix: number[][] = Array.from({ length: 5 }, (_, r) =>
    Array.from({ length: 5 }, (_, c) => {
      // user may supply rows in any order — assume they provided rows top->bottom matching SEVERITY_LEVELS order
      // fallback to 0 if missing
      return data?.[r]?.[c] ?? 0;
    })
  );

  const primaryScore = Math.round(totalScore * 0.3);
  const secondaryScore = totalScore - primaryScore;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-500 mt-1">({count})</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors text-sm">
            View all
          </button>
        </div>
      </div>

      {/* Matrix content */}
      <div className="p-6">
        <div className="overflow-x-auto mb-6">
          <div className="inline-block min-w-full">
            {/* Likelihood top label row (visual) */}
            <div className="flex items-center mb-2">
              <div className="w-24 flex-shrink-0" />
              <div className="flex-1 text-center text-sm font-semibold text-slate-700">Likelihood</div>
            </div>

            <div className="flex">
              {/* Severity label column */}
              <div className="w-24 flex-shrink-0">
                <div className="text-center text-sm font-semibold text-slate-700 mb-12">Severity</div>
              </div>

              {/* Matrix grid */}
              <div className="flex flex-col">
                {/* Likelihood headers */}
                <div className="flex mb-1">
                  {LIKELIHOOD_LEVELS.map((level) => (
                    <div
                      key={level}
                      className="w-20 h-10 flex items-center justify-center text-xs font-semibold text-slate-700 border border-gray-300"
                    >
                      {level}
                    </div>
                  ))}
                </div>

                {/* Severity rows (HH -> LL) */}
                {SEVERITY_LEVELS.map((sev, rIdx) => (
                  <div key={sev} className="flex items-center">
                    {/* Severity label */}
                    <div className="w-20 h-20 flex items-center justify-center text-xs font-semibold text-slate-700 border border-gray-300">
                      {sev}
                    </div>

                    {/* Cells */}
                    {LIKELIHOOD_LEVELS.map((_, cIdx) => {
                      const value = safeMatrix[rIdx][cIdx];
                      const colorClass = getCellColor(rIdx, cIdx);

                      return (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className={`w-20 h-20 flex items-center justify-center border border-gray-300 ${colorClass} transition-colors cursor-pointer`}
                        >
                          {value > 0 ? (
                            <span className="text-lg font-bold text-white drop-shadow">{value}</span>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer with scores */}
        <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">Total Score: {totalScore}</p>
          <div className="flex gap-2">
            {scoreColors && (
              <>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border border-gray-300"
                  style={{ backgroundColor: scoreColors.primary }}
                >
                  {primaryScore}
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border border-gray-300"
                  style={{ backgroundColor: scoreColors.secondary }}
                >
                  {secondaryScore}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
