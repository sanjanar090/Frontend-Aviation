"use client";

export default function SafetyHeatmap() {
  const columns = [
    { name: "Airport", score: 0, cases: 2, color: "bg-green-100" },
    { name: "Technical", score: 28, cases: 17, color: "bg-yellow-100" },
    { name: "Station", score: 20, cases: 1, color: "bg-green-100" },
    { name: "Logistics", score: 0, cases: 2, color: "bg-green-100" },
    { name: "Procedural", score: 121, cases: 4, color: "bg-red-100" },
    { name: "Quality of Service", score: 0, cases: 1, color: "bg-green-100" },
    { name: "Health and Safety", score: 28, cases: 7, color: "bg-yellow-100" },
    { name: "Other", score: 41, cases: 30, color: "bg-yellow-100" },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* TITLE */}
      <h2 className="text-2xl font-semibold">Safety heatmap</h2>

      <p className="text-gray-600 max-w-2xl text-sm">
        Select a cell in the heatmap to show all related cases. In each cell,
        the first number shows the risk score, with the second number in the circle
        representing total related cases.
      </p>

      {/* FILTER BAR */}
      <div className="flex items-center gap-4 bg-white border rounded-lg p-4 shadow-sm">
        <select className="border p-2 rounded-lg bg-gray-50 text-sm">
          <option>Module: Safety Module</option>
        </select>

        <select className="border p-2 rounded-lg bg-gray-50 text-sm">
          <option>Active/Inactive users</option>
        </select>

        <select className="border p-2 rounded-lg bg-gray-50 text-sm">
          <option>Action Status</option>
        </select>

        <select className="border p-2 rounded-lg bg-gray-50 text-sm">
          <option>Subsystems: Safety</option>
        </select>

        <button className="ml-auto border px-4 py-2 rounded-lg text-sm">
          Show filters
        </button>
      </div>

      {/* HEATMAP TABLE */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-sm text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left w-40">Affected Fleet</th>
              {columns.map((col) => (
                <th key={col.name} className="p-3 text-center whitespace-nowrap">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-3 border-r font-medium">Affected Fleet</td>

              {columns.map((col) => (
                <td
                  key={col.name}
                  className={`p-3 text-center border-r ${col.color}`}
                >
                  <div className="font-semibold">{col.score}</div>
                  <div className="mt-1 flex justify-center">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border">
                      {col.cases}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
