<<<<<<< HEAD
"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Search, ChevronDown } from "lucide-react";

export default function MyAuditsPage() {
  const [sidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  const audits = [
    {
      id: "AUD-001",
      title: "Runway Safety Audit",
      category: "Safety",
      status: "Open",
      severity: "High",
      lead: "John Smith",
      dueDate: "2025-01-10",
    },
    {
      id: "AUD-002",
      title: "Equipment Readiness Audit",
      category: "Operations",
      status: "In Progress",
      severity: "Medium",
      lead: "Aisha Khan",
      dueDate: "2025-01-22",
    },
  ];

  const filtered = audits.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="My Audits" />

        <main className="flex-1 p-6 overflow-auto">
          {/* Title + Actions */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">My Audits</h1>

            <div className="flex items-center gap-3">
              <button className="px-3 py-2 border rounded-lg bg-white flex items-center gap-2 text-sm">
                Filter <ChevronDown size={16} />
              </button>

              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search audits…"
                  className="pl-10 pr-3 py-2 border rounded-lg w-64 text-sm bg-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Audits Table */}
          <div className="bg-white border rounded-xl shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Severity</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Audit Lead</th>
                  <th className="p-4">Due Date</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{a.id}</td>
                    <td className="p-4 font-medium">{a.title}</td>
                    <td className="p-4">{a.category}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-lg ${
                          a.severity === "High"
                            ? "bg-red-100 text-red-600"
                            : a.severity === "Medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {a.severity}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-lg ${
                          a.status === "Open"
                            ? "bg-red-50 text-red-700"
                            : a.status === "In Progress"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="p-4">{a.lead}</td>
                    <td className="p-4">{a.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
=======
export default function AuditCard() {
  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-dark)' }}>Audit - Internal Compliance Monitoring (27)</h3>
        <a href="#" className="text-sm font-medium" style={{ color: 'var(--primary-blue)' }}>View checklists and schedules</a>
      </div>
      
      <div className="flex gap-8">
        {/* Donut Chart */}
        <div className="flex-1 flex items-center justify-center">
          <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
            {/* Green segment (Ok: 10/27 = 37%) */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="var(--accent-green)"
              strokeWidth="30"
              strokeDasharray={`${(10/27) * 440} 440`}
            />
            {/* Red segment (Overdue: 17/27 = 63%) */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="var(--accent-red)"
              strokeWidth="30"
              strokeDasharray={`${(17/27) * 440} 440`}
              strokeDashoffset={-((10/27) * 440)}
            />
            <circle cx="100" cy="100" r="50" fill="white" />
            <text x="100" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="var(--text-dark)">27</text>
            <text x="100" y="115" textAnchor="middle" fontSize="12" fill="var(--text-light)">scheduled</text>
          </svg>
        </div>
        
        {/* Legend and Findings */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent-green)' }}></div>
              <span className="text-sm" style={{ color: 'var(--text-dark)' }}>Ok (10)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent-red)' }}></div>
              <span className="text-sm" style={{ color: 'var(--text-dark)' }}>Overdue (17)</span>
            </div>
          </div>
          
          <div className="pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>Findings (3)</h4>
            <div className="h-2 bg-gray-200 rounded overflow-hidden flex mb-2">
              <div className="w-2/3 progress-red"></div>
              <div className="w-1/3" style={{ backgroundColor: '#ff8c00' }}></div>
            </div>
            <a href="#" className="text-sm font-medium" style={{ color: 'var(--primary-blue)' }}>View findings</a>
          </div>
          
          <div className="pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
            <h4 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Actions (12)</h4>
          </div>
        </div>
      </div>
    </div>
  )
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
}
