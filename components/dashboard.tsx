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

  return (
    <div className="flex gap-6 p-8">
      {/* Main Content */}
      <div className="flex-1">
        <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'module-summary' ? (
          <ModuleSummary />
        ) : (
          <>
            <TaskStats activeTab={activeTab} />
            <TaskCards activeTab={activeTab} />

            {/* Pass submit handler */}
            <TaskFilters onSubmit={handleSubmit} />

            <TaskTable activeTab={activeTab} />
          </>
        )}
      </div>

      {/* Right Sidebar */}
      <TaskActions onSubmit={handleSubmit} />
    </div>
  )
}
