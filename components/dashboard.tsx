<<<<<<< HEAD
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
=======
'use client'

import { useState } from 'react'
import TaskTabs from './task-tabs'
import TaskStats from './task-stats'
import TaskCards from './task-cards'
import TaskFilters from './task-filters'
import TaskTable from './task-table'
import TaskActions from './task-actions'
import ModuleSummary from './module-summary'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('my-tasks')

  // ✅ Submit Handler Added
  const handleSubmit = (data) => {
    console.log("Form Submitted:", data)
    // 👉 Add API calls, DB updates, filtering, task actions here
  }
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5

  return (
    <div className="flex gap-6 p-8">
      {/* Main Content */}
      <div className="flex-1">
        <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} />

<<<<<<< HEAD
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
=======
        {activeTab === 'module-summary' ? (
          <ModuleSummary />
        ) : (
          <>
            <TaskStats activeTab={activeTab} />
            <TaskCards activeTab={activeTab} />

            {/* Pass submit handler */}
            <TaskFilters onSubmit={handleSubmit} />

>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
            <TaskTable activeTab={activeTab} />
          </>
        )}
      </div>

      {/* Right Sidebar */}
      <TaskActions onSubmit={handleSubmit} />
    </div>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
}
