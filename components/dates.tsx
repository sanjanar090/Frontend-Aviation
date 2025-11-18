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
