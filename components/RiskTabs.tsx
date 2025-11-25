import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Dashboard", id: "dashboard" },
  { label: "My risk assessments", id: "my-assessments" },
  { label: "Assessments", badge: 16, id: "assessments" },
  { label: "Drafts", badge: 9, id: "drafts" },
  { label: "Actions", badge: 2, id: "actions" },
  { label: "Heatmap", id: "heatmap" },
  { label: "Risk matrix", id: "risk-matrix" },
  { label: "Residual risk", id: "residual-risk" },
  { label: "Templates", id: "templates" },
];

interface RiskTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const RiskTabs = ({ activeTab, onTabChange }: RiskTabsProps) => {
  return (
    <div className="border-b border-border bg-muted/30">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {tab.badge !== undefined && (
                <span className="ml-2 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
        
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Show settings
        </Button>
      </div>
    </div>
  );
};
