"use client";

import { Edit, FilePlus2 } from "lucide-react";

export default function HealthKPI() {
  return (
    <div className="p-6 bg-white rounded-md border">

      {/* Section Title */}
      <div className="text-sm font-medium text-blue-700">
        KPI Report Template
      </div>

      <p className="text-xs text-gray-600 mt-1">
        No KPI report templates have been defined – use the “New Template”
        button to create one
      </p>

      {/* Buttons Row */}
      <div className="flex items-center justify-between mt-4">

        {/* Left Buttons */}
        <div className="flex items-center gap-3">

          {/* Edit */}
          <button className="bg-white border px-4 py-2 text-sm rounded-md flex items-center gap-2 shadow-sm">
            <Edit size={16} />
            Edit
          </button>

          {/* New Template */}
          <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md flex items-center gap-2">
            <FilePlus2 size={16} />
            New Template
          </button>

        </div>

        {/* Right Buttons */}
        <div className="flex gap-4">
          <button className="border px-4 py-2 rounded-md bg-white text-sm">
            One-Off Report
          </button>

          <button className="border px-4 py-2 rounded-md bg-white text-sm">
            References
          </button>
        </div>

      </div>

      {/* Content Placeholder */}
      <div className="mt-6 w-full h-[600px] bg-white border rounded-md"></div>
    </div>
  );
}
