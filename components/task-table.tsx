// components/MyTasksSection.tsx
"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type Row = {
  module: string;
  task: string;
  title: string;
  dueDate?: string; // dd/MM/yyyy or undefined
  assignedTo: string;
};

const ALL_ROWS: Row[] = [
  {
    module: "Workflows - Workflows",
    task: "Complete step",
    title:
      "Air Senegal support in DSS airport for 9H-SZN - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval",
    assignedTo: "Matko Dadic",
  },
  {
    module: "Workflows - Workflows",
    task: "Complete step",
    title:
      "test3 - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval",
    assignedTo: "Matko Dadic",
  },
  {
    module: "Workflows - Workflows",
    task: "Complete action",
    title: "WKF-000043 - Update email signature with new approval number",
    dueDate: "19/08/2024",
    assignedTo: "Matko Dadic",
  },
  {
    module: "Workflows - Workflows",
    task: "Complete step",
    title:
      "Complete 2 steps for Change of Competent Authority (EASA foreign country to FR OSAC)",
    dueDate: "30/08/2024",
    assignedTo: "Accountable Manager",
  },
  {
    module: "Workflows - Workflows",
    task: "Complete step",
    title:
      "contract between DALE and XXX - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval",
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
    assignedTo: "Matko Dadic",
  },
  {
    module: "Compliance - Audit - Internal Compliance Monitoring",
    task: "Complete audit",
    title: "CM-2022-022 - Certification of Maintenance - JULY 2022",
    dueDate: "31/12/2025",
    assignedTo: "Matko Dadic",
  },
  {
    module: "Risk - Risk",
    task: "Complete assessment",
    title: "Aircraft services",
    dueDate: "16/01/2026",
    assignedTo: "Matko Dadic",
  },
  {
    module: "Compliance - Out of Base Management Audits",
    task: "Complete audit",
    title: "MO-2025-001 - Test Regulator Audit - Nov 2025",
    dueDate: "30/11/2026",
    assignedTo: "Matko Dadic",
  },
  {
    module: "Compliance - Audit - Internal Compliance Monitoring",
    task: "Complete audit",
    title: "CMS-000073 - Document information regarding route cause analysis & provide info",
    dueDate: "20/11/2025",
    assignedTo: "Florent Dufour",
  },
];

function parseDateDMY(s?: string): Date | null {
  if (!s) return null;
  // expect dd/MM/yyyy
  const parts = s.split("/");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) return null;
  return new Date(year, month, day);
}

function startOfDay(d: Date) {
  const t = new Date(d);
  t.setHours(0, 0, 0, 0);
  return t;
}
function endOfDay(d: Date) {
  const t = new Date(d);
  t.setHours(23, 59, 59, 999);
  return t;
}

export default function MyTasksSection() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [dueFilter, setDueFilter] = useState<string>("All time");
  const [customFrom, setCustomFrom] = useState<string>(""); // yyyy-mm-dd (input)
  const [customTo, setCustomTo] = useState<string>("");

  // prepare parsed date map for faster comparisons
  const rowsWithParsed = useMemo(() => {
    return ALL_ROWS.map((r) => ({
      ...r,
      parsed: parseDateDMY(r.dueDate) // maybe null
    }));
  }, []);

  // date range helper for 'Next N days'
  function getRangeForOption(opt: string): { from?: Date; to?: Date } | null {
    const today = startOfDay(new Date());
    if (opt === "All time") return null;
    if (opt === "Date set") return { from: new Date(-8640000000000000), to: new Date(8640000000000000) }; // any date
    if (opt === "No date set") return { from: undefined, to: undefined };
    if (opt === "Overdue") {
      return { from: new Date(-8640000000000000), to: endOfDay(new Date(Date.now() - 24 * 60 * 60 * 1000)) }; // before today
    }
    if (opt === "Next 7 days") {
      const from = startOfDay(new Date());
      const to = endOfDay(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
      return { from, to };
    }
    if (opt === "Next 14 days") {
      const from = startOfDay(new Date());
      const to = endOfDay(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000));
      return { from, to };
    }
    if (opt === "Next 30 days") {
      const from = startOfDay(new Date());
      const to = endOfDay(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
      return { from, to };
    }
    if (opt === "Custom") {
      if (!customFrom && !customTo) return null;
      const from = customFrom ? startOfDay(new Date(customFrom)) : undefined;
      const to = customTo ? endOfDay(new Date(customTo)) : undefined;
      return { from, to };
    }
    return null;
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = rowsWithParsed.filter((r) => {
      // search
      if (q) {
        const inText =
          r.module.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.task.toLowerCase().includes(q) ||
          r.assignedTo.toLowerCase().includes(q);
        if (!inText) return false;
      }
      return true;
    });

    // due date filter
    if (dueFilter === "No date set") {
      list = list.filter((r) => !r.parsed);
    } else if (dueFilter === "Date set") {
      list = list.filter((r) => !!r.parsed);
    } else {
      const range = getRangeForOption(dueFilter);
      if (dueFilter === "Overdue") {
        // before today
        if (range && range.to) {
          list = list.filter((r) => r.parsed && r.parsed.getTime() <= range.to!.getTime());
        }
      } else if (dueFilter === "All time") {
        // do nothing
      } else if (range) {
        // Next X days or Custom: include items with parsed date within [from,to]
        list = list.filter((r) => {
          if (!r.parsed) return false;
          const time = r.parsed.getTime();
          if (range.from && time < range.from.getTime()) return false;
          if (range.to && time > range.to.getTime()) return false;
          return true;
        });
      }
    }

    return list;
  }, [rowsWithParsed, search, dueFilter, customFrom, customTo]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safeCurrent = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrent - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const pageRows = filtered.slice(startIndex, endIndex);

  // color mapping for badges (re-use screenshot mapping)
  function dateBadgeClass(date?: string) {
    if (!date) return "";
    const redDates = ["19/08/2024", "30/08/2024", "20/11/2025"];
    const yellowDates = ["28/11/2025"];
    const greenDates = ["11/11/2025", "31/12/2025", "16/01/2026", "30/11/2026"];
    if (redDates.includes(date)) return "bg-red-50 text-red-700 border-red-300";
    if (yellowDates.includes(date)) return "bg-yellow-50 text-yellow-800 border-yellow-300";
    if (greenDates.includes(date)) return "bg-green-50 text-green-700 border-green-300";
    return "bg-gray-50 text-gray-700 border-gray-200";
  }

  function prevPage() {
    setCurrentPage((p) => Math.max(1, p - 1));
  }
  function nextPage() {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  }

  return (
    <div className="w-full max-w-full p-6 bg-white rounded-md">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">My tasks</h2>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full flex items-center justify-center bg-red-100 text-red-700 font-medium text-sm">3</span>
            <span className="w-7 h-7 rounded-full flex items-center justify-center bg-green-100 text-green-700 font-medium text-sm">6</span>
            <span className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-200 text-gray-700 font-medium text-sm">1</span>
          </div>
        </div>

        <div>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">+ Add Action</button>
        </div>
      </div>

      {/* cards */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card title="Workflows tasks">
          <CardRow label="Complete step" segments={[{ color: "red", w: 60 }, { color: "green", w: 40 }]} />
          <CardRow label="Complete action" segments={[{ color: "red", w: 80 }, { color: "gray", w: 20 }]} />
          <CardRow label="Close action" segments={[{ color: "green", w: 35 }, { color: "gray", w: 65 }]} />
        </Card>

        <Card title="Compliance tasks">
          <CardRow label="Chase action" segments={[{ color: "red", w: 20 }, { color: "gray", w: 80 }]} />
          <CardRow label="Complete audit" segments={[{ color: "green", w: 60 }, { color: "gray", w: 40 }]} />
        </Card>

        <Card title="Risk tasks">
          <CardRow label="Complete assessment" segments={[{ color: "green", w: 25 }, { color: "gray", w: 75 }]} />
        </Card>
      </div>

      {/* filters */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <DueDateFilter
          selected={dueFilter}
          onChange={(v) => {
            setDueFilter(v);
            setCurrentPage(1);
          }}
          customFrom={customFrom}
          customTo={customTo}
          setCustomFrom={setCustomFrom}
          setCustomTo={setCustomTo}
        />
        <FilterBtn label="Status: All" />
        <FilterBtn label="Task: All" />
        <FilterBtn label="Type: All" />
        <FilterBtn label="Module: All" />
        <FilterBtn label="Assigned to: All" />

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search tasks..."
              className="border rounded px-3 py-2 text-sm w-64"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">🔍</div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs text-slate-600">
            <tr>
              <th className="px-4 py-3">Module</th>
              <th className="px-4 py-3">Task</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Due date</th>
              <th className="px-4 py-3">Assigned to</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">No tasks found</td>
              </tr>
            ) : (
              pageRows.map((r, idx) => (
                <tr key={idx} className="border-t hover:bg-slate-50">
                  <td className="px-4 py-3 align-top text-xs text-slate-700">{r.module}</td>
                  <td className="px-4 py-3 align-top text-xs text-slate-700">{r.task}</td>
                  <td className="px-4 py-3 align-top text-sm text-slate-700">{r.title}</td>
                  <td className="px-4 py-3 align-top">
                    {r.dueDate ? (
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded border ${dateBadgeClass(r.dueDate)}`}>
                        {r.dueDate}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-sky-200 rounded-full flex items-center justify-center text-xs text-sky-700">MD</div>
                      <div className="text-sm text-slate-700">{r.assignedTo}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-right">
                    <button className="p-1 rounded hover:bg-slate-100">
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* pagination footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-white">
          <div className="text-sm text-slate-600">
            Showing <b>{startIndex + 1}</b>–<b>{endIndex}</b> of <b>{totalItems}</b>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              Items per page:
              <select
                className="border rounded px-2 py-1 text-sm"
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              >
                {[5, 10, 20, 50].map((n) => (<option key={n} value={n}>{n}</option>))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={prevPage} disabled={safeCurrent === 1} className="px-3 py-1 border rounded disabled:opacity-40 text-sm">Prev</button>
              <button onClick={nextPage} disabled={safeCurrent === totalPages} className="px-3 py-1 border rounded disabled:opacity-40 text-sm">Next</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button className="px-4 py-2 border rounded text-sm text-slate-700">⬇ Download</button>
      </div>
    </div>
  );
}

/* Small subcomponents */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">
      <h3 className="font-semibold mb-3 text-sm text-slate-800">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
function CardRow({ label, segments }: { label: string; segments: { color: "red" | "green" | "gray" | "yellow"; w: number }[] }) {
  const segs = segments ?? [];
  const used = segs.reduce((a, s) => a + s.w, 0);
  return (
    <div className="mb-3">
      <div className="text-sm text-slate-700 mb-2">{label}</div>
      <div className="flex items-center gap-2 h-2">
        {segs.map((s, i) => (
          <div key={i} className={`rounded h-2 ${s.color === "red" ? "bg-red-500" : s.color === "green" ? "bg-green-600" : s.color === "yellow" ? "bg-yellow-400" : "bg-gray-300"}`} style={{ width: `${s.w}%`}} />
        ))}
        {used < 100 && <div className="rounded h-2 bg-gray-200" style={{ width: `${100 - used}%` }} />}
      </div>
    </div>
  );
}
function FilterBtn({ label }: { label: string }) {
  return (
    <button className="border rounded px-3 py-2 text-sm bg-white flex items-center gap-2">
      {label}
      <ChevronDown className="w-4 h-4 text-slate-600" />
    </button>
  );
}

/* EXACT screenshot style - radio list on left, From/To always visible */
function DueDateFilter({
  selected,
  onChange,
  customFrom,
  customTo,
  setCustomFrom,
  setCustomTo,
}: {
  selected: string;
  onChange: (v: string) => void;
  customFrom: string;
  customTo: string;
  setCustomFrom: (v: string) => void;
  setCustomTo: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const options = [
    "All time",
    "Date set",
    "No date set",
    "Overdue",
    "Next 7 days",
    "Next 14 days",
    "Next 30 days",
    "Custom",
  ];
  

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((s) => !s)}
        className="border px-3 py-2 rounded text-sm bg-white flex items-center gap-2"
      >
        <span>Due date: {selected}</span>
        <ChevronDown className="w-4 h-4 text-slate-600" />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-[420px] bg-white border rounded shadow p-4 z-50">
          <div className="flex gap-6">
            {/* LEFT SIDE: RADIO LIST */}
            <div className="flex flex-col gap-2 w-40">
              {options.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                >
                  <input
                    type="radio"
                    name="due-date"
                    value={opt}
                    checked={selected === opt}
                    onChange={() => onChange(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>

            {/* RIGHT SIDE: FROM / TO ALWAYS VISIBLE */}
            <div className="flex-1">
              <div className="text-xs text-slate-600 mb-1">From</div>
              <input
                type="date"
                className="w-full border rounded px-2 py-1 mb-3"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
              />

              <div className="text-xs text-slate-600 mb-1">To</div>
              <input
                type="date"
                className="w-full border rounded px-2 py-1"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
              />

              <div className="mt-3 text-right">
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






  
  
  
            
        