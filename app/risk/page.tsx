"use client";

import { useState } from "react";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

import { RiskHeader } from "@/components/RiskHeader";
import { RiskTabs } from "@/components/RiskTabs";
import { RiskDashboard } from "@/components/RiskDashboard";
import { RiskTasksTable } from "@/components/RiskTasksTable";
import { RiskAssessmentsView } from "@/components/RiskAssessmentsView";
import { AssessmentsView } from "@/components/AssessmentsView";
import { DraftsView } from "@/components/DraftsView";
import { ActionsView } from "@/components/ActionsView";
import { HeatmapView } from "@/components/heatmap-view";

import RiskMatrix from "@/components/RiskMatrix";
import ResidualRiskChart from "@/components/ResidualRiskChart";
import TemplatesTable from "@/components/Templatestable";

export default function Risk() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const currentRiskData = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [2, 11, 6, 3, 0],
    [0, 5, 2, 0, 0],
    [0, 1, 0, 0, 0],
  ];

  const plannedRiskData = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [2, 6, 3, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="Risk" />

        <RiskTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 overflow-auto pt-1 px-6 pb-6 space-y-4">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <>
              <RiskDashboard />

              {/* ▼ YOUR IMAGE SECTION UNDER RISK DASHBOARD */}
              <div className="mt-6">
                <RiskTasksTable />
              </div>
            </>
          )}

          {activeTab === "my-assessments" && <RiskAssessmentsView />}
          {activeTab === "assessments" && <AssessmentsView />}
          {activeTab === "drafts" && <DraftsView />}
          {activeTab === "actions" && <ActionsView />}
          {activeTab === "heatmap" && <HeatmapView />}

          {activeTab === "risk-matrix" && (
            <div className="max-w-7xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Risk Matrix
                </h2>
                <p className="text-slate-600">
                  Each square in the matrix shows the number of Hazards which
                  fall into the relevant Severity/Likelihood category
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RiskMatrix
                  title="Current Risk"
                  count={30}
                  data={currentRiskData}
                  totalScore={701}
                  scoreColors={{ primary: "#f59e0b", secondary: "#10b981" }}
                />

                <RiskMatrix
                  title="Planned Risk"
                  count={13}
                  data={plannedRiskData}
                  totalScore={198}
                  scoreColors={{ primary: "#ef4444", secondary: "#06b6d4" }}
                />
              </div>
            </div>
          )}

          {activeTab === "residual-risk" && (
            <div className="max-w-7xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Residual Risk
                </h2>
              </div>

              <ResidualRiskChart />
            </div>
          )}

          {activeTab === "templates" && (
            <div className="max-w-7xl mx-auto space-y-8">
              <div>
                
              </div>

              <TemplatesTable />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
