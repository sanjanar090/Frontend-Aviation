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
}
