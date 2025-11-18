'use client'

import { Search } from 'lucide-react'

export default function WorkflowsTasksTable() {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4">
      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <button className="px-4 py-2 border border-medium-gray rounded-lg text-gray-700 text-sm hover:bg-light-gray transition-colors">
          Due date: All time
        </button>
        <button className="px-4 py-2 border border-medium-gray rounded-lg text-gray-700 text-sm hover:bg-light-gray transition-colors">
          Status: All
        </button>
        <button className="px-4 py-2 border border-medium-gray rounded-lg text-gray-700 text-sm hover:bg-light-gray transition-colors">
          Task: All
        </button>
        <button className="px-4 py-2 border border-medium-gray rounded-lg text-gray-700 text-sm hover:bg-light-gray transition-colors">
          Type: All
        </button>
        <button className="px-4 py-2 border border-medium-gray rounded-lg text-gray-700 text-sm hover:bg-light-gray transition-colors">
          Assigned to: All
        </button>
        
        <div className="flex-1 flex items-center gap-2 px-4 py-2 border border-medium-gray rounded-lg">
          <input
            type="text"
            placeholder="Search tasks..."
            className="flex-1 outline-none text-sm text-gray-700"
          />
          <Search className="w-4 h-4 text-text-light" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-medium-gray rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-medium-gray bg-light-gray">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Task</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Due date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Assigned to</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-medium-gray hover:bg-light-bg transition-colors">
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500 text-sm">
                No workflow tasks found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
