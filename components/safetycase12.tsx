"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SafetyCaseList() {
  const [openGroups, setOpenGroups] = useState({
    investigate: true,
    monitor: true,
    close: true,
  });

  const toggle = (key: keyof typeof openGroups) => {
    setOpenGroups({ ...openGroups, [key]: !openGroups[key] });
  };

  return (
    <div className="p-6 space-y-6">

      
      

      {/* Filters + Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border rounded-lg bg-white">
            <option>Cases (12)</option>
          </select>
          <p className="text-gray-600">Showing all open cases</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            + New safety report
          </button>
          <button className="border px-4 py-2 rounded-lg">
            Show filters
          </button>
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-12 bg-gray-50 text-sm font-semibold border-b py-3 px-4">
          <div>No</div>
          <div>Date</div>
          <div>Days Open</div>
          <div>Type</div>
          <div className="col-span-3">Title</div>
          <div>Flags</div>
          <div>ERC Score</div>
          <div>SIRA Result</div>
          <div className="col-span-2">Action Status</div>
          <div></div>
        </div>

        {/* ============================
             PHASE: INVESTIGATE (9)
           ============================ */}
        <div>
          <button
            onClick={() => toggle("investigate")}
            className="w-full flex items-center text-left bg-gray-100 px-4 py-2 font-semibold"
          >
            <ChevronDown
              className={`mr-2 transition ${
                openGroups.investigate ? "rotate-0" : "-rotate-90"
              }`}
            />
            Phase: Investigate (9)
          </button>

          {openGroups.investigate && (
            <>
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
                {
                  no: "000082, 000083",
                  date: "11/10/2024",
                  days: 405,
                  type: "MSR-01",
                  title: "slat touching C-duct",
                  flag: "Fatg.",
                  erc: 20,
                  action: "Investigate: (open)",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 text-sm border-b px-4 py-3 hover:bg-gray-50"
                >
                  <div>{row.no}</div>
                  <div>
                    <span className="px-2 py-1 border rounded bg-gray-100">
                      {row.date}
                    </span>
                  </div>
                  <div>{row.days}</div>
                  <div className="text-blue-600">{row.type}</div>
                  <div className="col-span-3 text-blue-600 underline cursor-pointer">
                    {row.title}
                  </div>

                  <div>
                    {row.flag && (
                      <span className="border rounded px-2 py-1 text-xs bg-gray-100">
                        {row.flag}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="px-2 py-1 border rounded bg-yellow-100 text-yellow-700">
                      {row.erc}
                    </span>
                  </div>

                  <div>-</div>
                  <div className="col-span-2">{row.action}</div>
                  <div className="flex justify-end">
                    <ChevronRight className="text-gray-400" />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* ============================
             PHASE: MONITOR
           ============================ */}
        <div>
          <button
            onClick={() => toggle("monitor")}
            className="w-full flex items-center text-left bg-gray-100 px-4 py-2 font-semibold mt-1"
          >
            <ChevronDown
              className={`mr-2 transition ${
                openGroups.monitor ? "rotate-0" : "-rotate-90"
              }`}
            />
            Phase: Monitor (1)
          </button>

          {openGroups.monitor && (
            <div className="px-4 py-4 text-gray-500">
              No cases in this section.
            </div>
          )}
        </div>

        
        <div>
          <button
            onClick={() => toggle("close")}
            className="w-full flex items-center text-left bg-gray-100 px-4 py-2 font-semibold mt-1"
          >
            <ChevronDown
              className={`mr-2 transition ${
                openGroups.close ? "rotate-0" : "-rotate-90"
              }`}
            />
            Phase: Ready to Close (2)
          </button>

          {openGroups.close && (
            <div className="px-4 py-4 text-gray-500">
              No cases in this section.
            </div>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 border rounded-lg bg-white">
          View Closed Cases (52)
        </button>

        <button className="px-4 py-2 border rounded-lg">
          ↓ Download
        </button>
      </div>
    </div>
  );
}
