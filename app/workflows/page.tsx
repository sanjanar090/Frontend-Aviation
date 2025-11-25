"use client";

import { useState } from "react";
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { WorkflowSidebar } from "@/components/WorkflowSidebar";
import { WorkflowHeader } from "@/components/WorkflowHeader";
import WorkflowTabsPage from "@/components/WorkflowTabsPage";

export default function WorkflowsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="Workflows" />

        {/* FIX: Remove extra h-screen and wrap properly */}
        <div className="flex flex-1 overflow-hidden">

          {/* Workflow section sidebar (should be directly inside this content area) */}

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* <WorkflowHeader /> */}
            <WorkflowTabsPage />

            <main className="flex-1 overflow-auto">
              {/* Dashboard inside WorkflowTabsPage */}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
