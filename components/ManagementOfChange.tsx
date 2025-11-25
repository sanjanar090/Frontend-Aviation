"use client";

import React from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";

const PRIMARY_BLUE = "#126fd6";

interface MOCWorkflow {
  number: string;
  workflowTitle: string;
  workflowDefinition: string;
  workflowPhase: string;
  department: string;
  owner: string;
  currentStatus: string;
}

const mockMOCWorkflows: MOCWorkflow[] = [
  {
    number: "0004-MOC-01",
    workflowTitle:
      "Change of Competent Authority (EASA foreign country to FR OSAC)",
    workflowDefinition: "Generic Management of Change",
    workflowPhase: "Management Approval",
    department: "",
    owner: "Chiglien, Massimo",
    currentStatus: "In Progress",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const classes = `
    inline-flex items-center rounded px-2 py-1 text-xs font-medium
    ${
      status === "In Progress"
        ? "bg-[#DFF2E1] text-[#12845b]"
        : "bg-gray-200 text-gray-700"
    }
  `;
  return <span className={classes}>{status}</span>;
};

const Row = ({ workflow }: { workflow: MOCWorkflow }) => (
  <div className="grid grid-cols-12 items-center px-4 py-3 border-b text-sm hover:bg-gray-50">
    {/* Number + Title */}
    <div className="col-span-4">
      <div className="font-semibold">{workflow.number}</div>
      <div className="text-xs text-gray-600">{workflow.workflowTitle}</div>
    </div>

    <div className="col-span-2">{workflow.workflowDefinition}</div>
    <div className="col-span-2">{workflow.workflowPhase}</div>

    {/* Owner */}
    <div className="col-span-2">
      <div className="text-xs text-gray-500">Owner</div>
      <div className="font-medium">{workflow.owner}</div>
    </div>

    {/* Status */}
    <div className="col-span-2 flex justify-end">
      <StatusBadge status={workflow.currentStatus} />
    </div>
  </div>
);

const ManagementOfChange = () => {
  return (
    <div className="bg-[#F4F6F9] p-4 rounded-lg mt-4">
      <div className="bg-white border rounded shadow-sm overflow-hidden">
        {/* TABLE HEADERS */}
        <div className="grid grid-cols-12 bg-[#F0F2F5] text-[11px] font-semibold uppercase text-gray-600 border-b">
          <div className="col-span-4 py-3 px-4 flex items-center gap-1">
            Number <ChevronDown size={12} />
          </div>
          <div className="col-span-2 py-3 px-4 flex items-center gap-1">
            Workflow Definition <ChevronDown size={12} />
          </div>
          <div className="col-span-2 py-3 px-4 flex items-center gap-1">
            Workflow Phase <ChevronDown size={12} />
          </div>
          <div className="col-span-2 py-3 px-4">Department / Owner</div>
          <div className="col-span-2 py-3 px-4 flex justify-end gap-1">
            Current Status <ChevronDown size={12} />
          </div>
        </div>

        {/* PHASE HEADER */}
        <div className="flex items-center px-4 py-3 border-b font-semibold text-gray-800 text-sm bg-white">
          <ChevronRight size={16} className="text-gray-500 mr-2" />
          Phase: Management Approval (1)
        </div>

        {/* WORKFLOW ROWS */}
        {mockMOCWorkflows.map((wf, i) => (
          <Row key={i} workflow={wf} />
        ))}

        {/* FOOTER BUTTONS */}
        <div className="flex gap-4 p-4 bg-[#F7F7F7] border-t">
          <button
            className="flex items-center px-4 py-2 text-white font-semibold shadow
              rounded-md"
            style={{ backgroundColor: PRIMARY_BLUE }}
          >
            <Plus className="w-5 h-5 mr-2" />
            Start New Workflow
          </button>

          <button
            className="px-4 py-2 rounded-md font-semibold border bg-white"
            style={{ borderColor: PRIMARY_BLUE, color: PRIMARY_BLUE }}
          >
            Workflow Definitions
          </button>

          <button
            className="px-4 py-2 rounded-md font-semibold border bg-white"
            style={{ borderColor: PRIMARY_BLUE, color: PRIMARY_BLUE }}
          >
            Show Completed Workflows
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagementOfChange;
