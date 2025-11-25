<<<<<<< HEAD
"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CentrikCasesPage() {
  const [open, setOpen] = useState({
    investigate: true,
    monitor: true,
    ready: true,
  });

  const toggle = (key: keyof typeof open) => {
    setOpen({ ...open, [key]: !open[key] });
  };

  return (
    <div className="p-6 space-y-6">

      {/* Page Title */}
      <h1 className="text-[22px] font-semibold text-[#2E3134]">
        Safety Case List
      </h1>

      {/* Centrik Tabs */}
      <div className="flex items-center space-x-6 border-b border-centrik-border pb-3">
        {[
          "Dashboard",
          "Cases 12",
          "Drafts",
          "Actions 2",
          "Heatmap",
          "KPIs",
          "Safety Newsletters documents",
        ].map((t) => (
          <button
            key={t}
            className={`pb-2 text-[15px] ${
              t.includes("Cases")
                ? "text-centrik-blue border-b-2 border-centrik-blue font-medium"
                : "text-centrik-grayDark hover:text-[#3A3C3F]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 bg-white border border-centrik-border rounded-md text-[14px]">
            <option>Cases (12)</option>
          </select>

          <span className="text-[14px] text-centrik-grayDark">
            Showing all open cases
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-centrik-blue text-white rounded-md text-[14px] shadow-subtle">
            + New safety report
          </button>

          <button className="px-4 py-2 border border-centrik-border rounded-md text-[14px] bg-white">
            Show filters
          </button>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="bg-white border border-centrik-border rounded-lg shadow-subtle overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-12 bg-centrik-gray text-[13px] font-medium border-b border-centrik-border py-3 px-4 text-[#444]">
          <div>No</div>
          <div>Date</div>
          <div>Days Open</div>
          <div>Type</div>
          <div className="col-span-3">Title</div>
          <div>Flags</div>
          <div>ERC Score</div>
          <div>SIRA</div>
          <div className="col-span-2">Action Status</div>
          <div></div>
        </div>

        {/* ================================
             PHASE: INVESTIGATE (9)
           ================================ */}
        <button
          onClick={() => toggle("investigate")}
          className="flex items-center w-full bg-[#ECEEEF] px-4 py-2 border-b border-centrik-border font-medium text-[14px]"
        >
          <ChevronDown
            className={`mr-2 transition ${
              open.investigate ? "" : "-rotate-90"
            }`}
          />
          Phase: Investigate (9)
        </button>

        {open.investigate && (
          <>
            {/* Sample Row */}
            {[
              {
                no: "000085",
                date: "20/10/2024",
                days: 396,
                type: "MSR-01",
                title: "BLR DUTY PHONE SIM",
                erc: 1,
                action: "Investigate: (open)",
              },
              {
                no: "000084",
                date: "14/10/2024",
                days: 401,
                type: "MSR-01",
                title:
                  "Lufthansa/ D-AIGO - Silver Dot Application not in accordance with DLH Procedure Manual",
                erc: 4,
                action: "Investigate: (open)",
              },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-12 text-[14px] px-4 py-3 border-b border-centrik-border hover:bg-[#F9FAFA]"
              >
                <div>{row.no}</div>
                <div>
                  <span className="px-2 py-1 border border-centrik-border rounded bg-centrik-gray text-[12px]">
                    {row.date}
                  </span>
                </div>
                <div>{row.days}</div>
                <div className="text-centrik-blue font-medium">{row.type}</div>
                <div className="col-span-3 text-centrik-blue underline cursor-pointer">
                  {row.title}
                </div>
                <div>-</div>
                <div>
                  <span className="px-2 py-1 bg-yellow-100 border border-yellow-300 rounded">
                    {row.erc}
                  </span>
                </div>
                <div>-</div>
                <div className="col-span-2">{row.action}</div>
                <div className="flex justify-end">
                  <ChevronRight className="text-[#999]" />
                </div>
              </div>
            ))}
          </>
        )}

        {/* Other groups identical structure ... */}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center">
        <button className="px-4 py-2 bg-white border border-centrik-border rounded-md text-[14px]">
          View Closed Cases (52)
        </button>

        <button className="px-4 py-2 bg-white border border-centrik-border rounded-md text-[14px]">
          ↓ Download
        </button>
      </div>
    </div>
  );
=======
'use client'

export default function SafetyCasesCard() {
  const caseStats = [
    { label: 'Investigate', value: 9, color: '#0066cc' },
    { label: 'Monitor', value: 1, color: '#22863a' },
    { label: 'Ready to Close', value: 2, color: '#7b68ee' },
  ]

  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: 'var(--border-light)' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold" style={{ color: 'var(--text-dark)' }}>
          All open cases (12)
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            {/* Light gray background */}
            <circle cx="60" cy="60" r="45" fill="none" stroke="#e0e0e0" strokeWidth="14" />
            
            {/* Blue segment - Investigate (9/12 = 270 degrees) */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#0066cc"
              strokeWidth="14"
              strokeDasharray="212 283"
              strokeDashoffset="0"
              transform="rotate(-90 60 60)"
            />
            
            {/* Green segment - Monitor (1/12 = 30 degrees) */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#22863a"
              strokeWidth="14"
              strokeDasharray="24 283"
              strokeDashoffset="-212"
              transform="rotate(-90 60 60)"
            />
            
            {/* Purple segment - Ready to Close (2/12 = 60 degrees) */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#7b68ee"
              strokeWidth="14"
              strokeDasharray="47 283"
              strokeDashoffset="-236"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>12</span>
            <span className="text-sm" style={{ color: 'var(--text-light)' }}>cases</span>
          </div>
        </div>

        <div className="space-y-2 w-full">
          {caseStats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
              <span style={{ color: 'var(--text-light)' }} className="text-sm">
                {stat.label} ({stat.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
}
