<<<<<<< HEAD
"use client";

import { ChevronRight } from "lucide-react";

interface TableRow {
  module: string;
  task: string;
  title: string;
  dueDate?: string;
  assignedTo?: string;
}

interface TaskTableProps {
  activeTab: string; // "my-tasks" | "assigned" | "module-summary"
}

export default function TaskTable({ activeTab }: TaskTableProps) {
  // -------------------------
  // 📌 TOP CARDS (Image 1 UI)
  // -------------------------
  const TopCards = () => {
    if (activeTab !== "my-tasks") return null;

    return (
      <div className="grid grid-cols-4 gap-4 mb-6">

        {/* Workflows card */}
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-3">Workflows tasks</h3>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Complete step</span>
            <div className="w-40 h-3 bg-gray-200 rounded">
              <div className="h-3 bg-green-600 rounded" style={{ width: "55%" }} />
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Complete action</span>
            <div className="w-40 h-3 bg-gray-200 rounded">
              <div className="h-3 bg-red-600 rounded" style={{ width: "20%" }} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Close action</span>
            <div className="w-40 h-3 bg-gray-200 rounded">
              <div className="h-3 bg-green-600 rounded" style={{ width: "35%" }} />
            </div>
          </div>
        </div>

        {/* Compliance card */}
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-3">Compliance tasks</h3>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Chase action</span>
            <div className="w-40 h-3 bg-gray-200 rounded">
              <div className="h-3 bg-red-600 rounded" style={{ width: "22%" }} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Complete audit</span>
            <div className="w-40 h-3 bg-gray-200 rounded">
              <div className="h-3 bg-green-600 rounded" style={{ width: "60%" }} />
            </div>
          </div>
        </div>

        {/* Risk card */}
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-3">Risk tasks</h3>

          <div className="flex items-center justify-between">
            <span className="text-sm">Complete assessment</span>
            <div className="w-40 h-3 bg-gray-200 rounded">
              <div className="h-3 bg-green-600 rounded" style={{ width: "30%" }} />
            </div>
          </div>
        </div>

        {/* Safety card */}
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="font-semibold mb-3">Safety tasks</h3>

          <div className="flex items-center justify-between">
            <span className="text-sm">Assess report</span>
            <div className="w-40 h-3 bg-gray-200 rounded">
              <div className="h-3 bg-green-600 rounded" style={{ width: "25%" }} />
            </div>
          </div>
        </div>

      </div>
    );
  };

  // ---------------------------
  // 📌 TABLE ROWS (Image 2 UI)
  // ---------------------------
  const getRows = (): TableRow[] => {
    if (activeTab === "module-summary") return [];

    if (activeTab === "assigned") {
      return [
        {
          module: "Workflows - Workflows",
          task: "Assigned action",
          title: "WKF-000049 - Workflow 01 Action",
          dueDate: "11/11/2025",
          assignedTo: "Matko Dadic",
        },
        {
          module: "Compliance - Audit - Internal Compliance Monitoring",
          task: "Assigned action",
          title:
            "CMS-000073 - Document information regarding route cause analysis & provide info",
          dueDate: "20/11/2025",
          assignedTo: "Florent Dufour",
        },
        {
          module: "Compliance - Audit - Internal Compliance Monitoring",
          task: "Assigned action",
          title:
            "CMS-000074 - Document information regarding root cause analysis and provide info",
          dueDate: "28/11/2025",
          assignedTo: "Kristijan Madjanovic",
        },
      ];
    }

    // Default → MY TASKS TABLE
    return [
      {
        module: "Workflows - Workflows",
        task: "Complete step",
        title:
          "Air Senegal support in DSS airport for 9H-SZN - Final Management review and approval...",
        assignedTo: "Matko Dadic",
      },
      {
        module: "Workflows - Workflows",
        task: "Complete step",
        title:
          "test3 - Final Management review and approval...",
        assignedTo: "Matko Dadic",
      },
      {
        module: "Workflows - Workflows",
        task: "Complete action",
        title: "WKF-000043 - Update email signature",
        dueDate: "19/08/2024",
        assignedTo: "Matko Dadic",
      },
      {
        module: "Workflows - Workflows",
        task: "Complete step",
        title: "Complete 2 steps for Change of Competent Authority",
        dueDate: "30/08/2024",
        assignedTo: "Matko Dadic",
      },
      {
        module: "Workflows - Workflows",
        task: "Complete step",
        title: "contract between DALE and XXX ...",
        dueDate: "15/09/2025",
        assignedTo: "Matko Dadic",
      },
      {
        module: "Workflows - Workflows",
        task: "Close action",
        title: "WKF-000049 - Workflow 01 Action",
        dueDate: "11/11/2025",
        assignedTo: "Matko Dadic",
      },
      {
        module: "Compliance - Audit - Internal Compliance Monitoring",
        task: "Complete audit",
        title: "2024-18 - Certification of Maintenance Nov 2025 I",
        dueDate: "31/12/2025",
        assignedTo: "Internal Auditor",
      },
      {
        module: "Compliance - Audit - Internal Compliance Monitoring",
        task: "Complete audit",
        title: "CM-2022-022 - Certification of Maintenance - JULY 2022",
        dueDate: "31/12/2025",
        assignedTo: "Internal Auditor",
      },
      {
        module: "Risk - Risk",
        task: "Complete assessment",
        title: "Aircraft services",
        dueDate: "16/01/2026",
        assignedTo: "Risk Manager",
      },
      {
        module: "Compliance - Out of Base Management Audits",
        task: "Complete audit",
        title: "MO-2025-001 - Test Regulator Audit - Nov 2025",
        dueDate: "30/11/2026",
        assignedTo: "Compliance Team",
      },
      {
        module: "Compliance - Audit - Internal Compliance Monitoring",
        task: "Complete audit",
        title:
          "CMS-000073 - Document information regarding route cause analysis & provide info",
        dueDate: "20/11/2025",
        assignedTo: "Audit Support",
      },
    ];
  };

  const rows = getRows();

  if (activeTab === "module-summary") return null;

  // -------------------------------
  // 📌 DATE COLOR BADGES
  // -------------------------------
  const getDateColor = (date: string) => {
    if (date === "11/11/2025")
      return { bg: "#e8f5e9", border: "#4caf50", text: "#2e7d32" };
    if (date === "20/11/2025")
      return { bg: "#fffde7", border: "#fbc02d", text: "#f57f17" };
    if (date === "28/11/2025")
      return { bg: "#ffe0b2", border: "#ff9800", text: "#e65100" };
    return { bg: "#ffe6e6", border: "#cc3333", text: "#cc3333" };
  };

  return (
    <div>
      {/* 🔥 TOP CARDS SECTION (only for My Tasks) */}
      <TopCards />

      {/* 🔥 TASK TABLE */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          borderColor: "var(--border-light)",
          backgroundColor: "white",
        }}
      >
        <table className="w-full">
          <thead
            className="border-b"
            style={{
              backgroundColor: "var(--light-gray)",
              borderBottomColor: "var(--border-light)",
            }}
          >
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Module</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Task</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Due date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Assigned to
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, idx) => {
              const dateColor = row.dueDate && getDateColor(row.dueDate);

              return (
                <tr
                  key={idx}
                  className="border-b"
                  style={{ borderBottomColor: "var(--border-light)" }}
                >
                  <td className="px-6 py-4 text-sm">{row.module}</td>
                  <td className="px-6 py-4 text-sm">{row.task}</td>
                  <td className="px-6 py-4 text-sm">{row.title}</td>

                  <td className="px-6 py-4 text-sm">
                    {row.dueDate && (
                      <span
                        className="border px-2 py-1 rounded text-sm font-medium"
                        style={{
                          borderColor: dateColor?.border,
                          color: dateColor?.text,
                          backgroundColor: dateColor?.bg,
                        }}
                      >
                        {row.dueDate}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: "var(--primary-blue)" }}
                      ></div>
                      <span>{row.assignedTo}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="p-1 rounded">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* BOTTOM PAGINATION UI */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm">Showing 1–10 of 12</p>
        <button className="px-4 py-1 border rounded text-blue-600">
          Show more
        </button>
        <button className="px-4 py-1 border rounded text-blue-600">
          Download
        </button>
      </div>
    </div>
  );
=======
import { ChevronRight } from 'lucide-react'

interface TableRow {
  module: string
  task: string
  title: string
  dueDate?: string
  assignedTo: string
}

interface TaskTableProps {
  activeTab: string
}

export default function TaskTable({ activeTab }: TaskTableProps) {
  const getRows = (): TableRow[] => {
    if (activeTab === 'module-summary') {
      return []
    }
    if (activeTab === 'assigned') {
      return [
        {
          module: 'Workflows - Workflows',
          task: 'Assigned action',
          title: 'WKF-000049 - Workflow 01 Action',
          dueDate: '11/11/2025',
          assignedTo: 'Matko Dadic',
        },
        {
          module: 'Compliance - Audit - Internal Compliance Monitoring',
          task: 'Assigned action',
          title: 'CMS-000073 - Document information regarding route cause analysis & provide info',
          dueDate: '20/11/2025',
          assignedTo: 'Florent Dufour',
        },
        {
          module: 'Compliance - Audit - Internal Compliance Monitoring',
          task: 'Assigned action',
          title: 'CMS-000074 - Document information regarding root cause analysis and provide info to Authority',
          dueDate: '28/11/2025',
          assignedTo: 'Kristijan Madjanovic',
        },
      ]
    }

    return [
      {
        module: 'Workflows - Workflows',
        task: 'Complete step',
        title: 'Air Senegal support in DSS airport for 9H-SZN - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval',
        assignedTo: 'Matko Dadic',
      },
      {
        module: 'Workflows - Workflows',
        task: 'Complete step',
        title: 'test3 - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval',
        assignedTo: 'Matko Dadic',
      },
      {
        module: 'Workflows - Workflows',
        task: 'Complete action',
        title: 'WKF-000043 - Update email signature with new approval number',
        dueDate: '19/08/2024',
        assignedTo: 'Matko Dadic',
      },
    ]
  }

  const rows = getRows()

  if (rows.length === 0) return null

  const getDateColor = (date: string) => {
    if (date === '11/11/2025') return { bg: '#e8f5e9', border: '#4caf50', text: '#2e7d32' }
    if (date === '20/11/2025') return { bg: '#fffde7', border: '#fbc02d', text: '#f57f17' }
    if (date === '28/11/2025') return { bg: '#ffe0b2', border: '#ff9800', text: '#e65100' }
    return { bg: '#ffe6e6', border: '#cc3333', text: '#cc3333' }
  }

  return (
    <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border-light)', backgroundColor: 'white' }}>
      <table className="w-full">
        <thead style={{ backgroundColor: 'var(--light-gray)', borderBottomColor: 'var(--border-light)' }} className="border-b">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Module</th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Task</th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Title</th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Due date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Assigned to</th>
            <th className="px-6 py-4 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const dateColor = row.dueDate ? getDateColor(row.dueDate) : null
            return (
              <tr key={idx} className="border-b transition-colors" style={{ borderBottomColor: 'var(--border-light)' }}>
                <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-light)' }}>{row.module}</td>
                <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-light)' }}>{row.task}</td>
                <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-dark)' }}>{row.title}</td>
                <td className="px-6 py-4 text-sm">
                  {row.dueDate && dateColor && (
                    <span 
                      className="border px-2 py-1 rounded text-sm font-medium" 
                      style={{ borderColor: dateColor.border, color: dateColor.text, backgroundColor: dateColor.bg }}
                    >
                      {row.dueDate}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: 'var(--primary-blue)' }}></div>
                    <span className="text-sm" style={{ color: 'var(--text-dark)' }}>{row.assignedTo}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 rounded transition-colors" style={{ color: 'var(--text-light)' }}>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
}
