"use client";

import React from "react";
import {
  Calendar,
  Clock,
  Tag,
  User,
  X,
  ChevronRight,
} from "lucide-react";

// ----------------------
// TYPES
// ----------------------
/**
 * @interface Step
 * Represents a single action or task within a workflow.
 */
interface Step {
  num: string;
  title: string;
  role: string;
  dueDate: string;
  state: "To Do" | "Complete" | "Overdue";
}

/**
 * @interface Workflow
 * Represents a collection of steps, often with a dedicated workflow status and owner.
 */
interface Workflow {
  id: string;
  title: string;
  owner: string;
  dueDate: string;
  status:
    | "Workflow Complete"
    | "Workflow Overdue"
    | "Workflow In Progress"
    | string;
  header?: string; // section header like “Conclusion” that groups steps
  steps: Step[];
}

// ----------------------
// MOCK DATA
// ----------------------
const mockWorkflows: Workflow[] = [
  {
    id: "WKF-000045",
    title:
      "Change of Competent Authority (EASA foreign country to FR OSAC)",
    owner: "Chiglien, Massimo",
    dueDate: "30/08/2024",
    status: "Workflow Complete",
    header: "Conclusion",
    steps: [
      {
        num: "4.1",
        title: "Process verification results and mitigation (if any).",
        role: "Accountable Manager",
        dueDate: "30/08/2024",
        state: "To Do",
      },
      {
        num: "4.2",
        title: "Other",
        role: "Accountable Manager",
        dueDate: "30/08/2024",
        state: "To Do",
      },
    ],
  },
  {
    id: "WKF-000046",
    title: "contract between DALE and XXX",
    owner: "Karciauskiene, Modesta",
    dueDate: "15/09/2025",
    status: "Workflow Overdue",
    header:
      "Final Management review and approval (final draft had to be provided)",
    steps: [
      {
        num: "3.5",
        title: "Accountable Manager final review and approval",
        role: "Dadic, Matko",
        dueDate: "15/09/2025",
        state: "To Do",
      },
    ],
  },
  {
    id: "WKF-000047",
    title: "Air Senegal support in DSS airport for 9H-SZN",
    owner: "Dadic, Matko",
    dueDate: "",
    status: "Workflow In Progress",
    steps: [
      {
        num: "3.6",
        title: "Accountable Manager final review and approval",
        role: "Dadic, Matko",
        dueDate: "",
        state: "To Do",
      },
    ],
  },
];

// ----------------------
// STATUS BADGE COMPONENT
// ----------------------
/**
 * @component StatusBadge
 * Renders a colored badge based on the workflow status.
 */
const StatusBadge = ({ status }: { status: string }) => {
  let styles = "bg-gray-200 text-gray-700 border-gray-300";

  // Apply specific styles based on status
  if (status === "Workflow Complete") {
    styles = "bg-green-600 text-white";
  } else if (status === "Workflow Overdue") {
    styles = "bg-red-600 text-white";
  } else if (status === "Workflow In Progress") {
    // This style is seen in the image for "Workflow In Progress"
    styles = "bg-green-100 text-green-700 border-green-300";
  } else if (status === "Workflow Overdue") {
    // This style is seen in the image for "Workflow Overdue" in a step
    styles = "bg-red-100 text-red-700 border-red-300";
  }

  return (
    <span
      className={`px-3 py-1 border rounded-md text-xs font-semibold inline-flex ${styles}`}
    >
      {status}
    </span>
  );
};

// ----------------------
// MAIN COMPONENT: MY WORKFLOW STEPS
// ----------------------
/**
 * @component MyWorkflowSteps
 * Displays the list of workflow steps with filters and status.
 */
