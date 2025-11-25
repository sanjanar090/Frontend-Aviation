"use client";

import React from "react";

const WorkflowsPage = () => {
  // DATA EXACTLY LIKE THE SCREENSHOTS
  const rows = [
    {
      code: "1",
      name: "Centrik Implementation",
      dept: "(all)",
      done: 0,
      workflow: "",
      started: "",
      due: "",
      status: "",
    },
    {
      code: "ADM-001",
      name: "Contracts",
      dept: "Contract Signing Group",
      done: 0,
      workflow: "contract between DALE and XXX",
      started: "08/09/2025",
      due: "15/09/2025",
      status: "Overdue",
    },
    {
      code: "",
      name: "",
      dept: "",
      done: "",
      workflow: "Air Senegal support in DSS airport for 9H-SZN",
      started: "29/10/2025",
      due: "",
      status: "In Progress",
    },
    {
      code: "",
      name: "",
      dept: "",
      done: "",
      workflow: "TEST",
      started: "08/09/2025",
      due: "",
      status: "In Progress",
    },
    {
      code: "",
      name: "",
      dept: "",
      done: "",
      workflow: "test3",
      started: "29/10/2025",
      due: "",
      status: "In Progress",
    },

    // SECOND TABLE SECTION
    {
      code: "ERP-001",
      name:
        "ERP-001 Emergency Response Plan workflow (Dale Aviation Station)",
      dept: "(all)",
      done: 0,
      workflow: "",
      started: "",
      due: "",
      status: "",
    },
    {
      code: "ERP-002",
      name:
        "ERP-002 Emergency Response Plan workflow (Operators ERP activated)",
      dept: "(all)",
      done: 0,
      workflow: "",
      started: "",
      due: "",
      status: "",
    },
    {
      code: "ORG-002",
      name: "Testing Workflow",
      dept: "Management Team",
      done: 0,
      workflow: "",
      started: "",
      due: "",
      status: "",
    },

    // THIRD SECTION
    {
      code: "SAG-01",
      name: "Safety Action Group meeting",
      dept: "Safety",
      done: 1,
      workflow: "",
      started: "",
      due: "",
      status: "",
    },

    {
      code: "WF-001",
      name: "Certification Authorisation issue 01",
      dept: "Compliance Monitoring",
      done: 5,
      workflow: "Haafedh HARBAOUI",
      started: "14/10/2024",
      due: "18/10/2024",
      status: "Overdue",
    },

    { code: "", name: "", dept: "", done: "", workflow: "Antonio DIAS (B1.1+SMW)", started: "16/09/2024", due: "20/09/2024", status: "Overdue" },

    { code: "", name: "", dept: "", done: "", workflow: "Joao SILVA - B1 A320 ,A330, A340", started: "08/07/2024", due: "", status: "In Progress" },

    { code: "", name: "", dept: "", done: "", workflow: "Marko HRVOJEVIC (B2)", started: "23/09/2024", due: "", status: "In Progress" },

    { code: "", name: "", dept: "", done: "", workflow: "Rudy VIARDOT", started: "17/06/2024", due: "", status: "In Progress" },

    {
      code: "WF-002",
      name: "Certification Authorization renewal",
      dept: "Compliance Monitoring",
      done: 10,
      workflow: "Bruno BAKSAJ DA-017",
      started: "06/08/2024",
      due: "10/08/2024",
      status: "Overdue",
    },
  ];

  const departments = [
    "(all)",
    "Safety",
    "Compliance Monitoring",
    "Management Team",
    "Maintenance & Engineering",
  ];

  const [department, setDepartment] = React.useState("(all)");

  const filtered =
    department === "(all)"
      ? rows
      : rows.filter((r) => r.dept === department);

  return (
    <div className="bg-white border rounded-md shadow-sm p-6">

      {/* FILTER */}
      <div className="mb-5">
        <label className="text-sm font-semibold block mb-1">Department</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border rounded px-3 py-2 text-sm bg-gray-50"
        >
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="border rounded overflow-hidden">
        <div className="grid grid-cols-12 bg-[#F0F2F5] text-gray-600 uppercase text-xs font-semibold border-b p-3">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Department</div>
          <div className="col-span-1 text-center">Done</div>
          <div className="col-span-2">Workflow</div>
          <div className="col-span-1">Started On</div>
          <div className="col-span-1">Due On</div>
          <div className="col-span-1 text-right">Status</div>
        </div>

        <div className="max-h-[65vh] overflow-auto">
          {filtered.map((r, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 p-4 border-b text-sm hover:bg-gray-50"
            >
              <div className="col-span-1">{r.code}</div>
              <div className="col-span-3 whitespace-pre-line">{r.name}</div>
              <div className="col-span-2 whitespace-pre-line">{r.dept}</div>
              <div className="col-span-1 text-center">{r.done}</div>

              {/* Multi-line workflow */}
              <div className="col-span-2 whitespace-pre-line">{r.workflow}</div>

              <div className="col-span-1">{r.started}</div>
              <div className="col-span-1">{r.due}</div>

              {/* STATUS BADGES EXACT LIKE CENTRIK */}
              <div className="col-span-1 flex justify-end">
                {r.status === "In Progress" && (
                  <span className="border border-[#9CD9B6] bg-[#E5F7EC] text-[#1A9A49] px-3 py-1 rounded text-sm">
                    In Progress
                  </span>
                )}
                {r.status === "Overdue" && (
                  <span className="border border-[#f2c6c6] bg-[#FBECEC] text-[#C93B3B] px-3 py-1 rounded text-sm">
                    Overdue
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* BOTTOM BUTTONS LIKE IMAGE */}
          <div className="p-6 flex justify-between items-center bg-white">
            <button className="bg-[#126FD6] text-white px-5 py-2 rounded shadow text-sm flex items-center gap-2">
              + Define new Workflow
            </button>

            <button className="border-[#126FD6] text-[#126FD6] border px-5 py-2 rounded text-sm">
              Include Archived
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowsPage;
