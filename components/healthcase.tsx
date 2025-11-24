"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { ChevronDown } from "lucide-react";

export default function HealthCasePage() {
  const [sidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Top Title Row */}
        <div className="px-6 py-4 border-b bg-white">
          <h1 className="text-lg font-semibold text-gray-800">
            Health, Safety and Environment Case List
          </h1>

          {/* Tabs */}
          <div className="flex gap-6 mt-4 text-sm">
            <button className="text-gray-600 hover:text-black">Dashboard</button>
            <button className="text-blue-600 border-b-2 border-blue-600 pb-1">
              Cases
            </button>
            <button className="text-gray-600 hover:text-black">Drafts</button>
            <button className="text-gray-600 hover:text-black">Heatmap</button>
            <button className="text-gray-600 hover:text-black">KPIs</button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">

          {/* Filter Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Dropdown */}
              <select className="border rounded-md px-3 py-1 text-sm">
                <option>Cases</option>
              </select>

              <span className="text-sm text-gray-600">
                Showing all open cases
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2">
                + New health, safety and environment report
              </button>

              <button className="border px-4 py-2 rounded-md text-sm text-gray-700 flex items-center gap-2">
                <span>Show filters</span>
              </button>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center mt-20">

            <img
              src="/images/empty-cases.png"
              className="w-32 mb-4"
              alt="No Cases"
            />

            <p className="text-gray-700 text-sm mt-2">
              There are no cases to display
            </p>

            <p className="text-gray-500 text-xs mt-1">
              Try adjusting your filters or searching with another term
            </p>

            <div className="flex gap-4 mt-6">
              <button className="bg-blue-600 text-white px-5 py-2 text-sm rounded-md">
                Show filters
              </button>

              <button className="border border-red-400 text-red-500 px-5 py-2 text-sm rounded-md">
                Clear all filters
              </button>
            </div>

            {/* View Closed Cases Button */}
            <button className="mt-8 border border-blue-500 text-blue-600 text-sm px-5 py-2 rounded-md flex items-center gap-2">
              View Closed Cases
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
