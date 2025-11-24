"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function ModuleDashboard() {
  return (
    <div className="p-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* ------------------------- CARD 1 ------------------------- */}
        <ModuleCard
          title="Compliance Module - Third Parties"
          chartData={[
            { name: "Ok", value: 245, color: "#45A556" },
            { name: "Overdue", value: 5, color: "#C03221" },
          ]}
          centerText="250"
          centerSub="scheduled"
          sections={[
            { label: "Findings", value: 0 },
            { label: "Actions", value: 0 },
          ]}
        />

        {/* ------------------------- CARD 2 ------------------------- */}
        <ModuleCard
          title="Compliance Module - Surveys"
          chartData={null}
          centerText=""
          centerSub=""
          sections={[
            { label: "Satisfaction Survey", barColor: "#B91C1C", barWidth: "70%" },
            { label: "Actions", value: 0 },
          ]}
        />

        {/* ------------------------- CARD 3 ------------------------- */}
        <ModuleCard
          title="Compliance Module - Checklists and Schedules"
          chartData={[
            { name: "Ok", value: 18, color: "#45A556" },
            { name: "Overdue", value: 18, color: "#C03221" },
          ]}
          centerText="36"
          centerSub="scheduled"
          sections={[
            { label: "Findings", barColor: "#F59E0B", barWidth: "30%" },
            { label: "Actions", barColor: "#C03221", barWidth: "90%" },
          ]}
        />

        {/* ------------------------- CARD 4 ------------------------- */}
        <ModuleCard
          title="Risk Module"
          chartData={[
            { name: "In Progress", value: 7, color: "#4ADE80" },
            { name: "Continue", value: 9, color: "#15803D" },
          ]}
          centerText="16"
          centerSub="risks"
          sections={[
            { label: "Actions", barColor: "#C03221", barWidth: "25%" },
          ]}
        />

        {/* ------------------------- CARD 5 ------------------------- */}
        <ModuleCard
          title="Workflow Module"
          chartData={[
            { name: "In Progress", value: 11, color: "#22C55E" },
            { name: "Overdue", value: 13, color: "#B91C1C" },
          ]}
          centerText="24"
          centerSub="workflows"
          sections={[
            { label: "Actions", barColor: "#B91C1C", barWidth: "100%" },
          ]}
        />

        {/* ------------------------- CARD 6 ------------------------- */}
        <ModuleCard
          title="Safety Module"
          chartData={[
            { name: "Investigate", value: 9, color: "#6C2BD9" },
            { name: "Monitor", value: 1, color: "#10B981" },
            { name: "Ready", value: 2, color: "#DC2626" },
          ]}
          centerText="12"
          centerSub="cases"
          sections={[
            { label: "All open MORs", value: "No All open MORs to show", isText: true },
            { label: "Actions", barColor: "#2563EB", barWidth: "40%" },
          ]}
        />

      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* -------------------------- MODULE CARD ------------------------------- */
/* ---------------------------------------------------------------------- */

function ModuleCard({
  title,
  chartData,
  centerText,
  centerSub,
  sections = [],
}) {
  return (
    <div className="bg-white rounded-xl shadow border p-5 min-h-[330px] flex flex-col">
      <h2 className="font-semibold text-gray-800 text-sm mb-3">{title}</h2>

      {/* Chart Section */}
      {chartData ? (
        <div className="relative w-40 h-40 mx-auto">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={55}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{centerText}</span>
            <span className="text-xs text-gray-500">{centerSub}</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8 text-sm">
          No chart data
        </div>
      )}

      {/* Sections */}
      <div className="mt-4 space-y-3">
        {sections.map((s, i) => (
          <div key={i}>
            <p className="text-sm text-gray-600">{s.label}</p>

            {s.isText ? (
              <p className="text-xs text-gray-400 mt-1">{s.value}</p>
            ) : s.barColor ? (
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor: s.barColor,
                    width: s.barWidth,
                  }}
                ></div>
              </div>
            ) : (
              <p className="text-xs mt-1 text-gray-500">{s.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* View Actions */}
      <div className="mt-auto pt-4">
        <a href="#" className="text-blue-600 text-sm hover:underline">
          View actions
        </a>
      </div>
    </div>
  );
}
