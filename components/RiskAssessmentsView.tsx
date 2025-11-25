import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRight, Download, Plus } from "lucide-react";

// --- Components for Navigation Bar ---

// Nav item component for the top bar
const NavItem = ({ name, count, isActive }) => (
    <div 
        className={`px-4 py-3 text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 
        ${isActive 
            ? 'border-b-2 border-blue-600 text-blue-600 bg-white' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        {name}
        {count !== undefined && (
            <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-2 py-0.5 rounded-full text-xs font-normal">
                {count}
            </Badge>
        )}
    </div>
);

// Main Navigation Bar component
const TopNavigationBar = () => (
    <div className="flex bg-gray-50 border-b border-gray-200 shadow-sm w-full">
        <NavItem name="Dashboard" />
        <NavItem name="My risk assessments" isActive />
        <NavItem name="Assessments" count={16} />
        <NavItem name="Drafts" count={9} />
        <NavItem name="Actions" count={2} />
        <NavItem name="Heatmap" />
        <NavItem name="Risk matrix" />
        <NavItem name="Residual risk" />
        <NavItem name="Templates" />
    </div>
);

// Helper function for badge colors (using Tailwind CSS color variants)
const getRiskColorClasses = (riskLevel) => {
    // Map status/risk to appropriate colors
    const status = riskLevel ? riskLevel.toLowerCase() : '';
    switch (status) {
        case 'secure':
            // Green for Secure/Low
            return "bg-green-100 text-green-700 border border-green-300"; 
        case 'monitor':
            // Blue for Monitor/Planned
            return "bg-blue-100 text-blue-700 border border-blue-300"; 
        case 'high':
            // Red for High/Critical
            return "bg-red-100 text-red-700 border border-red-300"; 
        case 'medium':
            // Yellow/Amber for Medium/Warning
            return "bg-yellow-100 text-yellow-700 border border-yellow-300"; 
        case 'in progress':
            // Green for In Progress (Matching the image)
            return "bg-green-100 text-green-700 border border-green-300";
        case 'complete':
            // Darker green for Complete
            return "bg-emerald-100 text-emerald-700 border border-emerald-300";
        case 'draft':
            // Gray/Muted for Draft
            return "bg-gray-100 text-gray-700 border border-gray-300";
        default:
            // Grey for '-' or default (info/info is usually light blue)
            return "bg-gray-100 text-gray-600 border border-gray-300"; 
    }
};

// --- Assessment Data (unchanged) ---
const assessments = [
  {
    number: "03",
    name: "Aircraft services",
    department: "(all)",
    nextDue: "16/01/2026",
    currentRisk: {
      overall: "Secure",
      highestScore: "-",
      actions: "-",
    },
    plannedRisk: {
      overall: "Monitor",
      highestScore: "-",
    },
    riskControlQuality: "-",
    status: "In Progress",
    statusIndicator: "D",
  },
  {
    number: "12",
    name: "IT Infrastructure Risk",
    department: "Technology",
    nextDue: "01/05/2025",
    currentRisk: {
      overall: "Medium",
      highestScore: "8/10",
      actions: "2",
    },
    plannedRisk: {
      overall: "Secure",
      highestScore: "2/10",
    },
    riskControlQuality: "C",
    status: "Complete",
    statusIndicator: "A",
  },
  {
    number: "07",
    name: "Financial Reporting Compliance",
    department: "Finance",
    nextDue: "30/09/2025",
    currentRisk: {
      overall: "High",
      highestScore: "9/10",
      actions: "5",
    },
    plannedRisk: {
      overall: "Medium",
      highestScore: "7/10",
    },
    riskControlQuality: "B",
    status: "Draft",
    statusIndicator: "I",
  },
];

export const RiskAssessmentsView = () => {
  return (
    // Outer container to mimic the full app screen layout
    <div className="min-h-screen bg-gray-100 pb-10">
      
      {/* 1. Top Navigation Bar */}
      

      {/* 2. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

        {/* Filter Section - Adjusted for side-by-side input and button */}
        <div className="bg-white rounded-lg p-6 border shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            
            {/* Input Group Container - Use flex to keep input and button inline */}
            <div className="flex flex-col flex-1 w-full sm:w-auto sm:max-w-md">
              <label className="text-sm text-gray-700 mb-2 block font-normal">
                Risk Assessments For:
              </label>
              <div className="flex w-full"> {/* Inner flex container for input and button */}
                <Input
                  defaultValue="Dadic, Matko"
                  // Removed rounded-r-none and border-r-0 to allow the button to connect visually
                  className="flex-grow w-full h-10 border-blue-300 " 
                />
                {/* Button is now attached to the right of the input */}
                <Button 
                    variant="outline" 
                    // Removed vertical margin classes (mt-0 sm:mt-6) and set fixed width
                    className="h-10 w-24 text-blue-600 border-blue-600 hover:bg-blue-50 rounded-l-none border-l-0"
                >
                    Show
                </Button>
              </div>
            </div>

            {/* Empty div for spacing or other elements if needed, but removed original button's wrapper */}

          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
          {/* Table Container */}
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-muted/50 border-b">
                  <TableHead className="font-semibold text-xs min-w-[80px]">Number ▼</TableHead>
                  <TableHead className="font-semibold text-xs min-w-[200px]">Name ▼</TableHead>
                  <TableHead className="font-semibold text-xs min-w-[150px]">Department ▼</TableHead>
                  <TableHead className="font-semibold text-xs min-w-[120px]">Next Due ▼</TableHead>
                  {/* Current Risk - Combined Header */}
                  <TableHead colSpan={3} className="text-center font-semibold border-r text-xs bg-gray-100">
                    Current Risk
                  </TableHead>
                  {/* Planned Risk - Combined Header */}
                  <TableHead colSpan={2} className="text-center font-semibold border-r text-xs bg-gray-100">
                    Planned Risk
                  </TableHead>
                  <TableHead className="font-semibold text-center text-xs min-w-[150px]">
                    Risk Control Quality Indicator
                  </TableHead>
                  <TableHead className="font-semibold text-xs min-w-[150px]">Status ▼</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
                {/* Secondary Header Row */}
                <TableRow className="bg-muted/30 border-b">
                  <TableHead colSpan={4}></TableHead>
                  <TableHead className="text-center text-xs text-muted-foreground border-r border-gray-200">Overall ▼</TableHead>
                  <TableHead className="text-center text-xs text-muted-foreground border-r border-gray-200">Highest Score ▼</TableHead>
                  <TableHead className="text-center text-xs text-muted-foreground border-r">Actions ▼</TableHead>
                  <TableHead className="text-center text-xs text-muted-foreground border-r border-gray-200">Overall ▼</TableHead>
                  <TableHead className="text-center text-xs text-muted-foreground border-r">Highest Score ▼</TableHead>
                  <TableHead colSpan={3}></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((assessment, idx) => (
                  <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-sm">{assessment.number}</TableCell>
                    <TableCell className="font-medium text-sm text-primary hover:underline cursor-pointer">{assessment.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{assessment.department}</TableCell>
                    <TableCell>
                      {/* Next Due */}
                      <Badge variant="outline" className={getRiskColorClasses('in progress')}> 
                        {assessment.nextDue}
                      </Badge>
                    </TableCell>
                    {/* Current Risk */}
                    <TableCell className="text-center border-r border-gray-100">
                      <Badge variant="outline" className={getRiskColorClasses(assessment.currentRisk.overall)}>
                        {assessment.currentRisk.overall}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center border-r border-gray-100">
                      <Badge variant="outline" className={getRiskColorClasses(assessment.currentRisk.highestScore)}>
                        {assessment.currentRisk.highestScore}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center border-r">
                      <Badge variant="outline" className={getRiskColorClasses(assessment.currentRisk.actions)}>
                        {assessment.currentRisk.actions}
                      </Badge>
                    </TableCell>
                    {/* Planned Risk */}
                    <TableCell className="text-center border-r border-gray-100">
                      <Badge variant="outline" className={getRiskColorClasses(assessment.plannedRisk.overall)}>
                        {assessment.plannedRisk.overall}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center border-r">
                      <Badge variant="outline" className={getRiskColorClasses(assessment.plannedRisk.highestScore)}>
                        {assessment.plannedRisk.highestScore}
                      </Badge>
                    </TableCell>
                    {/* Quality and Status */}
                    <TableCell className="text-center font-semibold text-sm">
                      {assessment.riskControlQuality === '-' ? (
                        <span className='text-muted-foreground'>{assessment.riskControlQuality}</span>
                      ) : (
                        <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30 font-bold">{assessment.riskControlQuality}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getRiskColorClasses(assessment.status)}>
                          {assessment.status}
                        </Badge>
                        {/* Status Indicator (D/A/I) */}
                        <div className="w-6 h-6 bg-gray-600 text-white rounded flex items-center justify-center text-xs font-bold shadow">
                          {assessment.statusIndicator}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <button className="p-1 hover:bg-muted rounded transition-colors">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Action Buttons (Moved out of table container and styled to match image) */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white gap-3">
             <Button className="gap-2 w-full sm:w-auto shadow-md transition-all hover:shadow-lg bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Add Risk Assessment
              </Button>
              {/* Download button moved to the right side to match the image */}
              <Button variant="outline" className="gap-2 w-full sm:w-auto transition-all hover:bg-muted/50 text-blue-600 border-blue-600 hover:text-blue-700">
                <Download className="h-4 w-4" />
                Download
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentsView;