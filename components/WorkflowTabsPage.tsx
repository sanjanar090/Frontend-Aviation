"use client";
import React, { useState, useRef, useEffect, useMemo, useCallback,FC } from "react";
import { FileSpreadsheet, FileText } from "lucide-react";
import { ChevronDown } from "lucide-react";


interface Task {
  task: string;
  title: string;
  date: string;
  assigned: string;
  isOverdue: boolean;
}

interface FilterDropdownProps {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  selectedOption: string;
  className?: string;
}

interface FilterItemProps {
  label: string;
  value?: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}



// --- UI Component Stubs (Simulating Shadcn/ui look and behavior with Tailwind) ---

const Badge: React.FC<{ variant: "secondary" | "default"; className?: string; children: React.ReactNode }> = ({ variant, className = "", children }) => {
  let baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  if (variant === "secondary") {
    baseClasses += " bg-gray-200 text-gray-700 hover:bg-gray-300";
  } else if (variant === "default") {
    baseClasses += " bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
  return <span className={`${baseClasses} ${className}`}>{children}</span>;
};

// Minimal Tabs implementation used in this single-file example
const Tabs: React.FC<React.PropsWithChildren<{ defaultValue?: string; className?: string }>> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const TabsList: React.FC<React.PropsWithChildren<{ className?: string; onClick?: (value: string) => void }>> = ({ children, className = "", onClick, ...props }) => (
  <div className={`flex border-b border-gray-200 ${className}`} {...props}>
    {React.Children.map(children, child =>
      React.isValidElement(child) ? React.cloneElement(child, { onClick: onClick }) : child
    )}
  </div>
);

const TabsTrigger: React.FC<React.PropsWithChildren<{ value: string; className?: string; onClick?: (value: string) => void; activeTab?: string }>> = ({ value, className = "", children, onClick, activeTab, ...props }) => (
  <button
    onClick={() => onClick && onClick(value)}
    className={`px-4 py-3 text-sm font-medium transition-all duration-150 ease-in-out whitespace-nowrap
      ${activeTab === value
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-600 hover:text-gray-800'
      } ${className}`}
    {...props}
  >
    {children}
  </button>
);

const TabsContent: React.FC<React.PropsWithChildren<{ value: string; activeTab: string; className?: string }>> = ({ value, children, activeTab, className = "", ...props }) => (
  <div className={`${activeTab === value ? 'block' : 'hidden'} ${className}`} {...props}>
    {children}
  </div>
);

// --- Page Component Stubs for Other Tabs ---
const PlaceholderContent: React.FC<{ title: string }> = ({ title }) => (
  <div className="p-4 text-gray-700">{title}</div>
);

const MyWorkflowSteps: React.FC = () => <PlaceholderContent title="My Workflow Steps" />;
const ManagementOfChange: React.FC = () => <PlaceholderContent title="Management of Change" />;
const WorkflowsPage: React.FC = () => <PlaceholderContent title="Workflows" />;

// ---------------------------------------------------------------- //
// 🎯 Reusable Filter Dropdown Component
// ---------------------------------------------------------------- //

const FilterDropdown: React.FC<FilterDropdownProps> = ({ title, icon, content, selectedOption, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const caretIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
         className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="flex items-center justify-between border border-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition min-w-[120px]"
      >
        <span className="flex items-center">
          {icon}
          <span className="truncate">{selectedOption || title}</span>
        </span>
        {caretIcon}
      </button>

      {isOpen && (
        <div className="absolute z-30 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl origin-top-right right-0 md:left-0 p-3">
          {content}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------- //
// 🎯 Mock Data
// ---------------------------------------------------------------- //
const tasks: Task[] = [
  {
    task: "Complete step",
    title: "Air Senegal support in DSS airport for 9H-SZN - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval",
    date: "N/A",
    assigned: "Matko Dadic",
    isOverdue: false,
  },
  {
    task: "Complete step",
    title: "test3 - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval",
    date: "N/A",
    assigned: "Matko Dadic",
    isOverdue: false,
  },
  {
    task: "Complete action",
    title: "WKF-000043 - Update email signature with new approval number",
    date: "19/08/2024",
    assigned: "Matko Dadic",
    isOverdue: true, 
  },
  {
    task: "Complete step",
    title: "Complete 2 steps for Change of Competent Authority (EASA foreign country to FR OSAC)",
    date: "30/08/2024",
    assigned: "Accountable Manager",
    isOverdue: true, 
  },
  {
    task: "Complete step",
    title: "contract between DALE and XXX - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval",
    date: "15/09/2025",
    assigned: "Matko Dadic",
    isOverdue: true, 
  },
  {
    task: "Close action",
    title: "WKF-000049 - Workflow 01 Action",
    date: "11/11/2025",
    assigned: "Matko Dadic",
    isOverdue: false, 
  },
];
// ---------------------------------------------------------------- //

// ---------------------------------------------------------------- //
// 🎯 CORRECTED ICON HELPER FUNCTION
// ---------------------------------------------------------------- //

const getIcon = (children: React.ReactNode): JSX.Element => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="mr-2 text-gray-500"
  >
    {children}
  </svg>
);

// ---------------------------------------------------------------- //
// 🎯 Filter Item Helpers
// ---------------------------------------------------------------- //

const FilterCheckboxItem: React.FC<FilterItemProps> = ({ label, count, checked, onChange }) => (
  <label className="flex items-center p-1 rounded-md hover:bg-gray-100 cursor-pointer text-sm text-gray-800 transition">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mr-2"
    />
    <span className="truncate">{label}</span>
    {count !== undefined && <span className="ml-auto text-xs font-semibold text-gray-500">({count})</span>}
  </label>
);

const FilterRadioItem: React.FC<FilterItemProps> = ({ label, value, checked, onChange }) => (
  <label className="flex items-center p-1 rounded-md hover:bg-gray-100 cursor-pointer text-sm text-gray-800 transition">
    <input
      type="radio"
      name="dueDate"
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-2"
    />
    {label}
  </label>
);

// ---------------------------------------------------------------- //
// 🎯 Filter Content Components (Now fully typed)
// ---------------------------------------------------------------- //

interface FiltersState {
  dueDate: string;
  status: string[];
  task: string[];
  type: string[];
  assignedTo: string[];
}
type SetFiltersType = React.Dispatch<React.SetStateAction<FiltersState>>;

const DueDateFilterContent: React.FC<{ filters: FiltersState; setFilters: SetFiltersType }> = ({ filters, setFilters }) => (
  <div className="flex flex-col space-y-1">
    {[
      { label: "All time", value: "All time" },
      { label: "Date set", value: "Date set" },
      { label: "No date set", value: "No date set" },
      { label: "Overdue", value: "Overdue" },
      { label: "Next 7 days", value: "Next 7 days" },
      { label: "Next 14 days", value: "Next 14 days" },
      { label: "Next 30 days", value: "Next 30 days" },
      { label: "Custom", value: "Custom" },
    ].map(option => (
      <FilterRadioItem 
        key={option.value}
        label={option.label}
        value={option.value}
        checked={filters.dueDate === option.value}
        onChange={() => setFilters({...filters, dueDate: option.value})}
      />
    ))}

    <div className="pt-2 border-t border-gray-100 mt-2 flex flex-wrap gap-2 text-xs">
      <div className="flex gap-4 w-full">
        <div className="w-1/2">
          <label className="block text-gray-600 mb-1">From</label>
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="From" 
              className="w-full border border-gray-300 p-2 rounded-lg pr-8 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 absolute right-2 pointer-events-none"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          </div>
        </div>

        <div className="w-1/2">
          <label className="block text-gray-600 mb-1">To</label>
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="To" 
              className="w-full border border-gray-300 p-2 rounded-lg pr-8 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 absolute right-2 pointer-events-none"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StatusFilterContent: React.FC<{ filters: FiltersState; setFilters: SetFiltersType }> = ({ filters, setFilters }) => (
  <div className="flex flex-col space-y-1">
    { ["Open", "Overdue", "Completed"].map(status => (
      <FilterCheckboxItem
        key={status}
        label={status}
        checked={filters.status.includes(status)}
        onChange={() => {
          const newStatus = filters.status.includes(status)
            ? filters.status.filter(s => s !== status)
            : [...filters.status, status];
          setFilters({...filters, status: newStatus});
        }}
      />
    )) }
  </div>
);

const TaskFilterContent: React.FC<{ filters: FiltersState; setFilters: SetFiltersType }> = ({ filters, setFilters }) => (
  <div className="flex flex-col space-y-1">
    {["Complete step", "Complete action", "Close action"].map(task => (
      <FilterCheckboxItem
        key={task}
        label={task}
        checked={filters.task.includes(task)}
        onChange={() => {
          const newTask = filters.task.includes(task)
            ? filters.task.filter(t => t !== task)
            : [...filters.task, task];
          setFilters({...filters, task: newTask});
        }}
      />
    ))}
  </div>
);

const TypeFilterContent: React.FC<{ filters: FiltersState; setFilters: SetFiltersType }> = ({ filters, setFilters }) => (
  <div className="flex flex-col space-y-1">
    {["Workflow Item", "Action", "Assigned action"].map(type => (
      <FilterCheckboxItem
        key={type}
        label={type}
        checked={filters.type.includes(type)}
        onChange={() => {
          const newType = filters.type.includes(type)
            ? filters.type.filter(t => t !== type)
            : [...filters.type, type];
          setFilters({...filters, type: newType});
        }}
      />
    ))}
  </div>
);

const AssignedToFilterContent: React.FC<{ filters: FiltersState; setFilters: SetFiltersType }> = ({ filters, setFilters }) => (
  <div className="flex flex-col space-y-1">
    {[
      { label: "Role: Accountable Manager", value: "Accountable Manager" },
      { label: "User: Matko Dadic", value: "Matko Dadic" },
    ].map(user => (
      <FilterCheckboxItem
        key={user.value}
        label={user.label}
        checked={filters.assignedTo.includes(user.value)}
        onChange={() => {
          const newAssignedTo = filters.assignedTo.includes(user.value)
            ? filters.assignedTo.filter(u => u !== user.value)
            : [...filters.assignedTo, user.value];
          setFilters({...filters, assignedTo: newAssignedTo});
        }}
      />
    ))}
  </div>
);

// ---------------------------------------------------------------- //
// 🎯 Main Component
// ---------------------------------------------------------------- //

export const WorkflowTabsPage: React.FC = () => {
  
  const [showConfig, setShowConfig] = useState(false);
  

  const [isOpen, setIsOpen] = useState(false);
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isOrganiseOpen, setIsOrganiseOpen] = useState(false); 
  const [isStatusOpen, setIsStatusOpen] = useState(false); 
  // --- STATE FOR DUE DATE FILTER ---
const [showDateRange, setShowDateRange] = useState(false);
const [dateFrom, setDateFrom] = useState(''); // Current value in the input fields
const [dateTo, setDateTo] = useState('');     // Current value in the input fields

// State to store the *applied* filter values
const [appliedDateFrom, setAppliedDateFrom] = useState('');
const [appliedDateTo, setAppliedDateTo] = useState('');

// --- HANDLER FUNCTIONS ---

// Toggles the visibility of the date range inputs
const handleDateFilterClick = () => {
    setShowDateRange((prev) => !prev);
};

// Handles input changes
const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
}

// Handles the Apply button click
const handleDateApply = () => {
    setAppliedDateFrom(dateFrom); // Apply current input values
    setAppliedDateTo(dateTo);
    setShowDateRange(false);      // Close the dropdown
};

// Handles the Clear button click
const handleDateClear = () => {
    setDateFrom('');
    setDateTo('');
    setAppliedDateFrom(''); // Clear applied state
    setAppliedDateTo('');   // Clear applied state
    // Keep the dropdown open or close it, depending on desired UX (keeping it open here)
    // setShowDateRange(false); 
}

// Generates the label for the main filter button
const getDateButtonLabel = () => {
    if (appliedDateFrom || appliedDateTo) {
        // Format the date string for display
        const fromPart = appliedDateFrom ? `From: ${appliedDateFrom}` : 'From: Any';
        const toPart = appliedDateTo ? `To: ${appliedDateTo}` : 'To: Any';
        return `${fromPart} / ${toPart}`;
    }
    return "Due Date: All";
};
    // State to hold the currently selected statuses. Initialized to an empty array, so nothing is selected by default.
    const [selectedStatuses, setSelectedStatuses] = useState([]); 
    
    
    // Toggle function for the dropdown button
    const handleToggleStatus = () => {
        // Only toggle if we're clicking the main area, not the X button
        setIsStatusOpen(!isStatusOpen);
    };

    // Handler for checkbox changes
    const handleStatusChange = (e) => {
        const { value, checked } = e.target;
        setSelectedStatuses(prev => 
            checked
                ? [...prev, value]
                : prev.filter(status => status !== value)
        );
    };

    // Handler to clear all selections
    const handleClearSelection = () => {
        setSelectedStatuses([]);
    };
    
    // Handler for removing the entire filter tag (the X button)
    const handleRemoveFilter = (e) => {
        e.stopPropagation(); // Prevents this click from opening the dropdown
        // In a real app, you would remove this filter entirely from the parent state.
        console.log("Filter removed.");
    }
    
    // Helper to determine the button label
    const getButtonLabel = () => {
        if (selectedStatuses.length === 0) return "Workflow Status: Overdue, Due in next 30 days or...";
        if (selectedStatuses.length === 1) {
            // Capitalize the first letter for display
            const label = selectedStatuses[0].replace(/-/g, ' ');
            return `Workflow Status: ${label.charAt(0).toUpperCase() + label.slice(1)}`;
        }
        return `Workflow Status: ${selectedStatuses.length} selected`;
    };

    // Toggle function for the Organise By dropdown
    const handleToggleOrganise = () => {
        setIsOrganiseOpen(!isOrganiseOpen);
    };
  const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

  const [filters, setFilters] = useState<FiltersState>({
    dueDate: "All time",
    status: [],
    task: [],
    type: [],
    assignedTo: [],
  });

  const DonutChart: React.FC<{ totalActions: number; overduePercent: number; onTimePercent: number }> = ({ totalActions, overduePercent, onTimePercent }) => (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-[10px] border-gray-200"></div>
<div
  className="absolute inset-0 rounded-full"
  style={{
    background: `conic-gradient(
      #ac1717 0% ${overduePercent}%,
      #12845b ${overduePercent}% ${overduePercent + onTimePercent}%,
      #e5e7eb ${overduePercent + onTimePercent}% 100%
    )`,
    WebkitMask: "radial-gradient(circle, transparent 55px, white 56px)",
    mask: "radial-gradient(circle, transparent 55px, white 56px)",
    border: "2px solid white",
  }}
></div>


      <div className="relative z-10 text-center">
        <div className="text-3xl font-bold text-gray-900">{totalActions}</div>
        <div className="text-sm text-gray-500">actions</div>
      </div>
    </div>
  );
  

  return (
    <div className="bg-gray-50 px-6 py-6 min-h-screen font-sans">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="bg-white rounded-t-lg shadow-sm border-b-0 p-0" onClick={setActiveTab}>
          <TabsTrigger value="dashboard" activeTab={activeTab}>Dashboard</TabsTrigger>
          <TabsTrigger value="myworkflowsteps" activeTab={activeTab} className="flex items-center gap-2">
            My workflow steps
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-bold">5</Badge>
          </TabsTrigger>
          <TabsTrigger value="management" activeTab={activeTab}>Management of change</TabsTrigger>
          <TabsTrigger value="workflows" activeTab={activeTab}>Workflows</TabsTrigger>
          <TabsTrigger value="actions" activeTab={activeTab} className="flex items-center gap-2">
            Actions
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-bold">20</Badge>
          </TabsTrigger>
        </TabsList>
<TabsContent value="dashboard" activeTab={activeTab} className="mt-6">
  <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
    
    {/* ✨ MODIFIED: "Show settings" button with blue background, white text, and blue border */}
  {/* SETTINGS BUTTON */}
<div className="flex justify-end mb-4 pr-4">
  {/* WRAPPER THAT AUTO-CLOSES ON OUTSIDE CLICK */}
  <div className="relative group">

    {/* BUTTON */}
    <button
      onClick={() => setShowConfig(!showConfig)}
      className="flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-lg text-blue-600 border border-blue-400 bg-white hover:bg-blue-50 transition"
    >
      <svg
  width="18"
  height="18"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <circle cx="12" cy="12" r="3" />
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0c.3.63.95 1 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
</svg>

      Show settings
    </button>

    {/* POPUP */}
    {showConfig && (
      <div
        className="
          absolute right-0 mt-2 bg-white shadow-xl rounded-xl p-4 border w-64 z-50
          group-focus-within:block
        "
      >
        <h3 className="text-lg font-semibold mb-3">Dashboard Config</h3>

        {/* ITEM 1 */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="text-gray-400 cursor-grab">⋮⋮</div>
            <span className="text-gray-700">All actions</span>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-600 transition"></div>
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full border transition peer-checked:translate-x-5"></div>
          </label>
        </div>

        <hr />

        {/* ITEM 2 */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div className="text-gray-400 cursor-grab">⋮⋮</div>
            <span className="text-gray-700">Workflows</span>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-600 transition"></div>
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full border transition peer-checked:translate-x-5"></div>
          </label>
        </div>
      </div>
    )}
  </div>
</div>


    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ALL ACTIONS */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            All actions ({tasks.length})
          </h2>
          <button className="text-gray-400 hover:text-gray-600 transition">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-10">
          <DonutChart
            totalActions={20}
            overduePercent={90}
            onTimePercent={10}
            colorOverdue="#ac1717"
            colorOnTime="#12845b"
          />

          <div className="text-base space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full shadow-inner"
                style={{ backgroundColor: "#12845b" }}
              ></span>
              <span className="text-gray-700">Completed (2)</span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full shadow-inner"
                style={{ backgroundColor: "#ac1717" }}
              ></span>
              <span className="text-gray-700">Overdue (18)</span>
            </div>
          </div>
        </div>
      </div>

      {/* WORKFLOWS */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col items-start justify-start min-h-[168px]">
        <div className="flex justify-between items-start w-full mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Workflows (0)</h2>
          <button className="text-gray-400 hover:text-gray-600 transition">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-start flex-grow w-full py-4 space-x-4">
          <div className="min-w-[150px] min-h-[150px] flex items-center justify-center">
            <img
              src="https://dale-aviation-test.centrik.net/Images/v5/error-states/empty-state-document.svg"
              alt="Empty state"
              className="w-[140px] h-[140px] object-contain -mt-16"
            />
          </div>
          <div className="text-lg text-gray-600">No outstanding workflows</div>
        </div>
      </div>

    </div>

    {/* MY WORKFLOW TASKS */}
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        My Workflows tasks
      </h2>

      {/* BARS */}
      <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm">

        <div className="flex flex-col flex-1 min-w-[300px]">
          <div className="text-gray-700 mb-2 font-medium">Complete step</div>
          <div className="h-2 flex w-full rounded-full overflow-hidden shadow-inner bg-gray-200">
            <div style={{ backgroundColor: "#ac1717", width: "60%" }}></div>
            <div style={{ backgroundColor: "#12845b", width: "40%" }}></div>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-[300px]">
          <div className="text-gray-700 mb-2 font-medium">Complete action</div>
          <div className="h-2 flex w-full rounded-full overflow-hidden shadow-inner bg-gray-200">
            <div style={{ backgroundColor: "#ac1717", width: "33.3%" }}></div>
            <div style={{ backgroundColor: "#12845b", width: "66.7%" }}></div>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-[300px]">
          <div className="text-gray-700 mb-2 font-medium">Close action</div>
          <div className="h-2 flex w-full rounded-full overflow-hidden shadow-inner bg-gray-200">
            <div style={{ backgroundColor: "#12845b", width: "100%" }}></div>
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap justify-between items-center gap-4 mt-8 pt-4 border-t border-gray-100">

        <div className="flex flex-wrap gap-3 text-sm z-20">

          {/* DUE DATE FILTER */}
          <FilterDropdown
            title="Due date: All time"
            icon={getIcon(
              <>
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </>
            )}
            // Updated to use the variable and ensure no blue text in the filter dropdown
            selectedOption={`Due date: ${filters.dueDate}`}
            content={<DueDateFilterContent filters={filters} setFilters={setFilters} />}
          />

          {/* STATUS FILTER */}
          <FilterDropdown
            title="Status: All"
            icon={getIcon(
              <>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                <path d="M22 8V2L16 8" />
              </>
            )}
            // Updated to be more concise and match the image-like style (non-blue)
            selectedOption={`Status: ${
              filters.status.length === 0 || filters.status.length === 3
                ? "All"
                : filters.status.join(", ")
            }`}
            content={<StatusFilterContent filters={filters} setFilters={setFilters} />}
            className="min-w-[150px]"
          />

          {/* TASK FILTER */}
          <FilterDropdown
            title="Task: All"
            icon={getIcon(
              <>
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </>
            )}
            selectedOption={`Task: ${
              filters.task.length === 0 || filters.task.length === 3
                ? "All"
                : filters.task.join(", ")
            }`}
            content={<TaskFilterContent filters={filters} setFilters={setFilters} />}
            className="min-w-[150px]"
          />

          {/* TYPE FILTER */}
          <FilterDropdown
            title="Type: All"
            icon={getIcon(
              <>
                <path d="M12 2H2v10l10 10 10-10L12 2z" />
                <path d="M7 7h.01" />
              </>
            )}
            selectedOption={`Type: ${
              filters.type.length === 0 || filters.type.length === 3
                ? "All"
                : filters.type.join(", ")
            }`}
            content={<TypeFilterContent filters={filters} setFilters={setFilters} />}
            className="min-w-[150px]"
          />

          {/* ASSIGNED TO FILTER */}
          <FilterDropdown
            title="Assigned to: All"
            icon={getIcon(
              <>
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </>
            )}
            // Updated to ensure only one selection is displayed (or "All") and is not blue
            selectedOption={`Assigned to: ${
              filters.assignedTo.length === 1
                ? filters.assignedTo[0]
                : "All"
            }`}
            content={<AssignedToFilterContent filters={filters} setFilters={setFilters} />}
            className="min-w-[150px]"
          />

        </div>

        {/* SEARCH */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search tasks..."
            className="border border-gray-300 p-2 pl-10 rounded-lg text-sm w-full md:w-48 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
          />
        </div>

      </div>
    </div>

    {/* TABLE */}
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-8 overflow-x-auto">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr className="text-left bg-gray-50 border-b border-gray-200">
            <th className="py-3 px-3 font-semibold text-gray-600 whitespace-nowrap">Task</th>
            <th className="py-3 px-3 font-semibold text-gray-600">Title</th>
            <th className="py-3 px-3 font-semibold text-gray-600 whitespace-nowrap">Due date</th>
            <th className="py-3 px-3 font-semibold text-gray-600 whitespace-nowrap">Assigned to</th>
            <th className="py-3 px-3 font-semibold text-gray-600 w-1"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {/* I'm assuming 'tasks' array is correctly defined and contains the necessary data */}
          {tasks.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition duration-150">
              <td className="py-3 px-3 text-gray-800 whitespace-nowrap">{item.task}</td>

              <td className="py-3 px-3 text-gray-800 max-w-lg">{item.title}</td>

              <td className="py-3 px-3 whitespace-nowrap">
                {item.date !== "N/A" ? (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      item.isOverdue
                        ? 'bg-[#f8d2d2] text-[#ac1717]'      // custom RED
                        : 'bg-[#d9f4ec] text-[#12845b]'      // custom GREEN
                    }`}
                  >
                    {item.date}
                  </span>
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </td>

              {/* ASSIGNED TO IN THE TABLE: Changed from text-blue-600 to text-gray-800 to match the image's black text for all other columns, but keeping the initial circle and text style. */}
              <td className="py-3 px-3 text-gray-800 whitespace-nowrap font-medium flex items-center">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2 font-bold">
                  {item.assigned.charAt(0)}
                </div>
                {item.assigned}
              </td>

              <td className="py-3 px-3 text-gray-500 cursor-pointer font-bold transition-transform hover:translate-x-0.5">
                {">"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FOOTER */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t border-gray-100 text-sm text-black-600 text-bold">
        <div className="mb-2 sm:mb-0">
          Showing <span className="font-semibold">1</span> –{" "}
          <span className="font-semibold">{tasks.length}</span> of{" "}
          <span className="font-semibold">{tasks.length}</span>
        </div>


        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">

          
          {/* RIGHT CONTROLS */}
          <div className="flex flex-col items-start gap-4">

            {/* ITEMS PER PAGE */}
            <div className="flex items-center gap-2">
              <div>Items per page</div>
              <select className="border border-gray-300 p-3 bg-gray-200 shadow-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>

            {/* DOWNLOAD BUTTON (Outlined, Icon Blue, Text Blue) */}
            <div className="relative group ml-auto">
              {/* DOWNLOAD BUTTON */}
              <button
                className="flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-md 
                        border border-blue-400 text-blue-600 bg-white
                        hover:bg-blue-50 transition shadow-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download
              </button>

              {/* HOVER MENU ABOVE RIGHT */}
              <div
                className="absolute bottom-full mb-2 right-0 hidden group-hover:flex
                        flex-col w-60 bg-white border shadow-xl rounded-xl p-4 z-50"
              >
                <h3 className="font-semibold text-gray-900 mb-3">Downloads Available</h3>

                {/* Excel */}
                <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600">
                  {/* FileSpreadsheet icon - assumed available or placeholder */}
                  {/* <FileSpreadsheet className="w-5 h-5" /> */}
                  <span>Excel</span>
                </div>

                {/* PDF */}
                <div className="flex items-center gap-3 py-2 cursor-pointer hover:text-blue-600">
                  {/* FileText icon - assumed available or placeholder */}
                  {/* <FileText className="w-5 h-5" /> */}
                  <span>PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</TabsContent>
 
<TabsContent value="management" activeTab={activeTab} className="mt-6">
  <div className="mt-4">
    <div className="min-w-full text-sm">
      {/* Table Headers (simulated using flex for better control over the data row below) */}
      <div className="text-left text-sm text-gray-600  bg-gray-100 font-medium border-b flex py-2 text-xs tracking-wider">
        <div className="px-3 w-40 flex items-center">
          Number
          <span className="ml-1 text-xs">&#9660;</span>
        </div>
        <div className="px-3 flex-1 flex items-center">
          Workflow
          <span className="ml-1 text-xs">&#9660;</span>
        </div>
        <div className="px-3 flex-1 flex items-center">
          Workflow Definition
          <span className="ml-1 text-xs">&#9660;</span>
        </div>
        <div className="px-3 w-52 flex items-center">
          Workflow Phase
        </div>
        {/* Adjusted width for Department */}
        <div className="px-3 w-28 flex items-center">
          Department
        </div>
        <div className="px-3 w-40 flex items-center">
          Owner
        </div>
        {/* Adjusted width for Current Status */}
        <div className="px-3 w-32 flex items-center">
          Current Status
        </div>
      </div>
      
      {/* Phase Row */}
      <div className="bg-gray-100 py-1 px-3 text-sm text-gray-700 mt-1 flex items-center border-b">
        <span className="text-gray-600 font-medium flex items-center gap-1">
          {/* Arrow/Triangle Icon */}
          <span className="text-sm">&#9660;</span> 
          Phase:
        </span>
        Management Approval (1)
      </div>

      {/* Workflow Data Row */}
      <div className="py-3 px-1 text-sm flex items-center border-b mt-1">
        <span className="px-3 w-40 text-sm">0004-MOC-01</span>

        <span className="px-3 flex-1 text-sm">
          Change of Competent Authority (EASA foreign country to FR OSAC)
        </span>

        <span className="px-3 flex-1 text-sm">
          Generic Management of Change
        </span>

        <span className="px-3 w-52 text-sm">
          Management Approval
        </span>
        
        {/* Department data cell (Blank/Missing in image) */}
        <span className="px-3 w-28">
          {/* Empty cell to align columns */}
        </span>

        <span className="px-3 w-40">
          Chiglien, Massimo
        </span>

        {/* Status badge */}
        <span className="px-3 w-32">
          <span className="bg-[#e6f3ed] text-[#12845b] border border-[#12845b] text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">
            In Progress
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" className="w-4 h-4 text-[#12845b]">
              <path d="M569.584 416.768L297.808 30.696c-8.912-15.432-29.232-15.432-38.144 0L6.416 416.768C-2.496 432.2 8.016 448 25.04 448h525.92c17.024 0 27.536-15.8 18.624-31.232zm-281.824-30.88c0 7.84-6.384 14.224-14.224 14.224s-14.224-6.384-14.224-14.224V257.92c0-7.84 6.384-14.224 14.224-14.224s14.224 6.384 14.224 14.224v127.968zm-14.224 67.072c-9.088 0-16.48-7.392-16.48-16.48s7.392-16.48 16.48-16.48 16.48 7.392 16.48 16.48-7.392 16.48-16.48 16.48z"/>
            </svg>
          </span>
        </span>
      </div>

      {/* Action Buttons Container - UPDATED to push the middle group towards the center */}
     <div className="flex items-center mt-6">
  {/* Left Button Group (Start New Workflow) */}
  <button className="bg-[#2563eb] hover:bg-[#1d4ed8] transition duration-150 text-white px-4 py-2 rounded-md flex items-center gap-2 font-medium">
    <span className="text-xl leading-none">+</span> Start New Workflow
  </button>

  {/* Center Button Group (New container to hold the two buttons and justify them center) */}
  <div className="flex flex-1 justify-center gap-4"> 
    <button className="border border-[#2563eb] hover:border-[#1d4ed8] transition duration-150 text-[#2563eb] hover:text-[#1d4ed8] px-4 py-2 rounded-md font-medium">Workflow Definitions</button>
    <button className="border border-[#2563eb] hover:border-[#1d4ed8] transition duration-150 text-[#2563eb] hover:text-[#1d4ed8] px-4 py-2 rounded-md font-medium">Show Completed Workflows</button>
  </div>
  
  {/* Add an empty flexible element to push the center group over and keep it centered relative to the whole container width */}
  <div className="w-40"></div> 
</div>
    </div>
  </div>
</TabsContent>
<TabsContent value="myworkflowsteps" activeTab={activeTab} className="mt-4">
  {/* SCROLLABLE WRAPPER */}
  <div className="overflow-y-auto max-h-[85vh] bg-white border border-gray-200 rounded-md shadow-sm">
    
    {/* FILTER BAR SECTION */}
    <div className="p-4 border-b border-gray-200">
      <div className="flex flex-wrap gap-4 items-center">
        
        {/* START: Custom Workflow Definition Dropdown/Submenu (Click-Controlled) */}
        {/* NOTE: You need to manage the 'isOpen' state and conditional class application */}
       <div className="relative">
            {/* Dropdown Button/Trigger */}
            <button 
                className="flex items-center border border-gray-300   font-medium rounded-md px-3 py-1.5 text-sm bg-gray-50 shadow-sm appearance-none focus:border-blue-500 focus:ring-blue-500"
                onClick={handleToggleDropdown} // 👈 ATTACHED
                aria-expanded={isOpen}         // 👈 LINKED
            >
                Workflow Definition: All workflows
                
                {/* Arrow rotates based on the open/closed state */}
                <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} // 👈 LINKED
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Submenu Content - Conditional Visibility */}
            <div 
                // 👈 3. Submenu visibility linked to the 'isOpen' state
                className={`absolute z-10 mt-1 w-72 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isOpen ? 'block' : 'hidden'}`}
                role="menu" 
                aria-orientation="vertical" 
                aria-labelledby="workflow-definition-menu-button"
            >
                <div className="p-4 space-y-3">
                    
                    {/* Option 1: All workflows (Selected) */}
                    <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                        <input type="radio" name="workflow-definition" value="all" defaultChecked className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <span>All workflows</span>
                    </label>

                    {/* Option 2: ADM-001 - Contracts */}
                    <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                        <input type="radio" name="workflow-definition" value="ADM-001" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <span>ADM-001 - Contracts</span>
                    </label>

                    {/* Option 3: MOC-01 - Generic Management of Change */}
                    <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                        <input type="radio" name="workflow-definition" value="MOC-01" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                        <span>MOC-01 - Generic Management of Change</span>
                    </label>
                </div>

                {/* Apply Button */}
                <div className="p-4 pt-0">
                    <button 
                        className="w-full justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        // Add your filter/apply handler here
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
        {/* END: Custom Workflow Definition Dropdown/Submenu */}
        
       <div className="relative">
            {/* Dropdown Button/Trigger */}
            <button 
                className="flex items-center border border-gray-300 font-medium rounded-md px-3 py-1.5 text-sm bg-gray-50 shadow-sm appearance-none focus:border-blue-500 focus:ring-blue-500"
                onClick={handleToggleOrganise} // ATTACHED
                aria-expanded={isOrganiseOpen} // LINKED
            >
                Organise By: Step Due Date
                
                {/* Arrow rotates based on the open/closed state */}
                <svg 
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOrganiseOpen ? 'rotate-180' : ''}`} // LINKED
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Submenu Content - Conditional Visibility */}
            <div 
                // Submenu visibility linked to the 'isOrganiseOpen' state
                className={`absolute z-10 mt-1 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isOrganiseOpen ? 'block' : 'hidden'}`}
                role="menu" 
                aria-orientation="vertical" 
                aria-labelledby="organise-by-menu-button"
            >
                <div className="p-4 space-y-3">
                    
                    {/* Option 1: Step Due Date (Selected) */}
                    <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                        <input 
                            type="radio" 
                            name="organise-by" 
                            value="step-due-date" 
                            defaultChecked 
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span>Step Due Date</span>
                    </label>

                    {/* Option 2: Workflow */}
                    <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                        <input 
                            type="radio" 
                            name="organise-by" 
                            value="workflow" 
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span>Workflow</span>
                    </label>
                </div>

                {/* Apply Button */}
                <div className="p-4 pt-0">
                    <button 
                        className="w-full justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        // Add your apply handler here
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
        <div className="relative inline-block">
            {/* The main filter tag container */}
            <div className="flex items-center border border-gray-300 rounded-md text-sm bg-gray-50 shadow-sm">
                
                {/* Custom Button/Trigger mimicking the select input (This handles opening the menu) */}
                <button
                    className="flex items-center px-3 py-1.5 appearance-none bg-transparent outline-none focus:ring-0"
                    onClick={handleToggleStatus}
                    aria-expanded={isStatusOpen}
                >
                    {/* The label dynamically updates based on selection */}
                    <span className="font-medium text-gray-700">{getButtonLabel()}</span>
                    
                    {/* Arrow icon */}
                    <svg 
                        className={`w-4 h-4 ml-2 transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                
                {/* Close 'x' button (Now a sibling to the main trigger button) */}
                <button 
                    className="text-gray-500 hover:text-gray-700 p-1 mr-1"
                    onClick={handleRemoveFilter} // Use the separate handler
                    aria-label="Remove filter"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>


            {/* Dropdown Submenu Content - Conditional Visibility */}
            <div 
                // Submenu visibility linked to the 'isStatusOpen' state
                className={`absolute z-20 mt-1 w-72 origin-top-left rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none ${isStatusOpen ? 'block' : 'hidden'}`}
                role="menu" 
                aria-orientation="vertical" 
            >
                <div className="p-4 space-y-3">
                    
                    {/* Checkbox Options */}
                    {[
                        { label: "Overdue", value: "overdue" },
                        { label: "Due in next 30 days", value: "due-in-next-30-days" },
                        { label: "Due after 30 days", value: "due-after-30-days" },
                        { label: "Completed", value: "completed" },
                    ].map(({ label, value }) => (
                        <label key={value} className="flex items-center space-x-3 text-sm text-gray-700 cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="workflow-status" 
                                value={value} 
                                checked={selectedStatuses.includes(value)}
                                onChange={handleStatusChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span>{label}</span>
                        </label>
                    ))}
                </div>

                {/* Apply and Clear Buttons */}
                <div className="p-4 flex justify-between space-x-2 border-t border-gray-100">
                    <button 
                        className="w-1/2 justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleToggleStatus} // Close after applying
                    >
                        Apply
                    </button>
                    <button 
                        className="w-1/2 justify-center inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={handleClearSelection} // Clear button functionality
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
        {/* START: DUE DATE FILTER (Matches standard filter style) */}
<div className="relative inline-block">
    {/* 1. The main button/trigger that displays the current filter state */}
    <button
        className="flex items-center border border-gray-300 font-medium rounded-md px-3 py-1.5 text-sm bg-gray-50 shadow-sm appearance-none focus:border-blue-500 focus:ring-blue-500"
        onClick={handleDateFilterClick}
        aria-expanded={showDateRange}
        aria-controls="date-filter-submenu"
    >
        <span className="font-medium text-gray-700">{getDateButtonLabel()}</span>
        
        <svg
            className={`w-4 h-4 ml-1 transition-transform duration-200 ${showDateRange ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    </button>

    {/* 2. The submenu (Date Range Inputs and Buttons) - Conditional Visibility */}
    {showDateRange && (
        <div
            id="date-filter-submenu"
            // --- MODIFIED CLASSES HERE ---
            // origin-top-right: Makes the dropdown expand from its top-right corner.
            // right-0: Aligns the right edge of the dropdown with the right edge of its parent button.
            className="absolute z-20 mt-1 p-4 bg-white border border-gray-200 rounded-lg shadow-xl min-w-80 origin-top-right right-0"
            role="menu"
        >
            {/* Inputs */}
            <div className="flex space-x-4 mb-4">
                {/* From Input */}
                <div>
                    <label htmlFor="dateFrom" className="text-sm font-semibold text-gray-700">From</label>
                    <div className="relative mt-1">
                        <input
                            id="dateFrom"
                            type="date"
                            placeholder="From"
                            value={dateFrom}
                            onChange={(e) => handleDateChange(e, setDateFrom)}
                            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* To Input */}
                <div>
                    <label htmlFor="dateTo" className="text-sm font-semibold text-gray-700">To</label>
                    <div className="relative mt-1">
                        <input
                            id="dateTo"
                            type="date"
                            placeholder="To"
                            value={dateTo}
                            onChange={(e) => handleDateChange(e, setDateTo)}
                            className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 justify-between">
                <button 
                    onClick={handleDateApply} // Closes and applies filter
                    className="w-1/2 justify-center inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Apply
                </button>
                <button
                    onClick={handleDateClear} // Clears inputs/state
                    className="w-1/2 justify-center inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Clear
                </button>
            </div>
        </div>
    )}
</div>
{/* END: DUE DATE FILTER */}
      </div>
    </div>
    
    {/* WORKFLOW STEP LIST SECTION (rest of the code remains the same) */}
    <div className="p-4 space-y-2 text-sm">
      
      {/* Table Header / Column Labels */}
      <div className="grid grid-cols-12 gap-4 text-gray-500 font-medium pb-2 border-b">
          <div className="col-span-5">Workflow / Step</div>
          <div className="col-span-3">Owner</div>
          <div className="col-span-2">Due By</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1"></div> {/* Action column */}
      </div>

      {/* --- WORKFLOW 1: Workflow Complete (Change of Competent Authority) --- */}
      <div className="pt-2">
        <div className="grid grid-cols-12 gap-4 items-center py-2 text-gray-700">
          <div className="col-span-5 font-semibold">Workflow: Change of Competent Authority (EASA foreign countr...</div>
          <div className="col-span-3">Chiglien, Massimo</div>
          <div className="col-span-2">30/08/2024</div>
          <div className="col-span-1">
            {/* Workflow Complete Tag */}
            <span className="px-2 py-0.5 text-xs rounded-md font-bold border" style={{backgroundColor: '#f8d2d2', color: '#ac1717', borderColor: '#ac171780'}}>Workflow Complete</span>
          </div>
          <div className="col-span-1"></div>
        </div>
        
        {/* CONCLUSION ROW: BACKGROUND COLOR APPLIED (rgba(36,45,65,.2)) */}
        <div className="grid grid-cols-12 gap-4 items-center p-2 my-1" style={{backgroundColor: 'rgba(36,45,65,.2)'}}>
          <div className="col-span-5 font-medium">Conclusion</div>
          <div className="col-span-6 text-gray-700"></div>
          <div className="col-span-1 flex justify-end">
              {/* MOC tag style */}
              <span className="text-xs font-semibold text-gray-700 border border-gray-400 px-1 py-0.5 rounded" style={{backgroundColor: '#e5e7eb'}}>MOC</span>
          </div>
        </div>

        {/* Step 4.1: To Do */}
        <div className="grid grid-cols-12 gap-4 items-center py-2">
          <div className="col-span-5 border border-gray-300 rounded-md py-1.5 px-3 bg-white">4.1 Process verification results and mitigation (if any).</div>
          <div className="col-span-3 text-gray-600 border border-gray-300 rounded-md py-1.5 px-3 bg-white">Role: Accountable Manager</div>
          <div className="col-span-2 flex items-center text-gray-800 border border-gray-300 rounded-md py-1.5 px-3 bg-white">
            30/08/2024
            <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <div className="col-span-1 text-gray-700">To Do</div>
          <div className="col-span-1 flex justify-end">
            {/* BUTTON WITH NEW COLOR AND PADDING */}
            <button className="flex items-center space-x-1 px-4 py-1.5 rounded-md text-white text-[10px] font-semibold shadow-md" style={{backgroundColor: '#126fd6'}}>
               <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
               <span>Do Step</span>
            </button>
          </div>
        </div>
        
        {/* Step 4.2: Other */}
        <div className="grid grid-cols-12 gap-4 items-center py-2">
          <div className="col-span-5 border border-gray-300 rounded-md py-1.5 px-3 bg-white">4.2 Other</div>
          <div className="col-span-3 text-gray-600 border border-gray-300 rounded-md py-1.5 px-3 bg-white">Role: Accountable Manager</div>
          <div className="col-span-2 flex items-center text-gray-800 border border-gray-300 rounded-md py-1.5 px-3 bg-white">
            30/08/2024
            <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <div className="col-span-1 text-gray-700">To Do</div>
          <div className="col-span-1 flex justify-end">
            {/* BUTTON WITH NEW COLOR AND PADDING */}
            <button className="flex items-center space-x-1 px-4 py-1.5 rounded-md text-white text-[10px] font-semibold shadow-md" style={{backgroundColor: '#126fd6'}}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              <span>Do Step</span>
            </button>
          </div>
        </div>
      </div>
      
      <hr className="my-2 border-gray-100" /> {/* Subtle separator */}

      {/* --- WORKFLOW 2: Workflow Overdue (contract between DALE and XXX) --- */}
      <div className="pt-2">
        <div className="grid grid-cols-12 gap-4 items-center py-2 text-gray-700">
          <div className="col-span-5 font-semibold">Workflow: contract between DALE and XXX</div>
          <div className="col-span-3">Karciauskiene, Modesta</div>
          <div className="col-span-2">15/09/2025</div>
          <div className="col-span-1">
            {/* Workflow Overdue Tag */}
            <span className="px-2 py-0.5 text-xs rounded-md font-bold border" style={{backgroundColor: '#f8d2d2', color: '#ac1717', borderColor: '#ac171780'}}>Workflow Overdue</span>
          </div>
          <div className="col-span-1"></div>
        </div>
        
        {/* FINAL MANAGEMENT REVIEW ROW: BACKGROUND COLOR APPLIED (rgba(36,45,65,.2)) */}
        <div className="p-2 my-1 text-gray-700 font-medium" style={{backgroundColor: 'rgba(36,45,65,.2)'}}>
          Final Management review and approval (final draft had to be provided)
        </div>

        {/* Step 3.5: To Do */}
        <div className="grid grid-cols-12 gap-4 items-center py-2">
          <div className="col-span-5 border border-gray-300 rounded-md py-1.5 px-3 bg-white">3.5 Accountable Manager final review and approval</div>
          <div className="col-span-3 text-gray-600 border border-gray-300 rounded-md py-1.5 px-3 bg-white">Dadic, Matko</div>
          <div className="col-span-2 flex items-center text-gray-800 border border-gray-300 rounded-md py-1.5 px-3 bg-white">
            15/09/2025
            <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <div className="col-span-1 text-gray-700">To Do</div>
          <div className="col-span-1 flex justify-end">
            {/* BUTTON WITH NEW COLOR AND PADDING */}
            <button className="flex items-center space-x-1 px-4 py-1.5 rounded-md text-white text-[10px] font-semibold shadow-md" style={{backgroundColor: '#126fd6'}}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              <span>Do Step</span>
            </button>
          </div>
        </div>
      </div>
      
      <hr className="my-2 border-gray-100" /> {/* Subtle separator */}
      
      {/* --- WORKFLOW 3: Workflow In Progress (Air Senegal) --- */}
      <div className="pt-2">
        <div className="grid grid-cols-12 gap-4 items-center py-2 text-gray-700">
          <div className="col-span-5 font-semibold">Workflow: Air Senegal support in DSS airport for 9H-SZN</div>
          <div className="col-span-3"></div>
          <div className="col-span-2"></div>
          <div className="col-span-1">
            {/* Workflow In Progress Tag */}
            <span className="px-2 py-0.5 text-xs rounded-md font-bold border" style={{backgroundColor: '#d9f4ec', color: '#12845b', borderColor: '#12845b80'}}>Workflow In Progress</span>
          </div>
          <div className="col-span-1"></div>
        </div>

        {/* Step 3.6: To Do (Air Senegal) */}
        <div className="grid grid-cols-12 gap-4 items-center py-2">
          <div className="col-span-5 border border-gray-300 rounded-md py-1.5 px-3 bg-white">3.6 Accountable Manager final review and approval</div>
          <div className="col-span-3 text-gray-600 border border-gray-300 rounded-md py-1.5 px-3 bg-white">Dadic, Matko</div>
          <div className="col-span-2 flex items-center border border-gray-300 rounded-md py-1.5 px-3 bg-white">
            <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <div className="col-span-1 text-gray-700">To Do</div>
          <div className="col-span-1 flex justify-end">
            {/* BUTTON WITH NEW COLOR AND PADDING */}
            <button className="flex items-center space-x-1 px-4 py-1.5 rounded-md text-white text-[10px] font-semibold shadow-md" style={{backgroundColor: '#126fd6'}}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              <span>Do Step</span>
            </button>
          </div>
        </div>
      </div>
      
      <hr className="my-2 border-gray-100" /> {/* Subtle separator */}

      {/* --- WORKFLOW 4: Workflow In Progress (test3) --- */}
      <div className="pt-2">
        <div className="grid grid-cols-12 gap-4 items-center py-2 text-gray-700">
          <div className="col-span-5 font-semibold">Workflow: test3</div>
          <div className="col-span-3"></div>
          <div className="col-span-2"></div>
          <div className="col-span-1">
            {/* Workflow In Progress Tag */}
<span className="px-2 py-0.5 text-xs rounded-md font-bold border" style={{backgroundColor: '#d9f4ec', color: '#12845b', borderColor: '#12845b80'}}>Workflow In Progress</span>          </div>
          <div className="col-span-1"></div>
        </div>

        {/* Step 3.6: To Do (test3) */}
        <div className="grid grid-cols-12 gap-4 items-center py-2">
          <div className="col-span-5 border border-gray-300 rounded-md py-1.5 px-3 bg-white">3.6 Accountable Manager final review and approval</div>
          <div className="col-span-3 text-gray-600 border border-gray-300 rounded-md py-1.5 px-3 bg-white">Dadic, Matko</div>
          <div className="col-span-2 flex items-center border border-gray-300 rounded-md py-1.5 px-3 bg-white">
            <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <div className="col-span-1 text-gray-700">To Do</div>
          <div className="col-span-1 flex justify-end">
            {/* BUTTON WITH NEW COLOR AND PADDING */}
            <button className="flex items-center space-x-1 px-4 py-1.5 rounded-md text-white text-[10px] font-semibold shadow-md" style={{backgroundColor: '#126fd6'}}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              <span>Do Step</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Show Completed Workflows Button */}
      <div className="flex justify-center pt-8 pb-4">
        <button className="px-6 py-2 border rounded-md text-blue-600 border-blue-600 text-sm font-medium hover:bg-blue-50 transition shadow-sm">
          Show Completed Workflows
        </button>
      </div>
      
    </div>
  </div>
</TabsContent>
<TabsContent value="workflows" activeTab={activeTab} className="mt-6">
  <div className="w-full">

    {/* Department Filter */}
<div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Department
  </label>

  <style>
    {`
      select.custom-select option {
        background-color: white;
        color: black;
        padding: 6px 12px;
      }

      /* Browser WILL IGNORE THIS but adding exactly as you asked */
      select.custom-select option:hover {
        background-color: #126fd6 !important;
        color: white !important;
      }

      select.custom-select option:checked {
        background-color: #126fd6 !important;
        color: white !important;
      }
    `}
  </style>

  <select className="custom-select w-60 shadow-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <option>(all)</option>
    <option>Administration</option>
    <option>Blank</option>
    <option>CHR Management</option>
    <option>Compliance Monitoring</option>
    <option>Contract Signing Group</option>
    <option>CS Authorization</option>
    <option>Information Technology</option>
    <option>Logistics</option>
    <option>Maintenance</option>
    <option>Maintenance & Engineering</option>
    <option>Management Team</option>
    <option>Safety</option>
    <option>Training</option>
  </select>
</div>




    {/* TABLE WRAPPER WITH SCROLL */}
    <div className="overflow-y-auto max-h-[70vh] border rounded-md shadow-sm bg-white">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-3 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">#</th>
            <th className="px-3 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Name</th>
            <th className="px-3 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Department</th>
            <th className="px-3 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Done</th>
            <th className="px-3 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Next Due</th>
            <th className="px-3 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Workflow</th>
            <th className="px-3 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Started On</th>
            <th className="px-3 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Due On</th>
            <th className="px-3 py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {[
            ["WF-001", "Certification Authorisation issue 01", "Compliance Monitoring", 5, "—", "14/10/2024", "18/10/2024", "Overdue"],
            ["WF-002", "Certification Authorization renewal", "Compliance Monitoring", 10, "—", "08/07/2024", "10/08/2024", "Overdue"],
            ["WF-003", "Certification Authorization extension", "Compliance Monitoring", 25, "—", "09/10/2024", "16/10/2024", "Overdue"],
            ["WF-004", "Suspension or Revocation of Company authorisation", "Compliance Monitoring", 0, "—", "23/08/2024", "27/08/2024", "Overdue"],
            ["WF-DA/145-25", "Maintenance Away from Approved Location", "Maintenance & Engineering", 7, "—", "23/10/2024", "30/10/2024", "Overdue"],
            ["ADM-001", "Contracts", "Contract Signing Group", 0, "—", "08/09/2025", "15/09/2025", "Overdue"],
            ["ERP-001", "Emergency Response Plan workflow (Dale)", "(all)", 0, "—", "29/10/2025", "", "In Progress"],
            ["ERP-002", "ERP-002 Emergency Response Plan workflow", "(all)", 0, "—", "29/10/2025", "", "In Progress"],
            ["ORG-002", "Testing Workflow", "Management Team", 0, "—", "10/11/2025", "18/11/2025", "Overdue"],
            ["SAG-01", "Safety Action Group meeting", "Safety", 1, "—", "08/09/2025", "", "In Progress"],
            ["WF-005", "Audit Scheduling Workflow", "Quality", 3, "—", "10/01/2025", "20/01/2025", "In Progress"],
            ["WF-006", "Maintenance Audit Log", "Engineering", 9, "—", "04/02/2025", "09/02/2025", "In Progress"],
            ["WF-007", "Risk Assessment Review", "Safety", 4, "—", "18/12/2024", "28/12/2024", "Overdue"],
            ["WF-008", "Incident Follow-up", "Operations", 2, "—", "05/01/2025", "12/01/2025", "In Progress"],
            ["WF-009", "Training Review", "Training", 6, "—", "03/03/2025", "10/03/2025", "In Progress"],
            ["WF-010", "Equipment Certification", "Engineering", 7, "—", "01/02/2025", "15/02/2025", "In Progress"],
            ["WF-011", "Manual Revision Workflow", "Quality", 8, "—", "09/11/2024", "19/11/2024", "Overdue"],
            ["WF-012", "Compliance Audit", "Compliance", 4, "—", "28/01/2025", "02/02/2025", "In Progress"],
            ["WF-013", "Fuel Management Workflow", "Operations", 3, "—", "14/02/2025", "22/02/2025", "In Progress"],
            ["WF-014", "Safety Inspection Prep", "Safety", 11, "—", "20/01/2025", "28/01/2025", "In Progress"]
          ].map((row, i) => (
            <tr key={i}>
              <td className="px-3 py-4 whitespace-nowrap font-medium">{row[0]}</td>
              <td className="px-3 py-4">{row[1]}</td>
              <td className="px-3 py-4">{row[2]}</td>
              <td className="px-3 py-4">{row[3]}</td>
              <td className="px-3 py-4">{row[4]}</td>

              <td className="px-3 py-4">
                <div className="flex gap-2">

                  {/* View Button */}
                 <div className="flex gap-2">

  {/* View Button */}
  <button
    className="px-3 py-1 text-xs rounded border font-medium"
    style={{
      borderColor: "#126fd6",
      color: "#126fd6",
      backgroundColor: "white"
    }}
  >
    View
  </button>

  {/* Start Button */}
  <button
    className="px-3 py-1 text-xs flex items-center gap-1 text-white rounded font-medium"
    style={{
      backgroundColor: "#126fd6"
    }}
  >
    <span style={{ fontSize: "10px" }}>▶</span> Start
  </button>

</div>

                </div>
              </td>

              <td className="px-3 py-4">{row[5]}</td>
              <td className="px-3 py-4">{row[6]}</td>

             <td className="px-3 py-4">
  {row[7] === "Overdue" ? (
    <span
      className="px-3 py-1 text-xs border rounded whitespace-nowrap"
      style={{
        backgroundColor: "#ffe5e5",
        borderColor: "#ac1717",
        color: "#ac1717"
      }}
    >
      Overdue
    </span>
  ) : (
    <span
      className="px-3 py-1 text-xs border rounded whitespace-nowrap"
      style={{
        backgroundColor: "#d9f5ea",
        borderColor: "#12845b",
        color: "#12845b"
      }}
    >
      In Progress
    </span>
  )}
</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Bottom Actions */}
    <div className="flex items-center justify-between mt-0 bg-white py-4 border-t sticky bottom-0 z-20 px-4">

  {/* Left Button */}
  <button
    className="px-4 py-2 text-white rounded-md shadow-sm font-semibold"
    style={{ backgroundColor: "#126fd6" }}
  >
    + Define new Workflow
  </button>

  {/* Center Button (auto centered) */}
  <div className="flex-1 flex justify-center">
    <button
      className="px-4 py-2 rounded-md shadow-sm border font-semibold"
      style={{ borderColor: "#126fd6", color: "#126fd6" }}
    >
      Include Archived
    </button>
  </div>

  {/* Spacer to maintain exact symmetry */}
  <div className="w-[140px]"></div>

</div>


  </div>
</TabsContent>



<TabsContent value="actions" activeTab={activeTab} className="mt-6">
  
  {/* SCROLLABLE CONTAINER for the Actions content */}
  {/* max-h-[85vh] allows vertical scrolling for the content body. */}
  <div className="overflow-y-auto max-h-[80vh] bg-white border border-gray-200 rounded-md shadow-sm">
    
    {/* INFO BAR (Blue 'i' indicator block) */}
  <div className="w-[1240px] border border-blue-600 rounded-md overflow-hidden flex">

  {/* LEFT GRADIENT BAR */}
  <div
    className="text-white px-3 py-3 flex items-start justify-center min-w-[42px]"
    style={{
      backgroundImage: "linear-gradient(180deg, #126fd6, #57aaff)",
    }}
  >
    <span className="text-2xl font-bold">𝑖</span>
  </div>

  {/* RIGHT TEXT */}
  <div className="p-3 text-sm text-gray-700 leading-relaxed">
    The number of actions for each user includes assigned actions and delegated actions, therefore the sum of actions for all users may not equate to the total number of All Actions displayed.
Furthermore, the numbers shown below may include actions which you do not have permission to view.
  </div>

</div>


{/* FILTER BAR */}
<div className="p-4 border-b border-gray-200 flex flex-wrap gap-4 items-center">
  {/* Module Filter Dropdown */}
 <div className="relative">
      {/* Button */}
      <button
        onClick={() => setIsModuleOpen(!isModuleOpen)}
        className="
          flex items-center justify-between
          border border-gray-300 rounded-md 
          px-3 py-1.5 text-sm 
          bg-gray-100 shadow-sm 
          min-w-[200px] text-left
        "
      >
        <span className="font-bold">Module:</span> Workflow Module

        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            isModuleOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isModuleOpen && (
        <div
          className="
            absolute top-full mt-1 left-0 
            bg-white border border-gray-300 rounded-md 
            shadow-lg z-10 
            w-max 
            p-2
          "
        >
          <div className="space-y-0.5">

            {[
              "All",
              "Safety Module",
              "Compliance Module",
              "Workflow Module",
              "Risk Module",
              "Regulations",
            ].map((opt) => (
              <label
                key={opt}
                className="
                  flex items-center space-x-2 
                  py-1 px-2 hover:bg-gray-100 
                  rounded-md cursor-pointer
                "
              >
                <input
                  type="radio"
                  name="module"
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">{opt}</span>
              </label>
            ))}

            <div className="pt-3">
              <button
                onClick={() => setIsModuleOpen(false)}
                className="
                  w-full bg-blue-600 text-white 
                  rounded-md 
                  px-4 py-2 text-sm font-medium 
                  hover:bg-blue-700
                "
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  

<div className="relative inline-block">
      {/* Custom Select Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-between
          border border-gray-300 rounded-md 
          px-3 py-1.5 text-sm 
          bg-gray-100 shadow-sm 
          
          min-w-[290px] text-left
        "
      >
        <span className="font-semibold">Active/Inactive users:</span>{" "}
        {selected}

        <svg
          className={`
            w-4 h-4 ml-2 transition-transform duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute top-full mt-1 left-0 
            bg-white border border-gray-300 rounded-md 
            shadow-lg z-10 
            p-4 w-[350px]
          "
        >
          <div className="space-y-3">

            {/* Option 1 */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="activeInactive"
                className="h-4 w-4 text-blue-600"
                onChange={() => setSelected("All users with actions")}
                checked={selected === "All users with actions"}
              />
              <span className="text-sm">All users with actions</span>
            </label>

            {/* Option 2 */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="activeInactive"
                className="h-4 w-4 text-blue-600"
                onChange={() => setSelected("All users with open actions")}
                checked={selected === "All users with open actions"}
              />
              <span className="text-sm">All users with open actions</span>
            </label>

            {/* Option 3 */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="activeInactive"
                className="h-4 w-4 text-blue-600"
                onChange={() => setSelected("Inactive users only (+ organisations and departments)")}
                checked={selected === "Inactive users only (+ organisations and departments)"}
              />
              <span className="text-sm">
                Inactive users only (+ organisations and departments)
              </span>
            </label>

            {/* Apply Button */}
            <div className="pt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="
                  bg-blue-600 text-white rounded-md 
                  px-4 py-2 text-sm font-medium
                  w-[90px]
                "
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}
    </div>

{/* ACTION STATUS DROPDOWN */}
<div className="relative">
  <button
    onClick={() => setIsUserOpen(!isUserOpen)}
    className="
      flex items-center justify-between
      border border-gray-300 rounded-md 
      px-3 py-1.5 text-sm 
      bg-gray-100 shadow-sm 
      min-w-[180px] text-left
    "
  >
    <span className="font-semibold">Action Status:</span>&nbsp;
    {filters.status.length === 0 ? "All" : filters.status.join(", ")}

    <svg
      className={`w-4 h-4 ml-2 transition-transform duration-200 ${
        isUserOpen ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {isUserOpen && (
    <div
      className="
        absolute top-full left-0 mt-1
        bg-white border border-gray-300 rounded-md
        shadow-lg p-4 z-20
        w-[230px]
      "
    >
      {[
        "Overdue",
        "Open",
        "Pending",
        "Completed",
        "Closed",
        "OnHold",
        "Rejected",
      ].map((s) => (
        <label
          key={s}
          className="flex items-center space-x-2 py-1 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={filters.status.includes(s)}
            onChange={() =>
              setFilters((prev) => {
                const exists = prev.status.includes(s);
                return {
                  ...prev,
                  status: exists
                    ? prev.status.filter((x) => x !== s)
                    : [...prev.status, s],
                };
              })
            }
            className="h-4 w-4"
          />
          <span className="text-sm">{s}</span>
        </label>
      ))}

      <div className="flex items-center gap-3 mt-3">
  <button
    className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md"
    onClick={() => setIsUserOpen(false)}
  >
    Apply
  </button>

  <button
    className="px-4 py-1.5 text-sm border border-red-500 text-[#ac1717] rounded-md"
    onClick={() =>
      setFilters((prev) => ({ ...prev, status: [] }))
    }
  >
    Clear
  </button>
</div>

    </div>
  )}
</div>


  <button
  className="
    ml-auto 
    flex items-center 
    text-blue-600 text-sm font-medium 
    hover:text-blue-800
    border border-blue-500 
    rounded-md 
    px-3 py-1.5
    bg-white
  "
>
  <svg
    className="w-4 h-4 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 10h16M4 14h16M4 18h16"
    />
  </svg>
  Show legend
</button>

</div>

    {/* ACTIONS TABLE BODY */}
  <div className="text-md">
      
  {/* Table Header - UPDATED COLORS */}
  <div className="grid grid-cols-12 gap-2 text-gray-500 font-medium px-4 pt-4 pb-2 border-b">
    <div className="col-span-4">Name</div>
    <div className="col-span-2 text-center text-sm text-black-100">
      Require Attention 
      <span className="inline-flex items-center border border-[#ac1717] justify-center w-8 h-6 ml-1 text-xs font-bold bg-[#fbe6e6] text-[#ac1717] rounded-full">20</span>
    </div>
    <div className="col-span-3 text-center text-sm text-black-100">In Progress</div>
    <div className="col-span-3 text-center text-sm text-black-100 ">
      Closed 
      <span className="inline-flex items-center border border-[#12845b] justify-center w-8 h-6 ml-1 text-xs font-bold bg-[#e6f3ed] text-[#12845b] rounded-full">28</span>
    </div>
  </div>
      
  {/* Sub-Header / Categories (Overdue, Rejected, Completed, Open, Pending) */}
  <div className="grid grid-cols-12 gap-2 text-bold text-xs font-normal px-4 pt-2 pb-1 border-b">
    <div className="col-span-4"></div>
    <div className="col-span-1 text-center">Overdue</div>
    <div className="col-span-1 text-center">Rejected</div>
    <div className="col-span-1 text-center">Completed</div>
    <div className="col-span-1 text-center">Open</div>
    <div className="col-span-1 text-center">Pending</div>
    <div className="col-span-3 text-center"></div> {/* Closed column space */}
  </div>

  {/* ALL ACTIONS ROW - UPDATED COLORS */}
  <div className="grid grid-cols-12 gap-2 items-center py-2 font-bold px-4 border-b border-gray-100 bg-gray-50">
  <div className="col-span-4">All Actions</div>

  {/* 18 - RED */}
  <div className="col-span-1 inline-flex items-center justify-center w-8 h-6 ml-8 text-xs font-bold 
                  bg-[#fbe6e6] text-[#ac1717] border border-[#ac1717] rounded-full">
    18
  </div>

  <div className="col-span-1 text-center"></div>

  {/* 2 - GREEN */}
  <div className="col-span-1 inline-flex items-center justify-center w-8 h-6 ml-8 text-xs font-bold 
                  bg-[#e6f3ed] text-[#12845b] border border-[#12845b] rounded-full">
    2
  </div>

  <div className="col-span-1 text-center"></div>
  <div className="col-span-1 text-center"></div>

  {/* 28 - GREEN with custom margin */}
  <div className="col-span-1 inline-flex items-center justify-center w-8 h-6 ml-[130px] text-xs font-bold 
                  bg-[#e6f3ed] text-[#12845b] border border-[#12845b] rounded-full">
    28
  </div>
</div>

      
  {/* DATA ROWS - USERS & DEPARTMENTS - UPDATED COLORS */}
  <div className="space-y-0.5 pt-2">
        
    {/* User: Boubet, Cyril */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Boubet, Cyril</div>
      <div className="col-span-1 text-center font-bold">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full border border-[#ac1717] text-xs font-bold bg-[#fbe6e6] text-[#ac1717]">1</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full  border border-[#12845b] text-xs font-bold bg-[#e6f3ed] text-[#12845b]">2</span>
      </div>
    </div>
        
    {/* User: Dadic, Andro */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Dadic, Andro</div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#ac1717] font-bold bg-[#fbe6e6] text-[#ac1717]">1</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#12845b] font-bold bg-[#e6f3ed] text-[#12845b]">4</span>
      </div>
    </div>
        
    {/* User: Dadic, Laura */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Dadic, Laura</div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#ac1717] font-bold bg-[#fbe6e6] text-[#ac1717]">3</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center"></div>
    </div>
        
    {/* User: Dadic, Matko */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Dadic, Matko</div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#ac1717] font-bold bg-[#fbe6e6] text-[#ac1717]">1</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center"></div>
    </div>

    {/* Department "Blank" */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Department "Blank"</div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#12845b] font-bold bg-[#e6f3ed] text-[#12845b]">1</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center"></div>
    </div>
        
    {/* Department "Compliance Monitoring" */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Department "Compliance Monitoring"</div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#ac1717] font-bold bg-[#fbe6e6] text-[#ac1717]">3</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#12845b] font-bold bg-[#e6f3ed] text-[#12845b]">7</span>
      </div>
    </div>
        
    {/* Department "Safety" */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Department "Safety"</div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#ac1717] font-bold bg-[#fbe6e6] text-[#ac1717]">1</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#12845b] font-bold bg-[#e6f3ed] text-[#12845b]">1</span>
      </div>
    </div>

    {/* Loghin, Florin Gabriel */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Loghin, Florin Gabriel</div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#ac1717] font-bold bg-[#fbe6e6] text-[#ac1717]">1</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center"></div>
    </div>
        
    {/* Okicicki, Tihomir */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Okicicki, Tihomir</div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#ac1717] font-bold bg-[#fbe6e6] text-[#ac1717]">3</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center"></div>
    </div>
        
    {/* Pavleka, Krunoslav */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Pavleka, Krunoslav</div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#ac1717] font-bold bg-[#fbe6e6] text-[#ac1717]">3</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center"></div>
    </div>
        
    {/* PERROCHON, Camille */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">PERROCHON, Camille</div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#12845b] font-bold bg-[#e6f3ed] text-[#12845b]">1</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center"></div>
    </div>
        
    {/* Regnier, Xavier */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Regnier, Xavier</div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#ac1717] font-bold bg-[#fbe6e6] text-[#ac1717]">1</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center"></div>
    </div>
        
    {/* Vergnaud, William */}
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-4">Vergnaud, William</div>
      <div className="col-span-1 text-center">
        <span className="inline-flex items-center justify-center w-8 h-6 rounded-full text-xs border border-[#ac1717] font-bold bg-[#fbe6e6] text-[#ac1717]">1</span>
      </div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-3 text-center"></div>
    </div>
        
  </div>
      
  {/* Footer space to avoid content hitting the bottom of the scrollbar */}
  <div className="h-4"></div>
      
</div>
  </div>
</TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowTabsPage;
