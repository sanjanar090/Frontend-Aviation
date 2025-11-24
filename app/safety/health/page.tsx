"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import HSEDashboard from "@/components/hse-dashboard";
import HealthHeatmap from "@/components/healthheatmap";
import HealthKPI from "@/components/healthkpi";
import { Send } from "lucide-react";

export default function HealthPage() {
  const [sidebarOpen] = useState(true);

  // active tab state
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <Header currentPage="Safety - Health, Safety and Environment" />

        <main className="flex-1 overflow-auto">

          {/* Tabs */}
          <div className="px-6 py-4 border-b bg-white">
            <div className="flex gap-6 mt-4 text-sm">

              <button
                onClick={() => setActiveTab("dashboard")}
                className={
                  activeTab === "dashboard"
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600"
                }
              >
                Dashboard
              </button>

              <button
                onClick={() => setActiveTab("cases")}
                className={
                  activeTab === "cases"
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600"
                }
              >
                Cases
              </button>

              <button
                onClick={() => setActiveTab("drafts")}
                className={
                  activeTab === "drafts"
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600"
                }
              >
                Drafts
              </button>

              <button
                onClick={() => setActiveTab("heatmap")}
                className={
                  activeTab === "heatmap"
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600"
                }
              >
                Heatmap
              </button>

              <button
                onClick={() => setActiveTab("kpi")}
                className={
                  activeTab === "kpi"
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600"
                }
              >
                KPIs
              </button>

            </div>
          </div>

          {/* ---------------- Dashboard ---------------- */}
          {activeTab === "dashboard" && (
            <div className="p-6">
              <HSEDashboard />
            </div>
          )}

          {/* ---------------- Cases ---------------- */}
          {activeTab === "cases" && (
            <div className="px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <select className="border rounded-md px-3 py-1 text-sm">
                    <option>Cases</option>
                  </select>

                  <span className="text-sm text-gray-600">
                    Showing all open cases
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md">
                    + New health, safety and environment report
                  </button>

                  <button className="border px-4 py-2 rounded-md text-sm text-gray-700">
                    Show filters
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center mt-20">
                <img
                  src="/images/empty-cases.png"
                  className="w-32 mb-4"
                  alt="No Cases"
                />

                <p className="text-gray-700 text-sm mt-2">
                  There are no cases to display
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  Try adjusting your filters or searching with another term
                </p>

                <div className="flex gap-4 mt-6">
                  <button className="bg-blue-600 text-white px-5 py-2 text-sm rounded-md">
                    Show filters
                  </button>

                  <button className="border border-red-400 text-red-500 px-5 py-2 text-sm rounded-md">
                    Clear all filters
                  </button>
                </div>

                <button className="mt-8 border border-blue-500 text-blue-600 text-sm px-5 py-2 rounded-md flex items-center gap-2">
                  View Closed Cases
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ---------------- Drafts ---------------- */}
          {activeTab === "drafts" && (
            <div className="p-6">
              <div className="flex items-center gap-4">
                <button className="border px-4 py-2 rounded-md text-sm text-blue-600 flex items-center gap-2">
                  <Send size={16} />
                  Send Reminder To All
                </button>

                <span className="text-gray-500 text-sm">0 reminder(s) sent</span>
              </div>

              <div className="mt-10 h-full w-full bg-white border rounded-md"></div>
            </div>
          )}

          {/* ---------------- Heatmap ---------------- */}
          {activeTab === "heatmap" && (
            <div className="p-6">
              <HealthHeatmap />
            </div>
          )}

          {/* ---------------- KPI ---------------- */}
          {activeTab === "kpi" && (
            <div className="p-6">
              <HealthKPI />
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