const MyWorkflowSteps = () => {
  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen"> 
      {/* Container with light gray background to mimic the app structure */}

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl shadow-sm border">

        {/* Filter Chip - Workflow Definition */}
        <div className="flex items-center gap-2 border p-2 rounded-md bg-gray-50 text-sm text-gray-700">
          <Tag className="h-4 w-4 text-blue-600" />
          Workflow Definition: All Workflows
        </div>

        {/* Filter Chip - Organise By */}
        <div className="flex items-center gap-2 border p-2 rounded-md bg-gray-50 text-sm text-gray-700">
          <Calendar className="h-4 w-4 text-blue-600" />
          Organise By: Step Due Date
        </div>

        {/* Filter Chip - Workflow Status */}
        <div className="flex items-center gap-2 border p-2 rounded-md bg-gray-50 text-sm text-gray-700">
          <Clock className="h-4 w-4 text-blue-600" />
          Workflow Status
        </div>

        {/* Filter Chip - Due Date */}
        <div className="flex items-center gap-2 border p-2 rounded-md bg-gray-50 text-sm text-gray-700">
          <Calendar className="h-4 w-4 text-blue-600" />
          Due Date: All
        </div>

        {/* Active Filter Badge (Closable) */}
        <div className="flex items-center gap-1 p-1 pr-3 bg-red-100 border border-red-300 rounded-full text-red-700 text-sm font-medium">
          Workflow Status: Overdue, Due in next 30 days...
          <X className="h-4 w-4 cursor-pointer" />
        </div>
      </div>

      {/* WORKFLOW LIST */}
      <div className="bg-white rounded-xl border shadow-lg overflow-hidden">

        {/* Table Header Row */}
        <div className="grid grid-cols-12 bg-gray-100 font-semibold text-sm text-gray-600 p-3 border-b border-gray-200">
          <div className="col-span-4">Workflow / Step</div>
          <div className="col-span-3">Owner</div>
          <div className="col-span-2">Due By</div>
          <div className="col-span-3">Status</div>
        </div>

        {/* Map through all mock workflows */}
        {mockWorkflows.map((wf, idx) => (
          <div key={wf.id || idx} className="border-b border-gray-100 last:border-b-0">

            {/* WORKFLOW HEADER ROW (Main Workflow Info) */}
            <div className={`grid grid-cols-12 items-center p-3 ${wf.status === "Workflow Complete" ? 'bg-green-50' : wf.status === "Workflow Overdue" ? 'bg-red-50' : 'bg-gray-50'}`}>
              <div className="col-span-4 font-semibold text-gray-900">
                Workflow: {wf.title}
              </div>
              <div className="col-span-3 text-gray-700">{wf.owner}</div>
              <div className="col-span-2 text-gray-700">{wf.dueDate}</div>
              <div className="col-span-3">
                <StatusBadge status={wf.status} />
              </div>
            </div>

            {/* SECTION HEADER (Grey bar for step grouping) */}
            {wf.header && (
              <div className="bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 border-b border-gray-300">
                {wf.header}
              </div>
            )}

            {/* Map through steps within the current workflow */}
            {wf.steps.map((step, sIdx) => (
              <div
                key={sIdx}
                className="grid grid-cols-12 items-center p-3 border-b border-gray-100 hover:bg-blue-50 transition-colors"
              >
                {/* Workflow / Step Title */}
                <div className="col-span-4 flex items-center gap-3">
                  <span className="text-gray-500 font-mono text-xs w-8 text-right">{step.num}</span>
                  <span className="text-gray-800">{step.title}</span>
                </div>

                {/* Owner Role */}
                <div className="col-span-3 flex items-center gap-2 text-gray-700 text-sm">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{step.role}</span>
                </div>

                {/* Due Date */}
                <div className="col-span-2 flex items-center gap-2 text-sm">
                  {step.dueDate ? (
                    <>
                      <Calendar className="h-4 w-4 text-red-600" />
                      <span className={`${step.state === 'Overdue' ? 'text-red-700 font-semibold' : 'text-gray-700'}`}>
                        {step.dueDate}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>

                {/* Step Status (To Do, Complete, Overdue) */}
                <div className="col-span-1">
                  {/* Using StatusBadge for consistency, though step statuses are simpler */}
                  <span className={`px-3 py-1 border rounded-md text-xs font-semibold inline-flex ${
                      step.state === "To Do" 
                        ? 'bg-gray-200 text-gray-700 border-gray-300' 
                        : step.state === "Overdue" 
                        ? 'bg-red-100 text-red-700 border-red-300' 
                        : 'bg-green-100 text-green-700 border-green-300'
                    }`}>
                      {step.state}
                  </span>
                </div>

                {/* Do Step Button */}
                <div className="col-span-2 flex justify-end">
                  <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md transition-colors shadow-md hover:shadow-lg">
                    <ChevronRight className="h-4 w-4" />
                    Do Step
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
        
        {/* Button to show completed workflows */}
        <div className="p-4 flex justify-center bg-white">
             <button className="text-blue-600 hover:text-blue-800 font-semibold border border-blue-600 hover:border-blue-800 px-4 py-2 rounded-lg transition-colors">
                Show Completed Workflows
            </button>
        </div>

      </div>
    </div>
  );
};

export default MyWorkflowSteps;