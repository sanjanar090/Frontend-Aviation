"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from "lucide-react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function SafetyAnalysisDashboard() {
  const [search, setSearch] = useState("");

  const tasks = [
    {
      task: "Assess report",
      title: "000095 - Maintenance 1",
      due: "01/12/2025",
      assigned: "Department/Role",
    },
  ];

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 w-full">
      {/* Tabs */}
      <div className="flex gap-6 border-b pb-3 text-[15px] font-medium">
        <button className="border-b-2 border-blue-600 pb-2 text-blue-600">Dashboard</button>
        <button className="pb-2 hover:text-blue-600">All cases</button>
        <button className="pb-2 hover:text-blue-600">Heatmap</button>
        <button className="pb-2 hover:text-blue-600">KPIs</button>
        <button className="pb-2 hover:text-blue-600">Reference values</button>
      </div>

      {/* Title */}
      <h2 className="text-[18px] font-semibold mt-6 flex items-center gap-2">
        My Safety tasks <span className="bg-green-600 text-white px-2 text-sm rounded-full">1</span>
      </h2>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 mt-4">
        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Due date: All time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="today">Today</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Status: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Task: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="assess">Assess</SelectItem>
            <SelectItem value="investigate">Investigate</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Assigned to: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="dept">Department/Role</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search tasks..."
          className="ml-auto max-w-[240px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="mt-6 border rounded-md overflow-hidden">
        <table className="w-full text-[14px]">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Task</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Due date</th>
              <th className="p-3 text-left">Assigned to</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{row.task}</td>
                <td className="p-3 text-blue-600 hover:underline cursor-pointer">{row.title}</td>
                <td className="p-3">
                  <span className="border px-3 py-1 rounded-md text-[13px] bg-green-100 border-green-500 text-green-700">
                    {row.due}
                  </span>
                </td>
                <td className="p-3 text-blue-600">{row.assigned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">Showing 1 – 1 of 1</p>
        <Button className="flex gap-2">
          <Download size={16} /> Download
        </Button>
      </div>
    </div>
  );
}
