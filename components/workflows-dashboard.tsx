<<<<<<< HEAD
'use client'

import { useState } from 'react'
import WorkflowsTabs from '@/components/workflows-tabs'
import WorkflowsContent from '@/components/workflows-content'

export default function WorkflowsDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="p-6 bg-light-bg min-h-screen">
      <WorkflowsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="mt-6">
        {activeTab === 'dashboard' && <WorkflowsContent />}
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'

/* ============================================
   SAMPLE TASK DATA (you can replace with API)
============================================= */
const sampleTasks = [
  {
    id: 1,
    module: "Workflows",
    task: "Complete step",
    title: "Air Senegal support in DSS airport – Final approval",
    dueDate: "2024-08-19",
    assignedTo: "Matko Dadic"
  },
  {
    id: 2,
    module: "Workflows",
    task: "Complete step",
    title: "test3 – Final approval",
    dueDate: "2025-02-10",
    assignedTo: "Matko Dadic"
  },
  {
    id: 3,
    module: "Workflows",
    task: "Complete action",
    title: "WKF-000043 – Update email signature",
    dueDate: "2024-08-19",
    assignedTo: "Matko Dadic"
  }
]

/* ============================================
   FILTERS COMPONENT
============================================= */
function TaskFilters({ onSubmit }) {
  const [dueDate, setDueDate] = useState("all")
  const [status, setStatus] = useState("all")
  const [taskType, setTaskType] = useState("all")
  const [module, setModule] = useState("all")
  const [assignedTo, setAssignedTo] = useState("all")

  const handleClick = () => {
    onSubmit({
      dueDate,
      status,
      taskType,
      module,
      assignedTo,
    })
  }

  return (
    <div className="mb-4 flex gap-3 flex-wrap">
      <select value={dueDate} onChange={(e) => setDueDate(e.target.value)}>
        <option value="all">Due date: All time</option>
        <option value="today">Due today</option>
        <option value="week">Due this week</option>
        <option value="overdue">Overdue</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="all">Status: All</option>
        <option value="open">Open</option>
        <option value="completed">Completed</option>
      </select>

      <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
        <option value="all">Task: All</option>
        <option value="step">Complete step</option>
        <option value="action">Complete action</option>
      </select>

      <select value={module} onChange={(e) => setModule(e.target.value)}>
        <option value="all">Module: All</option>
        <option value="Workflows">Workflows</option>
        <option value="Compliance">Compliance</option>
        <option value="Safety">Safety</option>
      </select>

      <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
        <option value="all">Assigned to: All</option>
        <option value="Matko Dadic">Matko Dadic</option>
      </select>

      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  )
}

/* ============================================
   DATE FILTER LOGIC
============================================= */

function isWithinThisWeek(dateString) {
  const today = new Date()
  const date = new Date(dateString)
  const weekStart = new Date(today)
  weekStart.setDate(today.getDate() - today.getDay())
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 7)

  return date >= weekStart && date <= weekEnd
}

function isToday(dateString) {
  const today = new Date()
  const date = new Date(dateString)
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

function isOverdue(dateString) {
  const today = new Date()
  const date = new Date(dateString)
  return date < today
}

/* ============================================
   TASK TABLE
============================================= */
function TaskTable({ filters }) {
  const filtered = sampleTasks.filter((task) => {
    // Due Date filter
    if (filters.dueDate === "today" && !isToday(task.dueDate)) return false
    if (filters.dueDate === "week" && !isWithinThisWeek(task.dueDate)) return false
    if (filters.dueDate === "overdue" && !isOverdue(task.dueDate)) return false

    // Task type
    if (filters.taskType !== "all" && task.task.toLowerCase().includes(filters.taskType) === false)
      return false

    // Module
    if (filters.module !== "all" && task.module !== filters.module) return false

    // Assigned to
    if (filters.assignedTo !== "all" && task.assignedTo !== filters.assignedTo)
      return false

    return true
  })

  return (
    <table className="w-full mt-4 border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Module</th>
          <th className="p-2 text-left">Task</th>
          <th className="p-2 text-left">Title</th>
          <th className="p-2 text-left">Due date</th>
          <th className="p-2 text-left">Assigned to</th>
        </tr>
      </thead>

      <tbody>
        {filtered.map((t) => (
          <tr key={t.id} className="border-b">
            <td className="p-2">{t.module}</td>
            <td className="p-2">{t.task}</td>
            <td className="p-2">{t.title}</td>
            <td className="p-2">
              {t.dueDate}
            </td>
            <td className="p-2">{t.assignedTo}</td>
          </tr>
        ))}

        {filtered.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center p-4 text-gray-500">
              No tasks match your filters
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

/* ============================================
   DASHBOARD (MAIN)
============================================= */
export default function Dashboard() {
  const [filters, setFilters] = useState({})

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <TaskFilters onSubmit={setFilters} />
      <TaskTable filters={filters} />
    </div>
  )
=======
import React from "react";

export function WorkflowsDashboard() {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
        
        <nav className="flex-1 p-2 space-y-2 text-sm">
          <div className="p-2 hover:bg-[#12385f] rounded">Dashboard</div>
          <div className="p-2 hover:bg-[#12385f] rounded">Safety</div>
          <div className="p-2 hover:bg-[#12385f] rounded">Compliance</div>
          <div className="p-2 hover:bg-[#12385f] rounded bg-[#12385f]">Workflows</div>
          <div className="p-2 hover:bg-[#12385f] rounded">Risk</div>
          <div className="p-2 hover:bg-[#12385f] rounded">Devices</div>
          <div className="p-2 hover:bg-[#12385f] rounded">Config</div>
          <div className="p-2 hover:bg-[#12385f] rounded">Contacts</div>
        </nav>
        <div className="p-2 border-t border-gray-700">Support</div>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
          <div className="font-semibold">Workflows</div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span>Matko Dadic</span>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Dashboard cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-4">All actions (20)</h2>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 rounded-full border-8 border-red-400 flex items-center justify-center text-xl font-bold text-gray-700">
                  20
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full"></span>Completed (2)</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-full"></span>Overdue (18)</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow flex items-center justify-center text-gray-500">
              No outstanding workflows
            </div>
          </div>

          {/* Table */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between mb-4">
              <div className="flex gap-3 text-sm">
                <select className="border p-1 rounded"> <option>Due date: All time</option> </select>
                <select className="border p-1 rounded"> <option>Status: All</option> </select>
                <select className="border p-1 rounded"> <option>Task: All</option> </select>
                <select className="border p-1 rounded"> <option>Type: All</option> </select>
                <select className="border p-1 rounded"> <option>Assigned to: All</option> </select>
              </div>
              <input placeholder="Search tasks..." className="border p-1 rounded text-sm" />
            </div>

            <table className="w-
            full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Task</th>
                  <th>Title</th>
                  <th>Due date</th>
                  <th>Assigned to</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4,5,6].map((i)=> (
                  <tr key={i} className="border-b">
                    <td className="py-2">Complete step</td>
                    <td>Example workflow title {i}</td>
                    <td>
                      <span className="px-2 py-1 bg-red-200 text-red-700 rounded">19/08/2024</span>
                    </td>
                    <td>Matko Dadic</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
}
