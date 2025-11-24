"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Send } from "lucide-react";

export default function HealthDraftsPage() {
  const [sidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <Header currentPage="Draft Health, Safety and Environment Report Tracking" />

        {/* Tabs */}
        <div className="px-6 bg-white border-b flex gap-6 text-sm h-12 items-end">
          <button className="text-gray-600">Dashboard</button>
          <button className="text-gray-600">Cases</button>
          <button className="text-blue-600 border-b-2 border-blue-600 pb-1">
            Drafts
          </button>
          <button className="text-gray-600">Heatmap</button>
          <button className="text-gray-600">KPIs</button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          
          {/* Send Reminder Row */}
          <div className="flex items-center gap-4">
            <button className="border px-4 py-2 rounded-md text-sm text-blue-600 flex items-center gap-2">
              <Send size={16} />
              Send Reminder To All
            </button>

            <span className="text-gray-500 text-sm">0 reminder(s) sent</span>
          </div>

          {/* Empty white content area */}
          <div className="mt-10 h-full w-full bg-white border rounded-md"></div>
        </main>
      </div>
    </div>
  );
}
