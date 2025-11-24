"use client";

import React, { useState } from "react";

export default function SafetyAnalysisPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-white">
      
      {/* Left Sidebar */}
      <aside
        className={`flex-shrink-0 w-56 bg-[#08293f] text-white flex flex-col justify-between transition-all duration-200 ${
          sidebarOpen ? "" : "w-16"
        }`}
      >
        <div>
          <div className="h-16 px-4 flex items-center gap-3 border-b border-white/10">
            <div className="w-10 h-10 bg-[#052036] rounded flex items-center justify-center">
              ZA
            </div>
            <div className="font-semibold">Dale Aviation</div>
          </div>

          <nav className="px-2 py-4 space-y-1">
            <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5">
              <div className="w-5 h-5 bg-white/10 rounded" />
              <span className="text-sm">Dashboard</span>
            </a>

            <div className="mt-3 bg-[#0b3350] rounded">
              <div className="px-3 py-2 font-medium flex items-center gap-3">
                <div className="w-5 h-5 bg-white/10 rounded" />
                Safety
              </div>
              <div className="pl-6">
                <a className="block px-3 py-2 text-sm hover:bg-white/5">Safety</a>
                <a className="block px-3 py-2 text-sm hover:bg-white/5">
                  Health, Safety and E...
                </a>
                <a className="block px-3 py-2 text-sm bg-[#1370ff]">
                  Analysis (All)
                </a>
              </div>
            </div>

            <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5">
              Compliance
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5">
              Workflows
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5">
              Risk
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5">
              Devices
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5">
              Config
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5">
              Contacts
            </a>
          </nav>
        </div>

        <div className="px-4 py-4 border-t border-white/10">
          <button className="w-full text-left">Collapse menu</button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">

        {/* Top bar */}
        <header className="h-14 bg-[#f7c02b] flex items-center justify-center border-b">
          <div className="text-sm font-medium">Test System</div>
        </header>

        {/* Profile Header */}
        <div className="bg-white border-b">
          <div className="max-w-full mx-6 flex items-center justify-end h-16 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full border" />
              <div className="text-sm text-slate-700">
                <div className="font-medium">Matko Dadic</div>
                <div className="text-xs">Accountable Manager</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="max-w-full mx-auto bg-[#e6eef6] rounded-t border border-b-0">
            <div className="px-4">
              <ul className="flex gap-4 text-sm">
                <li
                  className={`py-3 px-4 ${
                    activeTab === "dashboard"
                      ? "border-b-2 border-white bg-white/40 rounded-t"
                      : "text-slate-600"
                  }`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  Dashboard
                </li>
                <li className="py-3 px-4 text-slate-600">All cases</li>
                <li className="py-3 px-4 text-slate-600">Heatmap</li>
                <li className="py-3 px-4 text-slate-600">KPIs</li>
                <li className="py-3 px-4 text-slate-600">Reference values</li>
              </ul>
            </div>
          </div>

          <div className="mt-0 border rounded-b border-[#dbe6ee] bg-white h-[68vh]">
            <div className="p-6 h-full">
              <h3 className="text-lg font-medium mb-6">My Safety tasks</h3>

              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <img
                    src="/empty.png"
                    alt="empty"
                    className="mx-auto w-36 h-36 mb-4"
                  />
                  <div className="text-slate-700 font-medium">
                    You don't have any outstanding tasks
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
