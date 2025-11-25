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
}
