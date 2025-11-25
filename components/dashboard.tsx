"use client";

import { useState } from "react";
import TaskTabs from "./task-tabs";
import TaskStats from "./task-stats";
import TaskCards from "./task-cards";      // ✅ separate component – correct
import TaskFilters from "./task-filters";
import TaskTable from "./task-table";
import TaskActions from "./task-actions";
import ModuleSummary from "./module-summary";
import ModuleDashboard from "./ModuleDashboard";



export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("my-tasks");

  const handleSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="flex gap-6 p-8">
      {/* Main Content */}
      <div className="flex-1">
        <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "module-summary" ? (
          <ModuleSummary />
        ) : activeTab === "module-dashboard" ? (
          <ModuleDashboard />
        ) : (
          <>
            {/* Stats */}
            <TaskStats activeTab={activeTab} />

            {/* Cards (separate component) */}
            <TaskCards activeTab={activeTab} />

            {/* Filters */}
            <TaskFilters onSubmit={handleSubmit} />

            {/* Table */}
            <TaskTable activeTab={activeTab} />
          </>
        )}
      </div>

      {/* Right Sidebar */}
      <TaskActions onSubmit={handleSubmit} />
    </div>
  );
}
