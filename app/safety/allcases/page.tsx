"use client";

import SafetyAnalysisAllCases from "@/components/safety/safety-analysisallcases";

export default function AllCasesPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">All Safety Analysis Cases</h1>
      <SafetyAnalysisAllCases />
    </div>
  );
}
"use client";

export default function SafetyAnalysisAllCases() {
  return (
    <div className="p-6 bg-[#F3F6FB] min-h-screen">

      {/* Top Title */}
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-2xl font-semibold text-gray-700">Overall Case List</h1>

        <div className="flex gap-3">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
            + New report
          </button>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50">
            Show filters
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-5 border-b border-gray-300 mb-5">
        {["Dashboard", "All cases", "Heatmap", "KPIs", "Reference values"].map((tab, index) => (
          <button
            key={index}
            className={`pb-3 font-medium ${
              tab === "All cases"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Showing text */}
      <p className="text-gray-600 text-sm mb-4">Showing all open cases</p>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Subsystem</th>
              <th className="px-4 py-3 text-left">No</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Days Open</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Flags</th>
              <th className="px-4 py-3 text-left">ERC Score</th>
              <th className="px-4 py-3 text-left">SIRA Result</th>
              <th className="px-4 py-3 text-left">Action Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {/* Phase 1 */}
            <tr className="bg-gray-100 font-medium">
              <td colSpan={11} className="px-4 py-2">
                ▸ Phase: Assess (1)
              </td>
            </tr>

            <tr className="border-b hover:bg-blue-50">
              <td className="px-4 py-3">Safety</td>
              <td className="px-4 py-3">000095</td>
              <td className="px-4 py-3 text-red-500 font-semibold">24/11/2025</td>
              <td className="px-4 py-3">1</td>
              <td className="px-4 py-3">MSR-01</td>
              <td className="px-4 py-3">Maintenance 1</td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-red-200 text-red-700 text-xs rounded">MOR?</span>
              </td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3 text-blue-600 font-bold">&gt;</td>
            </tr>

            {/* Phase 2 */}
            <tr className="bg-gray-100 font-medium">
              <td colSpan={11} className="px-4 py-2">
                ▸ Phase: Investigate (9)
              </td>
            </tr>

            {/* Repeated example row */}
            {Array.from({ length: 9 }).map((_, index) => (
              <tr key={index} className="border-b hover:bg-blue-50">
                <td className="px-4 py-3">Safety</td>
                <td className="px-4 py-3">00008{index + 1}</td>
                <td className="px-4 py-3">20/10/2024</td>
                <td className="px-4 py-3">400</td>
                <td className="px-4 py-3">MSR-01</td>
                <td className="px-4 py-3">Sample case title</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">1</span>
                </td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3">Investigate: (open)</td>
                <td className="px-4 py-3 text-blue-600 font-bold">&gt;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom button */}
      <div className="flex justify-center mt-6">
        <button className="px-8 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
          View Closed Cases (56)
        </button>
      </div>

      {/* Download button */}
      <div className="flex justify-end mt-4">
        <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
          Download ⬇
        </button>
      </div>
    </div>
  );
}
