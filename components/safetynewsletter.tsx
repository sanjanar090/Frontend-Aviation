"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function SafetyNewsletters() {
  const [statusFilter, setStatusFilter] = useState("Active Safety Newsletters");

  const newsletters = [
    { id: 17, status: "New", title: "Safety Newsletter No 17 NEW AIRBUS MAINTENANCE BRIEFING NOTE", date: "20/06/2024" },
    { id: 16, status: "New", title: "Safety Newsletter No 16 Asbestos requirements", date: "30/05/2024" },
    { id: 15, status: "New", title: "Safety Newsletter No 15 SMS in Dale Aviation", date: "17/05/2024" },
    { id: 13, status: "New", title: "Safety Newsletter No 13 EASA Safety Week 2024", date: "26/04/2024" },
    { id: 12, status: "New", title: "Safety Newsletter No 12 Critical task", date: "25/03/2024" },
    { id: 11, status: "New", title: "Safety Newsletter No 11 Smartlynx Safety Bulletin 03.2024", date: "21/03/2024" },
    { id: 10, status: "New", title: "Safety Newsletter No 10 Raising Awareness on Unattended Baggage", date: "12/03/2024" },
    { id: 9, status: "New", title: "Safety Newsletter No 09 VOE INFOGRAPHY ON REPORTING", date: "02/02/2024" },
    { id: 4, status: "New", title: "Safety Newsletter No 04 Suspected Unapproved Parts – AOG Technics Limited", date: "16/08/2023" },
    { id: 3, status: "New", title: "Safety Newsletter No 03 Hangar Cleanliness standard", date: "15/07/2023" },
    { id: 1, status: "New", title: "Safety Newsletter No 01 Drain Mast Occurrence report", date: "19/04/2023" },
    { id: 19, status: "Read", title: "safety assurance", date: "14/11/2025" },
  ];

  return (
    <div className="p-6 space-y-6">


      {/* Filters */}
      <div className="flex gap-4">
        {/* Dropdown */}
        <div className="relative">
          <button className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
            {statusFilter}
            <ChevronDown size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center border rounded-md px-3 py-2 bg-white w-64">
          <Search size={18} className="text-gray-500 mr-2" />
          <input type="text" placeholder="Search for documents..." className="outline-none flex-1" />
        </div>

        <button className="bg-blue-600 text-white px-4 rounded-md">Search</button>
        <button className="border px-4 rounded-md">All</button>
      </div>

      {/* Table */}
      <div className="border rounded-md bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="p-3">Status</th>
              <th className="p-3">Number</th>
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Download</th>
              <th className="p-3">Actions</th>
              <th className="p-3">Track</th>
              <th className="p-3">?</th>
            </tr>
          </thead>

          <tbody>
            {newsletters.map((n) => (
              <tr key={n.id} className="border-t hover:bg-gray-50">

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-md border ${
                      n.status === "New"
                        ? "border-red-500 text-red-600 bg-red-50"
                        : "border-green-600 text-green-700 bg-green-50"
                    }`}
                  >
                    {n.status}
                  </span>
                </td>

                <td className="p-3">{n.id}</td>

                <td className="p-3 text-blue-600 cursor-pointer hover:underline">
                  {n.title}
                </td>

                <td className="p-3">{n.date}</td>

                <td className="p-3">
                  <button className="border rounded-md px-3 py-1">PDF</button>
                </td>

                <td className="p-3">
                  <button className="border rounded-md px-3 py-1">Edit</button>
                </td>

                <td className="p-3">
                  <button className="border rounded-md px-3 py-1">Track</button>
                </td>

                <td className="p-3">
                  <button className="border rounded-md px-3 py-1">?</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          + Create Safety Newsletter
        </button>

        <button className="border px-4 py-2 rounded-md">
          Track Safety Newsletters
        </button>

        <button className="border px-4 py-2 rounded-md">
          Manage Distribution
        </button>
      </div>
    </div>
  );
}
