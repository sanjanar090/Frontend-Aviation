"use client"

import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"

export function TasksAssigned() {
  const [filters, setFilters] = useState({
    dueDate: "All time",
    status: "All",
    task: "All",
    type: "All",
    module: "All",
    assigned: "All",
  })
  "use client";



  const [activeTab, setActiveTab] = useState("assigned");

  return (
    <div className="flex space-x-4 border-b pb-2">
      <button
        onClick={() => setActiveTab("assigned")}
        className={activeTab === "assigned" ? "text-blue-600 font-semibold" : ""}
      >
        Tasks Assigned
      </button>

      <button
        onClick={() => setActiveTab("created")}
        className={activeTab === "created" ? "text-blue-600 font-semibold" : ""}
      >
        Tasks Created
      </button>

      <button
        onClick={() => setActiveTab("due")}
        className={activeTab === "due" ? "text-blue-600 font-semibold" : ""}
      >
        Tasks Due
      </button>
    </div>
  );
}


  const tasks = [
    {
      module: "Workflows - Workflows",
      task: "Complete step",
      title:
        "Air Senegal support in DSS airport for SH-SZN - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval",
      dueDate: "10/08/2024",
      assigned: "Marko Dadic",
    },
    {
      module: "Workflows - Workflows",
      task: "Complete step",
      title:
        "test3 - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval",
      dueDate: null,
      assigned: "Marko Dadic",
    },
    {
      module: "Workflows - Workflows",
      task: "Complete action",
      title: "WKF-00043 - Update email signature with new approval number",
      dueDate: "30/08/2024",
      assigned: "Marko Dadic",
    },
    {
      module: "Workflows - Workflows",
      task: "Complete step",
      title: "Complete 2 steps for Change of Competent Authority [EASA foreign country to FR OSAC]",
      dueDate: "15/09/2025",
      assigned: "Marko Dadic",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header with Title and Add Action */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tasks I have assigned to others</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
          + Add Action
        </button>
      </div>

      {/* Filters Row 1 */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-50">
          <span className="text-sm text-gray-700">📅 Due date:</span>
          <span className="text-sm text-gray-900">{filters.dueDate}</span>
          <ChevronDown size={16} className="text-gray-600" />
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-50">
          <span className="text-sm text-gray-700">⭕ Status:</span>
          <span className="text-sm text-gray-900">{filters.status}</span>
          <ChevronDown size={16} className="text-gray-600" />
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-50">
          <span className="text-sm text-gray-700">☑️ Task:</span>
          <span className="text-sm text-gray-900">{filters.task}</span>
          <ChevronDown size={16} className="text-gray-600" />
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-50">
          <span className="text-sm text-gray-700">🏷️ Type:</span>
          <span className="text-sm text-gray-900">{filters.type}</span>
          <ChevronDown size={16} className="text-gray-600" />
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-50">
          <span className="text-sm text-gray-700">📦 Module:</span>
          <span className="text-sm text-gray-900">{filters.module}</span>
          <ChevronDown size={16} className="text-gray-600" />
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-50">
          <span className="text-sm text-gray-700">👤 Assigned to:</span>
          <span className="text-sm text-gray-900">{filters.assigned}</span>
          <ChevronDown size={16} className="text-gray-600" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Module</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Due date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Assigned to
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{task.module}</td>
                <td className="px-6 py-4 text-sm text-blue-600 cursor-pointer hover:underline">{task.task}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{task.title}</td>
                <td className="px-6 py-4 text-sm">
                  {task.dueDate ? (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                      {task.dueDate}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{task.assigned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing 1 - 3 of 3</p>
        <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded text-sm font-medium hover:bg-blue-50">
          ⬇️ Download
        </button>
      </div>
    </div>
  )
}
