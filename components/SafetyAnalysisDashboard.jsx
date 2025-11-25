"use client";

import { Search, Download } from "lucide-react";

export default function SafetyAnalysisDashboard() {

  const tasks = [
    {
      task: "Assess report",
      title: "000095 - Maintenance 1",
      dueDate: "01/12/2025",
      assignedTo: "Department/Role",
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">

      {/* Tabs */}
      <div className="bg-white border-b px-6 py-3 flex gap-6">
  <button
    onClick={() => setActiveTab("dashboard")}
    className={`pb-2 ${
      activeTab === "dashboard"
        ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
        : "text-gray-500"
    }`}
  >
    Dashboard
  </button>

  <button
    onClick={() => setActiveTab("all")}
    className={`pb-2 ${
      activeTab === "all"
        ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
        : "text-gray-500"
    }`}
  >
    All cases
  </button>

  <button className="pb-2 text-gray-500">Heatmap</button>
  <button className="pb-2 text-gray-500">KPIs</button>
  <button className="pb-2 text-gray-500">Reference values</button>
</div>


      {/* Content */}
      <main className="flex-1 overflow-auto p-6">

        <h2 className="text-lg font-semibold mb-4">
          My Safety tasks <span className="text-green-600">(1)</span>
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <select className="border rounded px-3 py-1">
            <option>Due date: All time</option>
          </select>

          <select className="border rounded px-3 py-1">
            <option>Status: All</option>
          </select>

          <select className="border rounded px-3 py-1">
            <option>Task: All</option>
          </select>

          <select className="border rounded px-3 py-1">
            <option>Assigned to: All</option>
          </select>

          <div className="ml-auto flex items-center border rounded px-3 py-1 w-64 bg-white">
            <input
              placeholder="Search tasks..."
              className="flex-1 outline-none"
            />
            <Search className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Table */}
        <table className="w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-2 text-left">Task</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Due date</th>
              <th className="p-2 text-left">Assigned to</th>
              <th className="p-2"></th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((t, i) => (
              <tr key={i} className="border-t text-sm">
                <td className="p-3">{t.task}</td>
                <td className="p-3">{t.title}</td>
                <td className="p-3">
                  <span className="px-2 py-1 border border-green-600 text-green-700 rounded text-xs">
                    {t.dueDate}
                  </span>
                </td>
                <td className="p-3">{t.assignedTo}</td>
                <td className="p-3 text-blue-600 text-right">›</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm">Showing 1 - 1 of 1</p>

          <div className="flex items-center gap-3">
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>25</option>
            </select>

            <button className="flex items-center gap-1 px-3 py-1 border rounded text-sm">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
