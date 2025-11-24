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
}
