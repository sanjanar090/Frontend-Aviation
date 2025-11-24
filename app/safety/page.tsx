"use client";

import { useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

import SafetyDashboard from "@/components/safety-dashboard";
import SafetyCase12 from "@/components/safetycase12";
import SafetyDrafts from "@/components/safetydrafts";
import SafetyActions from "@/components/safetyactions";
import SafetyHeatmap from "@/components/safetyheatmap";
import SafetyKPI from "@/components/safetykpi";
import SafetyNewsletter from "@/components/safetynewsletter";

export default function SafetyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Right Side */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header CHANGES BASED ON TAB */}
        <Header
          currentPage={
            activeTab === "cases"
              ? "Safety Case List"
              : activeTab === "dashboard"
              ? "Safety safety"
              : activeTab === "drafts"
              ? "Draft Safety Report Tracking"
              : activeTab === "actions"
              ? "Actions By User"
              : activeTab === "heatmap"
              ? "Safety Heatmap-Safety"
              : activeTab === "kpi"
              ? "KPI Report Templates"
              : activeTab === "newsletter"
              ? "Safety Newsletter"
              : "Safety"
          }
        />

        {/* TABS */}
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
            onClick={() => setActiveTab("cases")}
            className={`pb-2 ${
              activeTab === "cases"
                ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Cases (12)
          </button>

          <button
            onClick={() => setActiveTab("drafts")}
            className={`pb-2 ${
              activeTab === "drafts"
                ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Drafts
          </button>

          <button
            onClick={() => setActiveTab("actions")}
            className={`pb-2 ${
              activeTab === "actions"
                ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Actions (2)
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
            onClick={() => setActiveTab("newsletter")}
            className={`pb-2 ${
              activeTab === "newsletter"
                ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Newsletter
          </button>
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-auto">
          {activeTab === "dashboard" && <SafetyDashboard />}
          {activeTab === "cases" && <SafetyCase12 />}
          {activeTab === "drafts" && <SafetyDrafts />}
          {activeTab === "actions" && <SafetyActions />}
          {activeTab === "heatmap" && <SafetyHeatmap />}
          {activeTab === "kpi" && <SafetyKPI />}
          {activeTab === "newsletter" && <SafetyNewsletter />}
        </main>
      </div>
    </div>
  );
}
