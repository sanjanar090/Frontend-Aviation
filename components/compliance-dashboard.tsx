"use client";

import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  User,
  ChevronRight,
  ChevronLeft,
  Download,
} from "lucide-react";


const SIDEBAR_WIDE = "w-20";
const SIDEBAR_NARROW = "w-16";
const TOP_BAR_H = 6; // px height for top yellow bar
const HEADER_H = 48; // h-12
const SUBHEADER_H = 32; // h-8
const TOTAL_FIXED = TOP_BAR_H + HEADER_H + SUBHEADER_H; // used for main padding

export default function CompliancePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [perPage] = useState(10);

  return (
    <div className="min-h-screen flex bg-[#f6f7f9] text-slate-800">

      
          
          
      {/* ----- HEADER (fixed) ----- */}
      <header className="fixed left-0 right-0 z-30" style={{ top: `${TOP_BAR_H}px` }}>
        <div className="flex items-center bg-white border-b h-12 px-4" style={{ marginLeft: sidebarOpen ? 224 : 64 }}>
          <div className="flex items-center gap-4 w-full">
            {/* Left logo/title */}
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded bg-[#0b4f62] text-white flex items-center justify-center font-bold">DA</div>
              <div className="text-sm font-semibold">Compliance</div>
            </div>

            {/* Middle tabs (thin) */}
            <div className="mx-6 flex-1">
              <div className="bg-[#f1f5f9] border rounded-sm h-8 flex items-center px-2 text-[12px] whitespace-nowrap overflow-x-auto">
                {[
                  "Dashboard",
                  "My audits",
                  "My findings",
                  "Checklists schedule",
                  "Third parties",
                  "Surveys",
                  "Findings",
                  "Actions",
                  "Heatmap",
                  "KPIs",
                ].map((t, i) => (
                  <div
                    key={i}
                    className={`px-3 py-1 mr-2 rounded text-[12px] ${i === 0 ? "bg-white text-[#0b4f62] font-semibold" : "text-gray-600"}`}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right small icons / user */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white/80 px-2 py-1 rounded text-sm shadow-sm">
                <Search size={14} />
                <span className="hidden md:inline text-xs">Search</span>
              </button>
              <Bell />
              <User />
              <div className="h-7 w-7 rounded-full bg-white border flex items-center justify-center text-[11px]">MS</div>
              <div className="text-[13px] text-gray-600">Mario Osric</div>
              <div className="text-[13px] text-gray-300">▾</div>
            </div>
          </div>
        </div>

        {/* Secondary subheader */}
        <div className="bg-[#f8fafc] border-b h-8 flex items-center px-4" style={{ marginLeft: sidebarOpen ? 224 : 64 }}>
          <div className="flex items-center gap-3 text-gray-600 text-xs">
            <div className="px-2 py-0.5 bg-white border rounded text-[12px]">Dashboard</div>
            <div className="text-[12px]">/ Dashboard</div>
          </div>
          <div className="ml-auto text-[12px] text-gray-500">Show settings</div>
        </div>
      </header>

      {/* ----- MAIN SCROLLABLE CONTENT ----- */}
      <main
        className="flex-1 overflow-auto p-4"
        style={{
          // offset top to account for fixed bars
          paddingTop: `${TOTAL_FIXED / 1}px`,
          marginLeft: sidebarOpen ? 224 : 64,
        }}
      >
        <div className="max-w-[1400px] mx-auto">

          {/* TOP GRID */}
          <div className="grid grid-cols-12 gap-3">
            <Card className="col-span-3 h-48" title="Findings (8)">
              <Bar label="Created" value={70} color="red" />
              <Bar label="Resolved" value={40} color="orange" />
            </Card>

            <Card className="col-span-3 h-48" title="Surveys (1)">
              <Bar label="Satisfaction Survey" value={92} color="red" />
            </Card>

            <Card className="col-span-3 h-48" title="Actions (5)">
              <ul className="text-[11px] text-gray-700 leading-5">
                <li>Customer Audit</li>
                <li>Audit - Internal Compliance Monitoring</li>
                <li>Audit - Competent Authorities</li>
                <li>Contracted Organisation Surveys</li>
                <li>Self-Audit</li>
              </ul>
            </Card>

            <Card className="col-span-3 h-48" title="Audit - Internal Compliance Monitoring (27)">
              <div className="flex gap-3 items-center">
                <Donut number={27} size={64} ringColor="#e74c3c" track="#f1f5f9" />
                <div className="flex-1">
                  <Legend good={20} ok={0} overdue={7} />
                  <div className="mt-2 text-[11px] text-gray-500">View checklists and schedules</div>
                </div>
              </div>
            </Card>

            {/* Row 2 */}
            <Card className="col-span-4 h-56" title="Contracted Organisation Surveys">
              <div className="flex gap-3 items-center">
                <Donut number={250} size={72} ringColor="#16a34a" />
                <div className="flex-1">
                  <Legend good={245} ok={2} overdue={3} />
                </div>
              </div>
            </Card>

            <Card className="col-span-4 h-56" title="Self-Audits">
              <div className="text-xs text-gray-500 mt-8">No outstanding scheduled</div>
              <div className="mt-4 text-[11px] text-gray-400">View checklists</div>
            </Card>

            <Card className="col-span-4 h-56" title="Out of Base Management Audits (1)">
              <div className="flex gap-3 items-center">
                <Donut number={1} size={56} ringColor="#16a34a" />
                <div className="flex-1">
                  <Legend good={1} />
                </div>
              </div>
            </Card>

            {/* Row 3 */}
            <Card className="col-span-3 h-56" title="Customer Audits (6)">
              <div className="flex gap-3 items-center">
                <Donut number={6} size={56} ringColor="#16a34a" />
                <div className="flex-1">
                  <Legend good={6} />
                </div>
              </div>
            </Card>

            <Card className="col-span-3 h-56" title="Audit - Competent Authorities (2)">
              <div className="flex gap-3 items-center">
                <Donut number={2} size={56} ringColor="#e74c3c" />
                <div className="flex-1">
                  <Legend good={1} overdue={1} />
                </div>
              </div>
            </Card>

            {/* placeholder grid to keep layout balance */}
            <div className="col-span-6" />

            {/* My Compliance Tasks — full width */}
            <Card className="col-span-12 mt-1" title="My Compliance Tasks">
              <div className="flex items-center gap-3 mb-3">
                <button className="px-3 py-1 text-xs bg-red-600 text-white rounded">Close action</button>
                <button className="px-3 py-1 text-xs bg-green-600 text-white rounded">Complete audit</button>

                <div className="ml-auto flex items-center gap-2">
                  <div className="text-[11px] text-gray-600">Rows per page</div>
                  <div className="text-[11px] text-gray-800 font-medium">{perPage}</div>
                </div>
              </div>

              {/* filters row */}
              <div className="flex items-center gap-3 mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <label className="text-gray-600">Due date:</label>
                  <select className="border px-2 py-1 text-[11px] rounded">
                    <option>All time</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-600">Status:</label>
                  <select className="border px-2 py-1 text-[11px] rounded">
                    <option>All</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-600">Type:</label>
                  <select className="border px-2 py-1 text-[11px] rounded">
                    <option>All</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-600">Assigned to:</label>
                  <select className="border px-2 py-1 text-[11px] rounded">
                    <option>All</option>
                  </select>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <input placeholder="Search tasks..." className="border px-2 py-1 rounded text-[12px]" />
                  <button className="px-3 py-1 rounded bg-white border text-[12px]">
                    <Download size={14} className="inline-block mr-1" />
                    Download
                  </button>
                </div>
              </div>

              {/* table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead className="text-xs text-gray-600 bg-gray-50">
                    <tr>
                      <th className="p-2 text-left">Task</th>
                      <th className="p-2 text-left">Title</th>
                      <th className="p-2 text-left">Due date</th>
                      <th className="p-2 text-left">Assigned to</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TASKS.map((t, i) => (
                      <tr key={i} className={`${i % 2 === 0 ? "" : "bg-white"} border-t`}>
                        <td className="p-2 text-gray-700">{t.task}</td>
                        <td className="p-2 text-gray-600">{t.title}</td>
                        <td className="p-2">
                          <DueBadge date={t.due} status={t.status} />
                        </td>
                        <td className="p-2 text-gray-700 flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-[11px]">MD</div>
                          <div>{t.user}</div>
                          <ChevronRight className="ml-auto opacity-60" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-3 text-[12px] text-gray-500">
                <div>Showing 1 - {Math.min(TASKS.length, perPage)} of {TASKS.length}</div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 border rounded text-[12px]">Prev</div>
                  <div className="px-3 py-1 border rounded text-[12px]">Next</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Reference screenshot preview (local path included) */}
          <div className="mt-6 text-xs text-gray-400">
            Reference screenshot (local):{" "}
            <span className="text-blue-600">/mnt/data/2ae5ab75-82d0-4551-8da4-abefbb313e67.png</span>
            <div className="mt-2 border p-1 rounded bg-white/30">
              <img
                src="/mnt/data/2ae5ab75-82d0-4551-8da4-abefbb313e67.png"
                alt="reference"
                className="w-full object-contain"
                style={{ maxHeight: 160 }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- small presentational components ---------------- */

function SidebarButton({ title, open, active = false }: { title: string; open: boolean; active?: boolean }) {
  return (
    <button
      className={`w-full text-left px-2 py-2 rounded flex items-center gap-3 ${
        active ? "bg-slate-800" : "hover:bg-slate-800"
      }`}
    >
      <div className="h-6 w-6 rounded bg-slate-700 flex items-center justify-center text-xs">●</div>
      {open && <span className="text-[13px]">{title}</span>}
    </button>
  );
}

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border rounded p-3 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-[12px] font-semibold text-gray-700">{title}</div>
        <div className="text-[11px] text-gray-400">...</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function Bar({ label, value, color }: { label: string; value: number; color?: "red" | "orange" | "green" | string }) {
  const bg = color === "red" ? "#e55353" : color === "orange" ? "#ff8a4c" : "#16a34a";
  return (
    <div className="mb-2">
      <div className="text-[11px] text-gray-600 mb-1">{label}</div>
      <div className="h-2 bg-gray-100 rounded">
        <div style={{ width: `${value}%`, background: bg }} className="h-2 rounded" />
      </div>
    </div>
  );
}

function Donut({ number = 0, size = 64, ringColor = "#16a34a", track = "#eef2f7" }: { number?: number; size?: number; ringColor?: string; track?: string }) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * 0; // visually full ring as placeholder
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke={track} strokeWidth={stroke} fill="transparent" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={ringColor}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dash}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="text-[12px]" style={{ fontWeight: 700 }}>
        {number}
      </text>
    </svg>
  );
}

function Legend({ good = 0, ok = 0, overdue = 0 }: { good?: number; ok?: number; overdue?: number }) {
  return (
    <div className="text-[11px] grid grid-cols-3 gap-3">
      <div className="flex items-center gap-2 text-[11px] text-green-600">
        <span className="w-2 h-2 rounded-full bg-green-600 inline-block" /> OK ({good})
      </div>
      {ok > 0 ? (
        <div className="flex items-center gap-2 text-[11px] text-orange-500">
          <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" /> OK ({ok})
        </div>
      ) : (
        <div />
      )}
      {overdue > 0 ? (
        <div className="flex items-center gap-2 text-[11px] text-red-600">
          <span className="w-2 h-2 rounded-full bg-red-600 inline-block" /> Overdue ({overdue})
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

function DueBadge({ date, status }: { date: string; status?: "ok" | "overdue" | "soon" }) {
  const bg = status === "overdue" ? "bg-red-600" : status === "soon" ? "bg-yellow-500" : "bg-green-600";
  return <div className={`inline-block px-2 py-1 text-white text-[11px] rounded ${bg}`}>{date}</div>;
}

/* ---------------- Example data ---------------- */
const TASKS = [
  {
    task: "Close action",
    title: "CMS-000075 - Debrief investigation regarding route cause analysis & private info",
    due: "20/10/2025",
    status: "overdue",
    user: "Florent Dufour",
  },
  {
    task: "Complete audit",
    title: "2023-2017 - Certification of Maintenance Nov 2023",
    due: "31/12/2025",
    status: "ok",
    user: "Mario Osric",
  },
  {
    task: "Complete audit",
    title: "CM-2023-007 - Certification of Maintenance - July 2027",
    due: "31/12/2025",
    status: "ok",
    user: "Mario Osric",
  },
  {
    task: "Complete audit",
    title: "MG-2023-004 - Test Register Audit - Nov 2023",
    due: "30/10/2025",
    status: "ok",
    user: "Mario Osric",
  },
];
