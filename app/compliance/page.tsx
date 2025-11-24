"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import ComplianceDashboard from "@/components/compliance-dashboard";
import ComplianceAuditCard from "@/components/compliance-audit-card";

export default function CompliancePage() {
  const [sidebarOpen] = useState(true);
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onSelect={setActive} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="Compliance" />

        <main className="flex-1 p-6 overflow-auto">

          {/* Dashboard UI */}
          {active === "dashboard" && <ComplianceDashboard />}

          {/* My Audits UI */}
          {active === "audits" && <ComplianceAuditCard />}

        </main>
      </div>
    </div>
  );
}
