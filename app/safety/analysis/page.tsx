"use client";

import { useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import SafetyDashboardAnalysis from "@/components/safetyanalysisdashboard";

export default function SafetyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-50">

      {/* LEFT SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} />

      {/* RIGHT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOP HEADER */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-auto bg-[#eef3f8]">
          <SafetyDashboardAnalysis
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

      </div>
    </div>
  );
}
