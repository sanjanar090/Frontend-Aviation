"use client";

import { useState } from "react";
import { Search, Download, Filter, Plus, ChevronDown, ChevronRight } from "lucide-react";

export default function SafetyAnalysisDashboard({ activeTab, setActiveTab }) {

  const [openSection, setOpenSection] = useState({
    assess: true,
    investigate: true,
    monitor: true,
    ready: true
  });

  const toggle = (key) =>
    setOpenSection({ ...openSection, [key]: !openSection[key] });

  // ✅ FIXED: No more invalid [...]
  const cases = {
    assess: [
      {
        subsystem: "Safety",
        no: "000095",
        date: "24/11/2025",
        daysOpen: 1,
        type: "MSR-01",
        title: "Maintenance 1",
        flags: ["MOR?", "Fatg."],
        erc: "-",
      },
    ],
    investigate: [],   // ✅ must be an array
    monitor: [],       // ✅ must be an array
    ready: [],         // ✅ must be an array
  };

  const Section = ({ label, name, items }) => (
    <div className="border rounded-lg bg-white mb-4 shadow-sm">
      <button
        onClick={() => toggle(name)}
        className="w-full px-4 py-2 flex items-center justify-between bg-gray-100 text-sm font-semibold"
      >
        <span>{label} ({items.length})</span>
        {openSection[name] ? <ChevronDown /> : <ChevronRight />}
      </button>

      {openSection[name] && (
        <div className="divide-y">
          {items.map((c, i) => (
            <div key={i} className="grid grid-cols-12 px-4 py-3 text-sm hover:bg-gray-50">
              <div className="col-span-2">{c.subsystem}</div>
              <div className="col-span-1">{c.no}</div>
              <div className="col-span-1">{c.date}</div>
              <div className="col-span-1">{c.daysOpen}</div>
              <div className="col-span-1">{c.type}</div>
              <div className="col-span-3 truncate">{c.title}</div>
              <div className="col-span-1 flex gap-1">
                {c.flags?.map((f, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs border rounded bg-gray-100"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="col-span-1 font-bold">{c.erc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Overall Case List</h1>
        <div className="flex gap-3">
          <button className="px-3 py-2 border rounded flex items-center gap-2">
            <Filter size={16}/> Show filters
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
            <Plus size={16}/> New report
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600">Showing all open cases</p>

      <Section label="Phase: Assess" name="assess" items={cases.assess} />
      <Section label="Phase: Investigate" name="investigate" items={cases.investigate} />
      <Section label="Phase: Monitor" name="monitor" items={cases.monitor} />
      <Section label="Phase: Ready to Close" name="ready" items={cases.ready} />

      <div className="flex justify-between items-center py-4">
        <button className="px-4 py-2 border rounded">
          View Closed Cases (56)
        </button>
        <button className="px-4 py-2 border rounded flex items-center gap-2">
          <Download size={16}/> Download
        </button>
      </div>
    </div>
  );
}
