import React, { useState, FC, ReactNode } from 'react';
// lucide-react icons are used for visual elements.
import { Plus, User } from "lucide-react";

// --- Types for Reusable Components and Data ---

type Variant = 'default' | 'tab' | 'tabActive' | 'restricted';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'tab' | 'tabActive';
  className?: string;
  children: ReactNode;
}

interface BadgeProps {
  variant?: 'restricted' | 'default';
  children: ReactNode;
}

interface Role {
  id: number;
  name: string;
  type: 'internal' | 'restricted' | 'default';
}

// --- Mock UI Components (Simplified) ---

// Basic Button Component
const Button: FC<ButtonProps> = ({ variant = 'default', className = '', children, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<Variant, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
    tab: "text-gray-600 border-b-2 border-transparent hover:border-blue-500/50 hover:text-blue-600 transition-colors",
    tabActive: "text-blue-600 border-b-2 border-blue-600 font-semibold",
    // Adding 'restricted' here just to satisfy the Record type, though it's not used for a Button
    restricted: "", 
  };
  const sizes = {
    default: "h-10 px-4 py-2",
  };

  const finalClassName = `${baseStyle} ${variants[variant]} ${sizes.default} ${className}`;

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};

// Basic Badge Component
const Badge: FC<BadgeProps> = ({ variant = 'default', children }) => {
  const baseStyle = "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-semibold transition-colors";
  const variants: Record<Variant, string> = {
    restricted: "bg-red-500 text-white",
    default: "bg-gray-200 text-gray-700",
    // Adding button variants here just to satisfy the Record type, though it's not used for a Badge
    tab: "",
    tabActive: "",
  };
  return (
    <div className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </div>
  );
};

// Mock Data for Roles
const systemWideRoles: Role[] = [
  { id: 1, name: "Centrik Admin (Internal)", type: "internal" },
  { id: 2, name: "Centrik Support", type: "restricted" },
  { id: 3, name: "Shared Device", type: "default" },
  { id: 4, name: "Third Party Quality Manager", type: "default" },
  { id: 5, name: "User", type: "default" },
];

// Component for a single role item in the list
const RoleItem: FC<{ role: Role }> = ({ role }) => (
  <div className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-blue-50/50 transition duration-150 cursor-pointer">
    <div className="flex items-center gap-3">
      <span className="text-gray-700 font-medium">{role.name}</span>
      {role.type === 'restricted' && (
        <Badge variant="restricted">
          restricted
        </Badge>
      )}
    </div>
  </div>
);

// --- Main Component ---

export const App: FC = () => {
  // State to manage the active tab, defaulting to 'system-wide-roles'
  const [activeTab, setActiveTab] = useState<string>('system-wide-roles');

  const TabButton: FC<{ id: string, label: string }> = ({ id, label }) => (
    <Button
      variant={activeTab === id ? 'tabActive' : 'tab'}
      className="text-base py-3 px-4 rounded-none h-auto"
      onClick={() => setActiveTab(id)}
    >
      {label}
    </Button>
  );

  const handleCreateRole = (): void => {
    // In a real application, this would open a modal or navigate to a creation form.
    // Using console.log for a single-file example.
    console.log('Simulating Create System-Wide Role action');
  };

  return (
    // This container simulates the main content area of the application
    <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
      
      {/* Page Title */}
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <User className="h-6 w-6 text-blue-600" />
          System-Wide Roles
        </h1>
      </div>

      {/* Tabs Navigation (Simulating Contacts Module Tabs) */}
      <div className="flex border-b border-gray-200 mb-6 bg-white/50">
        <TabButton id="all-contacts" label="All contacts" />
        <TabButton id="departments" label="Departments" />
        <TabButton id="system-wide-roles" label="System-Wide Roles" />
        <TabButton id="access-rights" label="Access rights" />
      </div>

      {/* Content Area for System-Wide Roles (Conditionally rendered, but always visible in this view) */}
      {activeTab === 'system-wide-roles' && (
        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 min-h-[500px]">
          
          <h2 className="text-lg font-bold text-gray-800 mb-4">Roles</h2>

          {/* Roles List Container */}
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
            {systemWideRoles.map(role => (
              <RoleItem key={role.id} role={role} />
            ))}
          </div>

          {/* Create Role Button */}
          <Button 
            variant="default" 
            className="gap-2 text-base px-6 py-2 shadow-lg"
            onClick={handleCreateRole}
          >
            <Plus className="h-5 w-5" />
            Create System-Wide Role
          </Button>
        </div>
      )}

      {/* Placeholder for other tabs if they were active */}
      {activeTab !== 'system-wide-roles' && (
        <div className="bg-white p-10 rounded-lg shadow-xl border border-gray-100 text-center text-gray-500">
          Content for {activeTab.replace('-', ' ')}...
        </div>
      )}

    </div>
  );
};

export default App;