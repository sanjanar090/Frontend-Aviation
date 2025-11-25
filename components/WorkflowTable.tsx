import React, { useState, useMemo } from 'react';
// Assuming Tailwind CSS is configured in the environment.
// Imports are adjusted for the single-file mandate by removing external component paths.
// In a real project, these would resolve to the actual components.

// --- Icon Imports from lucide-react ---
import { Calendar, Clock, Tag, User, Search, Download, Settings, ChevronDown } from "lucide-react";

// --- Mock UI Components (Simplified Shadcn/ui) ---

// Basic Card
const Card = ({ className = '', children, ...props }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);
const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);
const CardTitle = ({ className = '', children, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);
const CardContent = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Basic Badge
const Badge = ({ variant = 'default', className = '', children, ...props }) => {
  const baseStyle = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "text-foreground",
  };
  return (
    <div className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Basic Button
const Button = ({ variant = 'default', size = 'default', className = '', children, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Basic Input
const Input = ({ className = '', ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Basic Avatar (no image support, just fallback)
const Avatar = ({ className = '', children, ...props }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
    {children}
  </div>
);
const AvatarFallback = ({ className = '', children, ...props }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props}>
    {children}
  </div>
);

// Simplified Select Components (not fully functional dropdowns, just displaying triggers)
// For a fully functional component, one would use a proper library like radix-ui/react-select
const Select = ({ defaultValue, children }) => {
  // In a real app, this would handle state and open/close logic
  return <div className="relative inline-block">{children}</div>;
};
const SelectTrigger = ({ className = '', children, ...props }) => (
  <Button variant="outline" className={`justify-between ${className}`} {...props}>
    {children}
    <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
  </Button>
);
// Mock content for Select (not actual functional dropdown, just placeholders)
const SelectContent = ({ children }) => (
  <div className="hidden">{/* Dropdown content hidden for simplification */}</div>
);
const SelectItem = ({ value, children }) => <div data-value={value}>{children}</div>;
const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;


// --- Data ---
const workflowTasks = [
  {
    id: 1,
    task: "Complete step",
    title: "Air Senegal support in DSS airport for 9H-SZN - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval",
    dueDate: "",
    assignedTo: "Matko Dadic",
    initials: "MD"
  },
  {
    id: 2,
    task: "Complete step",
    title: "test3 - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval",
    dueDate: "",
    assignedTo: "Matko Dadic",
    initials: "MD"
  },
  {
    id: 3,
    task: "Complete action",
    title: "WKF-000043 - Update email signature with new approval number",
    dueDate: "19/08/2024",
    status: "overdue",
    assignedTo: "Matko Dadic",
    initials: "MD"
  },
  {
    id: 4,
    task: "Complete step",
    title: "Complete 2 steps for Change of Competent Authority (EASA foreign country to FR OSAC)",
    dueDate: "30/08/2024",
    status: "overdue",
    assignedTo: "Accountable Manager",
    initials: "AM"
  },
  {
    id: 5,
    task: "Complete step",
    title: "contract between DALE and XXX - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval",
    dueDate: "15/09/2025",
    status: "upcoming",
    assignedTo: "Matko Dadic",
    initials: "MD"
  },
  {
    id: 6,
    task: "Close action",
    title: "WKF-000049 - Workflow 01 Action",
    dueDate: "11/11/2025",
    status: "upcoming",
    assignedTo: "Matko Dadic",
    initials: "MD"
  }
];


// --- Main Component ---
export const WorkflowTable = () => {
  // Constants for Chart Data (matching the image)
  const allActionsCount = 20;
  const completedCount = 2;
  const overdueCount = 18;
  const completedRatio = completedCount / allActionsCount;
  const overdueRatio = overdueCount / allActionsCount;

  // Constants for Progress Bars (matching the image)
  const taskProgress = useMemo(() => ({
    // Data adjusted to match visual (Overdue: Red, Completed/Upcoming: Green, Total: 100%)
    // The image shows red (overdue) and green (upcoming/completed) segments
    'Complete step': { total: 4, overdue: 2, upcoming: 2, completed: 0 },
    'Complete action': { total: 1, overdue: 1, upcoming: 0, completed: 0 },
    'Close action': { total: 1, overdue: 0, upcoming: 1, completed: 0 },
  }), []);

  const getProgressStyles = (taskKey) => {
    const data = taskProgress[taskKey];
    if (!data) return [];

    const total = data.total;
    // Use Red for Overdue
    const overduePct = (data.overdue / total) * 100;
    // Use Green for Completed/Upcoming (combined for simplicity as per visual segmentation)
    const activePct = ((data.completed + data.upcoming) / total) * 100;
    
    // The visual uses specific hex colors to match the image
    return [
      { width: `${overduePct}%`, bg: 'bg-[#dc2626]' }, // Solid Red for Overdue
      { width: `${activePct}%`, bg: 'bg-[#16a34a]' }, // Solid Green for Completed/Upcoming
    ].filter(p => parseFloat(p.width) > 0);
  };
  
  // Custom Badge rendering logic for due dates, adjusted for solid color backgrounds
  const renderDueDateBadge = (task) => {
    if (!task.dueDate) return null;

    // Use specific colors from the image
    const redBg = "bg-[#dc2626]"; // Solid Red for Overdue
    const greenBg = "bg-[#16a34a]"; // Solid Green for Upcoming

    let className = "inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold transition-colors shadow-sm text-white";
    let styleClass = "";

    if (task.status === "overdue") {
        styleClass = redBg;
    } else if (task.status === "upcoming") {
        styleClass = greenBg;
    } else {
      // Fallback style if there's a date but no overdue/upcoming status set
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
          {task.dueDate}
        </Badge>
      );
    }

    return (
      <div className={`${className} ${styleClass}`}>
        {task.dueDate}
      </div>
    );
  };


  // Styles for the circular progress bar
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
  // Use specific hex colors for consistency
  const colorOverdue = '#ac1717'; // Red
  const colorCompleted = '#12845b'; // Green

  // The overdue segment starts at 0 offset (top)
  const overdueDashArray = circumference * overdueRatio;
  const overdueOffset = 0;

  // The completed segment starts after the overdue segment
  const completedDashArray = circumference * completedRatio;
  const completedOffset = -overdueDashArray; // Offset by the length of the overdue segment

  return (
    // Main container with scroll bar
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6 max-w-7xl mx-auto bg-gray-50">
        
        {/* Show settings button */}
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            className="gap-2 text-primary border-primary hover:bg-primary/5 hover:text-primary transition duration-150"
          >
            <Settings className="h-4 w-4" />
            Show settings
          </Button>
        </div>

        {/* Summary Cards - Changed lg:grid-cols-2 to md:grid-cols-2 for earlier side-by-side display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* All actions card */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
              <CardTitle className="text-lg font-semibold text-gray-700">All actions ({allActionsCount})</CardTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-2xl font-bold text-muted-foreground hover:bg-gray-100 p-0">
                <span className="inline-block leading-none -translate-y-[2px]">⋮⋮</span>
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center justify-around p-6">
              
              {/* Circular Chart */}
              <div className="relative flex items-center justify-center mb-6 sm:mb-0">
                <svg className="w-40 h-40 transform -rotate-90">
                  {/* Background circle (Muted) */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="#e5e7eb" // Light Gray
                    strokeWidth="20"
                    fill="none"
                  />
                  
                  {/* Overdue segment (Red) */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke={colorOverdue}
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${overdueDashArray} ${circumference}`}
                    strokeDashoffset={overdueOffset}
                    strokeLinecap="round"
                  />

                  {/* Completed segment (Green) - positioned after the overdue segment */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke={colorCompleted}
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${completedDashArray} ${circumference}`}
                    strokeDashoffset={completedOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold text-gray-800">{allActionsCount}</span>
                  <span className="text-sm text-muted-foreground">actions</span>
                </div>
              </div>
              
              {/* Legend */}
              <div className="space-y-3 pt-4 pr-10 text-left">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#16a34a] shadow-md"></div>
                  <span className="text-sm text-gray-700">Completed ({completedCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#dc2626] shadow-md"></div>
                  <span className="text-sm text-gray-700">Overdue ({overdueCount})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workflows card */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
              <CardTitle className="text-lg font-semibold text-gray-700">Workflows (0)</CardTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-2xl font-bold text-muted-foreground hover:bg-gray-100 p-0">
                <span className="inline-block leading-none -translate-y-[2px]">⋮⋮</span>
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8 h-full">
              <div className="w-32 h-32 mb-4 opacity-70">
                {/* Simplified Workflow Icon SVG */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="workflowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.2}} />
                      <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 0.05}} />
                    </linearGradient>
                  </defs>
                  {/* Document stack */}
                  <rect x="55" y="55" width="100" height="120" fill="#e0e7ff" rx="8" />
                  <rect x="50" y="50" width="100" height="120" fill="#f3f4f6" rx="8" />
                  <rect x="45" y="45" width="100" height="120" fill="url(#workflowGradient)" rx="8" stroke="#3b82f6" strokeWidth="2" opacity="0.8" />
                  {/* Magnifying Glass */}
                  <circle cx="120" cy="110" r="30" fill="white" stroke="#3b82f6" strokeWidth="4" />
                  <path d="M 140 130 L 165 155" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                  {/* Checkmarks/Lines */}
                  <rect x="65" y="60" width="50" height="8" fill="#9ca3af" opacity="0.5" rx="2" />
                  <rect x="65" y="80" width="30" height="6" fill="#9ca3af" opacity="0.3" rx="2" />
                  <circle cx="140" cy="60" r="8" fill="#16a34a" />
                </svg>
              </div>
              <p className="text-lg font-medium text-muted-foreground pt-4">No outstanding workflows</p>
            </CardContent>
          </Card>
        </div>

        {/* My Workflows tasks */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-700">My Workflows tasks</h2>
            {/* Total tasks (3) - Red/Destructive border */}
            <Badge 
              variant="outline" 
              className="rounded-full h-7 w-7 flex items-center justify-center border-[#dc2626] text-[#dc2626] font-bold bg-[#dc2626]/10"
            >
              3
            </Badge>
            {/* Overdue tasks (2) - Red background */}
            <Badge 
              variant="secondary" 
              className="rounded-full h-7 w-7 flex items-center justify-center bg-[#dc2626] text-white border-transparent"
            >
              2
            </Badge>
            {/* Upcoming tasks (1) - Green background */}
            <Badge 
              variant="secondary" 
              className="rounded-full h-7 w-7 flex items-center justify-center bg-[#16a34a] text-white border-transparent"
            >
              1
            </Badge>
          </div>

          {/* Progress bars */}
          <div className="space-y-3">
            {Object.entries(taskProgress).map(([task, data]) => {
              const progress = getProgressStyles(task);
              const totalSegmentsWidth = progress.reduce((acc, p) => acc + parseFloat(p.width), 0);
              const remainingWidth = 100 - totalSegmentsWidth;

              return (
                <div key={task} className="flex items-center gap-3">
                  <span className="text-sm w-36 sm:w-40 font-medium text-gray-600 shrink-0">{task}</span>
                  <div className="flex-1 flex h-6 rounded-full overflow-hidden border border-gray-200">
                    {/* Progress Segments */}
                    {progress.map((style, i) => (
                      <div
                        key={i}
                        style={{ width: style.width }}
                        className={`h-full ${style.bg}`}
                      ></div>
                    ))}
                    {/* Remaining Segment (if total < 100%) */}
                    {remainingWidth > 0 && (
                      <div 
                        style={{ width: `${remainingWidth}%` }} 
                        className="h-full bg-gray-200"
                      ></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl shadow-sm border mt-6">
          
          {/* Due date */}
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[170px] h-10 text-sm border-gray-300 hover:bg-gray-50">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <SelectValue placeholder="Due date: All time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
            </SelectContent>
          </Select>

          {/* Status */}
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[150px] h-10 text-sm border-gray-300 hover:bg-gray-50">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>

          {/* Task */}
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[150px] h-10 text-sm border-gray-300 hover:bg-gray-50">
              <Tag className="h-4 w-4 mr-2 text-primary" />
              <SelectValue placeholder="Task: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="complete-step">Complete step</SelectItem>
            </SelectContent>
          </Select>

          {/* Type */}
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[150px] h-10 text-sm border-gray-300 hover:bg-gray-50">
              <Tag className="h-4 w-4 mr-2 text-primary" />
              <SelectValue placeholder="Type: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="workflow">Workflow</SelectItem>
            </SelectContent>
          </Select>

          {/* Assigned to */}
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px] h-10 text-sm border-gray-300 hover:bg-gray-50">
              <User className="h-4 w-4 mr-2 text-primary" />
              <SelectValue placeholder="Assigned to: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="me">Me</SelectItem>
            </SelectContent>
          </Select>

          {/* Search bar */}
          <div className="flex-1 min-w-[240px] relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              className="pl-10 h-10 text-sm focus-visible:ring-primary border-gray-300"
            />
          </div>
        </div>


        {/* Tasks Table */}
        <div className="border rounded-xl overflow-x-auto shadow-lg bg-white">
          <table className="w-full table-auto min-w-[700px]">
            <thead className="bg-primary/5 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="text-left p-4 font-semibold text-sm text-gray-700 w-[15%] cursor-pointer hover:bg-primary/10 transition duration-150 whitespace-nowrap">
                  <div className="flex items-center gap-1">Task <ChevronDown className="h-3 w-3 inline" /></div>
                </th>
                <th className="text-left p-4 font-semibold text-sm text-gray-700 w-[50%] cursor-pointer hover:bg-primary/10 transition duration-150 whitespace-nowrap">
                  <div className="flex items-center gap-1">Title <ChevronDown className="h-3 w-3 inline" /></div>
                </th>
                <th className="text-left p-4 font-semibold text-sm text-gray-700 w-[15%] cursor-pointer hover:bg-primary/10 transition duration-150 whitespace-nowrap">
                  <div className="flex items-center gap-1">Due date <ChevronDown className="h-3 w-3 inline" /></div>
                </th>
                <th className="text-left p-4 font-semibold text-sm text-gray-700 w-[15%] cursor-pointer hover:bg-primary/10 transition duration-150 whitespace-nowrap">
                  <div className="flex items-center gap-1">Assigned to <ChevronDown className="h-3 w-3 inline" /></div>
                </th>
                <th className="w-[5%]"></th>
              </tr>
            </thead>
            <tbody>
              {workflowTasks.map((task, index) => (
                <tr 
                  key={task.id} 
                  className={`transition duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-primary/5 border-b border-gray-100`}
                >
                  <td className="p-4 text-sm text-gray-800 whitespace-nowrap">{task.task}</td>
                  <td className="p-4 text-sm text-gray-800 max-w-lg truncate">{task.title}</td>
                  <td className="p-4 whitespace-nowrap">
                    {renderDueDateBadge(task)}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                          {task.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700">{task.assignedTo}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground text-lg font-bold w-10 cursor-pointer text-center">›</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination and Download */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl shadow-sm border">
          
          <span className="text-sm text-muted-foreground mb-4 sm:mb-0 order-2 sm:order-1">
            Showing 1 - {workflowTasks.length} of {workflowTasks.length}
          </span>
          
          <div className="flex items-center gap-4 order-1 sm:order-2">
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 whitespace-nowrap">Items per page</span>
              <Select defaultValue="10">
                <SelectTrigger className="w-[70px] h-8 border-gray-300">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" className="gap-2 text-primary border-primary hover:bg-primary/5 hover:text-primary transition duration-150">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default WorkflowTable;