"use client";

import React, { useState } from "react";
import { ChevronRight, Download, Plus } from "lucide-react";

export default function SafetyAnalysisAllCases() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full">
      <div className="bg-white rounded shadow-sm border border-gray-200">

        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-700">Overall Case List</h2>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded shadow hover:opacity-95">
              <Plus size={16} /> New report
            </button>
            <button className="flex items-center gap-2 border px-3 py-2 rounded">
              <Download size={16} /> Download
            </button>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-gray-50">
          <Tabs active={activeTab} onChange={setActiveTab} />
        </div>

        <div className="p-6">
          <CaseTable />

          <div className="flex justify-center mt-6">
            <button className="px-5 py-2 border rounded bg-white">
              View Closed Cases{" "}
              <span className="ml-2 inline-block bg-green-100 text-green-700 px-2 rounded-full text-xs">
                56
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function Tabs({ active, onChange }) {
  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "all", label: "All cases" },
    { key: "heatmap", label: "Heatmap" },
    { key: "kpis", label: "KPIs" },
    { key: "refs", label: "Reference values" },
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`px-4 py-2 rounded-t ${
              active === t.key ? "bg-gray-100 border border-b-white" : "text-slate-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button className="px-3 py-2 border rounded">Show filters</button>
      </div>
    </div>
  );
}

function CaseTable() {
  const phases = [
    {
      name: "Phase: Assess",
      rows: [
        {
          subsystem: "Safety",
          no: "000095",
          date: "24/11/2025",
          daysOpen: 0,
          type: "MSR-01",
          title: "Maintenance 1",
          flags: ["MOR?", "Fatg."],
          erc: "-",
          sira: "-",
          action: "-",
        },
      ],
    },
    {
      name: "Phase: Investigate",
      rows: [
        { subsystem: "Safety", no: "000085", date: "20/10/2024", daysOpen: 400, type: "MSR-01", title: "BLR DUTY PHONE SIM", erc: 1 },
        { subsystem: "Safety", no: "000084", date: "14/10/2024", daysOpen: 405, type: "MSR-01", title: "Lufthansa/ D-AIGO – Silver Dot Application not in accordance", erc: 4 },
        { subsystem: "Safety", no: "000082, 000083", date: "11/10/2024", daysOpen: 409, type: "MSR-01", title: "slat touching C-duct", flags: ["Fatg."], erc: 20 },
        { subsystem: "Safety", no: "000081", date: "10/10/2024", daysOpen: 409, type: "MSR-01", title: "SmartLynx TOR-168/2024 wrong template", erc: 4 },
        { subsystem: "Safety", no: "000062", date: "18/07/2024", daysOpen: 494, type: "HAZ-02", title: "PAINT VAPORS IN BAY 5", erc: 20, sira: "1" },
      ],
    },
    {
      name: "Phase: Monitor",
      rows: [
        { subsystem: "Safety", no: "000068", date: "29/08/2024", daysOpen: 452, type: "MSR-02", title: "SmartLynx report - BLR Station condition", erc: 20, sira: "1" },
      ],
    },
    {
      name: "Phase: Ready to Close",
      rows: [
        { subsystem: "Safety", no: "000079", date: "09/10/2024", daysOpen: 411, type: "HAZ-02", title: "diesel tank leak", erc: 4 },
        { subsystem: "Safety", no: "000078", date: "09/10/2024", daysOpen: 411, type: "HAZ-01", title: "Absorption sand", erc: 4 },
      ],
    },
  ];

  return (
    <div className="w-full bg-white border border-gray-100 rounded">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 text-xs text-slate-500">
            <tr>
              <th className="px-4 py-3">Subsystem</th>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Days Open</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Flags</th>
              <th className="px-4 py-3">ERC</th>
              <th className="px-4 py-3">SIRA</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {phases.map((phase) => (
              <React.Fragment key={phase.name}>
                <tr className="bg-gray-100">
                  <td colSpan={11} className="px-4 py-2 text-sm text-slate-600 font-medium">
                    {phase.name}{" "}
                    <span className="text-xs text-slate-400">
                      ({phase.rows.length})
                    </span>
                  </td>
                </tr>

                {phase.rows.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{r.subsystem}</td>
                    <td className="px-4 py-3">{r.no}</td>
                    <td className="px-4 py-3">{r.date}</td>
                    <td className="px-4 py-3">{r.daysOpen}</td>
                    <td className="px-4 py-3">{r.type}</td>
                    <td className="px-4 py-3">{r.title}</td>
                    <td className="px-4 py-3">
                      {r.flags?.map((f) => (
                        <span key={f} className="mr-1 inline-block border rounded px-2 py-0.5 text-xs bg-white">
                          {f}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-3">{r.erc ?? "-"}</td>
                    <td className="px-4 py-3">{r.sira ?? "-"}</td>
                    <td className="px-4 py-3">{r.action ?? "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <ChevronRight size={16} className="text-slate-400" />
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
