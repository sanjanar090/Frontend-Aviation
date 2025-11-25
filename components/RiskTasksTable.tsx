import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, Calendar, User, Search, RotateCcw, ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Global Data for Filters ---
const allStatuses = ["Open"];
const allTasks = ["Complete assessment"];
const allUsers = ["Matko Dadic"];

// Helper function to format display labels to internal values (e.g., "In Progress" -> "in-progress")
const formatValue = (label) => label.toLowerCase().replace(/\s/g, '-').replace(/:/g, '');

// --- Custom Checkbox Dropdown Component (Reusable) ---
const CustomCheckboxDropdown = ({ title, options, selectedValues, toggleValue, onClose }) => {
    // Ref for detecting clicks outside the dropdown
    const dropdownRef = useRef(null);

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div 
            ref={dropdownRef}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-xl w-56 space-y-2 max-h-80 overflow-y-auto"
        > 
            <div className="text-sm font-semibold text-gray-700 mb-2">{title}</div>
            
            <div className="flex flex-col space-y-2">
                {options.map((label) => {
                    // Prepend "User: " for the Assigned To filter visually, but keep label clean
                    const displayLabel = title === "Assigned to" && !label.startsWith("User:") ? `User: ${label}` : label;
                    const value = formatValue(label);
                    const isChecked = selectedValues.includes(value);

                    return (
                        <label 
                            key={label} 
                            className="flex items-center space-x-3 text-sm cursor-pointer select-none hover:bg-muted/50 p-1 rounded-md transition-colors"
                            onClick={() => toggleValue(value)}
                        >
                            <input
                                type="checkbox"
                                name={title}
                                value={value}
                                checked={isChecked}
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary/50 cursor-pointer"
                                readOnly
                            />
                            <span>{displayLabel}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};


// --- Due Date Filter (Reused and slightly modified for ref usage) ---
const DueDateFilterDropdown = ({ selectedRange, setSelectedRange, setFromDate, setToDate, onClose }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const dateRanges = [
        "All time", "Date set", "No date set", "Overdue", 
        "Next 7 days", "Next 14 days", "Next 30 days", "Custom",
    ];
    const formatValue = (label) => label.toLowerCase().replace(/\s/g, '-');

    return (
        <div 
            ref={dropdownRef}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-xl w-56 space-y-3"
        > 
            {/* Radio Options Section */}
            <div className="flex flex-col space-y-2">
                {dateRanges.map((label) => (
                    <label 
                        key={label} 
                        className="flex items-center space-x-3 text-sm cursor-pointer select-none hover:bg-muted/50 p-1 rounded-md transition-colors"
                        onClick={() => setSelectedRange(formatValue(label))}
                    >
                        <input
                            type="radio"
                            name="dueDateRange"
                            value={formatValue(label)}
                            checked={selectedRange === formatValue(label)}
                            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary/50 cursor-pointer"
                            readOnly
                        />
                        <span>{label}</span>
                    </label>
                ))}
            </div>

            {/* Custom Date Range Inputs */}
            <div className="mt-4 pt-4 border-t border-muted space-y-2">
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span>From</span>
                    <span>To</span>
                </div>
                
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Input 
                            placeholder="From" 
                            className="pr-8 h-8" 
                            type="text"
                            disabled={selectedRange !== 'custom'}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                        <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <div className="relative flex-1">
                        <Input 
                            placeholder="To" 
                            className="pr-8 h-8" 
                            type="text"
                            disabled={selectedRange !== 'custom'}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                        <Calendar className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Helper Functions for Display Labels ---

const getDueDateLabel = (range) => {
    const labelMap = {
        'all-time': 'Due date: All time',
        'date-set': 'Due date: Date set',
        'no-date-set': 'Due date: No date set',
        'overdue': 'Due date: Overdue',
        'next-7-days': 'Due date: Next 7 days',
        'next-14-days': 'Due date: Next 14 days',
        'next-30-days': 'Due date: Next 30 days',
        'custom': 'Due date: Custom',
    };
    return labelMap[range] || 'Due date: All time';
};

const getFilterLabel = (title, selected) => {
    if (selected.length === 0) return `${title}: All`;
    if (selected.length === 1) {
        // Find the original label for display
        let originalLabel = [...allStatuses, ...allTasks, ...allUsers]
            .find(label => formatValue(label) === selected[0]) || selected[0];
        
        // Add "User:" prefix back if it's an Assigned To filter user
        if (title === "Assigned to" && allUsers.map(formatValue).includes(selected[0])) {
            originalLabel = `User: ${originalLabel}`;
        }
        
        return `${title}: ${originalLabel}`;
    }
    return `${title}: ${selected.length} selected`;
};

// --- Task Data ---
const tasks = [
    {
        id: 1,
        task: "Complete assessment",
        title: "Aircraft services",
        dueDate: "16/01/2026",
        assignedTo: "Matko Dadic",
        status: "open"
    },
];

// --- Main Component ---
export const RiskTasksTable = () => {
    // --- Due Date State ---
    const [isDueDateDropdownOpen, setIsDueDateDropdownOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState('all-time');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    
    // --- Status State ---
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    const toggleStatus = (statusValue) => {
        setSelectedStatuses(prev => 
            prev.includes(statusValue) ? prev.filter(s => s !== statusValue) : [...prev, statusValue]
        );
    };

    // --- Task State ---
    const [isTaskDropdownOpen, setIsTaskDropdownOpen] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);

    const toggleTask = (taskValue) => {
        setSelectedTasks(prev => 
            prev.includes(taskValue) ? prev.filter(t => t !== taskValue) : [...prev, taskValue]
        );
    };

    // --- Assigned To State ---
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const toggleUser = (userValue) => {
        setSelectedUsers(prev => 
            prev.includes(userValue) ? prev.filter(u => u !== userValue) : [...prev, userValue]
        );
    };

    // Determine if a filter button should have an "active" style
    const isActive = (selectedArray) => selectedArray.length > 0;
    const isDateRangeActive = selectedRange !== 'all-time';


    // Helper component for the filter button structure
    const FilterButton = ({ icon: Icon, label, isActive, onClick, isOpen }) => (
        <button 
            className={`w-[190px] h-10 border p-2 rounded-md cursor-pointer flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-primary/10 border-primary text-primary' : 'bg-muted/50 border-gray-200 text-gray-700 hover:bg-muted/70'
            }`}
            onClick={onClick}
        >
            <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="flex-1 text-left whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
            <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
        </button>
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-medium">My Risk tasks</CardTitle>
                    <Badge variant="secondary" className="rounded-full">
                        1
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2">
                    
                    {/* --- DUE DATE FILTER (Custom Dropdown) --- */}
                    <div className="relative"> 
                        <FilterButton
                            icon={Calendar}
                            label={getDueDateLabel(selectedRange)}
                            isActive={isDateRangeActive}
                            onClick={() => setIsDueDateDropdownOpen(!isDueDateDropdownOpen)}
                            isOpen={isDueDateDropdownOpen}
                        />

                        {isDueDateDropdownOpen && (
                            <div className="absolute z-10 top-full mt-2 left-0">
                                <DueDateFilterDropdown 
                                    selectedRange={selectedRange} 
                                    setSelectedRange={setSelectedRange}
                                    setFromDate={setFromDate}
                                    setToDate={setToDate}
                                    onClose={() => setIsDueDateDropdownOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                    {/* --- END DUE DATE FILTER --- */}

                    {/* --- STATUS FILTER (Custom Checkbox Dropdown) --- */}
                    <div className="relative">
                        <FilterButton
                            icon={RotateCcw} // Icon matching image style
                            label={getFilterLabel("Status", selectedStatuses)}
                            isActive={isActive(selectedStatuses)}
                            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                            isOpen={isStatusDropdownOpen}
                        />

                        {isStatusDropdownOpen && (
                            <div className="absolute z-10 top-full mt-2 left-0">
                                <CustomCheckboxDropdown
                                    title="Status"
                                    options={allStatuses}
                                    selectedValues={selectedStatuses}
                                    toggleValue={toggleStatus}
                                    onClose={() => setIsStatusDropdownOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                    {/* --- END STATUS FILTER --- */}

                    {/* --- TASK FILTER (Custom Checkbox Dropdown) --- */}
                    <div className="relative">
                        <FilterButton
                            icon={ListChecks} // Icon matching image style
                            label={getFilterLabel("Task", selectedTasks)}
                            isActive={isActive(selectedTasks)}
                            onClick={() => setIsTaskDropdownOpen(!isTaskDropdownOpen)}
                            isOpen={isTaskDropdownOpen}
                        />

                        {isTaskDropdownOpen && (
                            <div className="absolute z-10 top-full mt-2 left-0">
                                <CustomCheckboxDropdown
                                    title="Task"
                                    options={allTasks}
                                    selectedValues={selectedTasks}
                                    toggleValue={toggleTask}
                                    onClose={() => setIsTaskDropdownOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                    {/* --- END TASK FILTER --- */}

                    {/* --- ASSIGNED TO FILTER (Custom Checkbox Dropdown) --- */}
                    <div className="relative">
                        <FilterButton
                            icon={User}
                            label={getFilterLabel("Assigned to", selectedUsers)}
                            isActive={isActive(selectedUsers)}
                            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                            isOpen={isUserDropdownOpen}
                        />

                        {isUserDropdownOpen && (
                            <div className="absolute z-10 top-full mt-2 left-0">
                                <CustomCheckboxDropdown
                                    title="Assigned to"
                                    options={allUsers}
                                    selectedValues={selectedUsers}
                                    toggleValue={toggleUser}
                                    onClose={() => setIsUserDropdownOpen(false)}
                                />
                            </div>
                        )}
                    </div>
                    {/* --- END ASSIGNED TO FILTER --- */}

                    {/* Search Input */}
                    <div className="relative flex-1 min-w-[200px] max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search tasks..."
                            className="pl-9 bg-muted/50 border-0 h-10"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="border rounded-lg overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="font-medium min-w-[150px]">Task ▼</TableHead>
                                <TableHead className="font-medium min-w-[150px]">Title ▼</TableHead>
                                <TableHead className="font-medium min-w-[150px]">Due date ▼</TableHead>
                                <TableHead className="font-medium min-w-[200px]">Assigned to ▼</TableHead>
                                <TableHead className="w-12"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.map((task) => (
                                <TableRow key={task.id} className="hover:bg-muted/30">
                                    <TableCell className="font-medium">{task.task}</TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                                            {task.dueDate}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6 bg-primary">
                                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                                    MD
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{task.assignedTo}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <button className="p-1 hover:bg-muted rounded">
                                            <ChevronRight className="h-4 w-4 text-primary" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
                    <div>Showing 1-1 of 1</div>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <span>Items per page</span>
                        <Select defaultValue="10">
                            <SelectTrigger className="w-[70px] h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RiskTasksTable;