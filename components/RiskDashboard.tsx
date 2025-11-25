import React from 'react';
import { MoreVertical, Search, ChevronRight, Download, Calendar, Activity, List, User } from "lucide-react"; // Added Calendar, Activity, List, User icons

// Assuming these utility components exist in your project setup
// Using placeholders for Card, Button, Input to make the component self-contained for demonstration.

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}
const Card: React.FC<CardProps> = ({ children, className }) => (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
        {children}
    </div>
);

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardHeader: React.FC<CardHeaderProps> = ({ children, ...props }) => (
    <div className="flex flex-col space-y-1.5 p-6" {...props}>
        {children}
    </div>
);

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const CardTitle: React.FC<CardTitleProps> = ({ children, ...props }) => (
    <h3 className="text-2xl font-semibold leading-none tracking-tight" {...props}>
        {children}
    </h3>
);

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardContent: React.FC<CardContentProps> = ({ children, ...props }) => (
    <div className="p-6 pt-0" {...props}>
        {children}
    </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'outline' | 'default';
  className?: string;
}
const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-md transition-colors ${className}`} {...props}>
    {children}
  </button>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input: React.FC<InputProps> = (props) => (
  <input className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500" {...props} />
);

// --- Helper Components for Task Section ---

interface TaskFilterProps {
  label: string;
  icon?: React.ElementType; // Optional icon prop
}

const TaskFilter: React.FC<TaskFilterProps> = ({ label, icon: Icon }) => (
  <div className="flex items-center space-x-1 text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-1.5 cursor-pointer hover:bg-gray-100">
    {Icon && <Icon className="h-4 w-4 text-gray-500" />}
    <span>{label}</span>
    <ChevronRight className="h-4 w-4 transform rotate-90" />
  </div>
);

interface TaskRowProps {
  task: string;
  title: string;
  dueDate: string;
  assignedTo: string;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, title, dueDate, assignedTo }) => (
  <div className="grid grid-cols-4 items-center border-b border-gray-200 py-3 text-sm text-gray-700">
    <div className="font-normal">{task}</div>
    <div className="font-normal">{title}</div>
    <div className="text-green-500 font-medium">{dueDate}</div> {/* Using a standard green for the date */}
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold">MD</span>
        <span className="font-normal">{assignedTo}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </div>
  </div>
);


// --- Main Dashboard Component ---

export const RiskDashboard: React.FC = () => {
  // Define constants for the circle metrics
  const actionsCount = 2;
  const risksCount = 16;
  
  // Risk Assessments split
  const inProgress = 7;
  const continued = 9;
  const totalRisks = inProgress + continued; // 16
  const radius = 70;
  const circumference = 2 * Math.PI * radius; // ~439.82
  
  // Calculate dasharray and dashoffset for Risk Assessments
  const inProgressLength = (inProgress / totalRisks) * circumference;
  const continuedLength = (continued / totalRisks) * circumference;
  
  // Total tasks is 1, as per the image
  const totalTasks = 1;

  return (
    <div className="space-y-6 pt-2 px-6 pb-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* All Actions Card */}
        <Card className="shadow-lg rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium text-gray-600">All actions ({actionsCount})</CardTitle>
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="relative w-40 h-40">
                {/* Outer red circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  {/* Background track (opacity) */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="rgb(239, 68, 68)" // Red-500
                    strokeWidth="20"
                    opacity="0.15" 
                  />
                  {/* Progress segment (full red as all 2 are overdue) */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="rgb(239, 68, 68)"
                    strokeWidth="20"
                    strokeDasharray={circumference}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-gray-800">{actionsCount}</div>
                  <div className="text-sm text-gray-500">actions</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600"></div> 
                  <span className="text-sm text-gray-700">Overdue ({actionsCount})</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessments Card */}
        <Card className="shadow-lg rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium text-gray-600">Risk assessments ({risksCount})</CardTitle>
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="relative w-40 h-40">
                {/* Multi-color circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  {/* Background track (subtle light grey) */}
                   <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="rgb(229, 231, 235)" 
                    strokeWidth="20"
                  />
                  {/* Continue (Dark green) segment: 9/16 */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="rgb(16, 185, 129)" // Green-500 (light)
                    strokeWidth="20"
                    strokeDasharray={`${continuedLength} ${circumference - continuedLength}`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* In Progress (Light green) segment: 7/16 */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="rgb(52, 211, 153)" // Green-400 (darker)
                    strokeWidth="20"
                    strokeDasharray={`${inProgressLength} ${circumference - inProgressLength}`}
                    strokeDashoffset={-continuedLength} 
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-gray-800">{risksCount}</div>
                  <div className="text-sm text-gray-500">risks</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div> 
                  <span className="text-sm text-gray-700">In Progress ({inProgress})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div> 
                  <span className="text-sm text-gray-700">Continue ({continued})</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Risk Tasks Section */}
      
    </div>
  );
};

export default RiskDashboard;