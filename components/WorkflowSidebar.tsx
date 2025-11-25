import { LayoutDashboard, Shield, FileText, Layers, AlertTriangle, Monitor, Settings, Users, HelpCircle, ChevronDown, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", hasDropdown: false },
  { icon: Shield, label: "Safety", hasDropdown: true },
  { icon: FileText, label: "Compliance", hasDropdown: true },
  { icon: Layers, label: "Workflows", hasDropdown: false, active: true },
  { icon: AlertTriangle, label: "Risk", hasDropdown: false },
  { icon: Monitor, label: "Devices", hasDropdown: false },
  { icon: Settings, label: "Config", hasDropdown: false },
  { icon: Users, label: "Contacts", hasDropdown: false },
  { icon: HelpCircle, label: "Support", hasDropdown: true },
];

export const WorkflowSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn("bg-sidebar-bg text-white transition-all duration-300", collapsed ? "w-16" : "w-52")}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">DA</span>
            </div>
            {!collapsed && <span className="font-semibold">Dale Aviation</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors relative",
                item.active 
                  ? "bg-sidebar-active text-white" 
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white border-t border-white/10"
        >
          <ChevronLeft className={cn("h-5 w-5 flex-shrink-0 transition-transform", collapsed && "rotate-180")} />
          {!collapsed && <span>Collapse menu</span>}
        </button>

        {/* Logo at bottom */}
        <div className="p-4 border-t border-white/10">
          {!collapsed && (
            <div className="text-center">
              <span className="text-lg font-bold">Centrik</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
