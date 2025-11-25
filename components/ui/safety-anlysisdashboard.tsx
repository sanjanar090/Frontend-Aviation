"use client";

import { Search, Download } from "lucide-react";

export default function SafetyAnalysisDashboard({ activeTab, setActiveTab }) {

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

      {/* rest of your table code */}
    </div>
  );
}
