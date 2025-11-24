"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

// -----------------------------
// Internal SafetyAnalysis UI Component
// -----------------------------
function SafetyAnalysis() {
  return (
    <div className="text-black text-lg">
      Safety Dashboard Loaded Successfully ✔
    </div>
  );
}

// -----------------------------
// Main Page Component (Default Export)
// -----------------------------
export default function SafetyAnalysisPage() {
  const [sidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Right Side */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <Header currentPage="Safety - Analysis (All)" />

        {/* Tabs */}
        <div className="w-full bg-[#dbe4ec] border-b">
          <div className="flex gap-8 px-6 h-12 items-center text-sm">

            {["dashboard", "cases", "heatmap", "kpi", "ref"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  activeTab === tab
                    ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                    : "text-gray-600"
                }
              >
                {tab === "dashboard" && "Dashboard"}
                {tab === "cases" && "All cases"}
                {tab === "heatmap" && "Heatmap"}
                {tab === "kpi" && "KPIs"}
                {tab === "ref" && "Reference values"}
              </button>
            ))}

          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && <SafetyAnalysis />}
        </main>

      </div>
    </div>
  );
}
