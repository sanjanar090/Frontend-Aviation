"use client";

import { useState } from "react";
import Header from "@/components/header";
import SafetyAnalysisAllCases from "@/components/safetyanalysisallcases";
import SafetyHeatmap from "@/components/safetyheatmap";
import SafetyKPI from "@/components/safetykpi";
import KPIsContent from "@/components/kpis-content";

export default function SafetyAnalysisDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">

      {/* Header */}
      <Header currentPage="Safety Analysis" />

      {/* Tabs */}
      <div className="bg-white border-b px-6 py-3 flex gap-6">

        <button
          onClick={() => setActiveTab("dashboard")}
          className={`pb-2 font-semibold ${
            activeTab === "dashboard"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("allcases")}
          className={`pb-2 ${
            activeTab === "allcases"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          All cases
        </button>

        <button
          onClick={() => setActiveTab("heatmap")}
          className={`pb-2 ${
            activeTab === "heatmap"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Heatmap
        </button>

        <button
          onClick={() => setActiveTab("kpi")}
          className={`pb-2 ${
            activeTab === "kpi"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          KPIs
        </button>

        <button
          onClick={() => setActiveTab("reference")}
          className={`pb-2 ${
            activeTab === "reference"
              ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Reference values
        </button>
      </div>

      {/* Content Switcher */}
      <main className="flex-1 overflow-auto p-6">

        {activeTab === "dashboard" && (
          <div>
            {/* Your EXISTING dashboard table */}
            <h2 className="text-lg font-semibold mb-4">
              My Safety tasks <span className="text-green-600">(1)</span>
            </h2>
            {/* Keep your previous dashboard content here */}
          </div>
        )}

        {activeTab === "allcases" && <SafetyAnalysisAllCases />}

        {activeTab === "heatmap" && <SafetyHeatmap />}

        {activeTab === "kpi" && <SafetyKPI />}

        {activeTab === "reference" && <KPIsContent />}
      </main>
    </div>
  );
}
