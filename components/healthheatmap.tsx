"use client";

import React from "react";

export default function HealthHeatmapPage() {
  return (
    <div className="px-6 py-6">
      
      {/* Title */}
      <h2 className="text-lg font-medium text-gray-900">Safety heatmap</h2>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-2 max-w-3xl">
        Select a cell in the heatmap to show all related cases. In each cell,
        the first number shows the risk score, with the second number in the
        circle representing total related cases.
      </p>

      {/* Total Score + Filters */}
      <div className="flex items-center justify-between mt-8">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Score</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">0</p>
        </div>

        <button className="border px-4 py-2 text-sm rounded-md text-gray-700 flex items-center gap-2">
          <span>⚙</span> Show filters
        </button>
      </div>

      {/* Heatmap Table */}
      <div className="mt-8 border rounded-lg overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-3 bg-gray-100 text-sm text-gray-700 p-3 border-b">
          <div className="font-medium">Affected Fleet</div>
          <div className="font-medium text-center">Risk Category</div>
          <div className="font-medium text-center">Health and Safety</div>
        </div>

        {/* Table Row */}
        <div className="grid grid-cols-3 text-sm">

          {/* Column 1 */}
          <div className="border-r p-4 bg-white flex items-center">
            <span>Affected Fleet</span>
            <span className="ml-2 bg-gray-200 text-gray-700 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          {/* Column 2 */}
          <div className="border-r p-4 bg-gray-200 flex items-center justify-center">
            <span className="mr-2">Station</span>
            <span className="bg-white text-gray-700 text-xs w-5 h-5 flex items-center justify-center rounded-full border">
              1
            </span>
          </div>

          {/* Column 3 */}
          <div className="p-4 bg-gray-300 flex items-center justify-center">
            <span className="bg-white text-gray-700 text-xs w-5 h-5 flex items-center justify-center rounded-full border">
              2
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
