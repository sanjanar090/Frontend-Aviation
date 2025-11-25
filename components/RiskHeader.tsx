import { AlertTriangle, AlignLeft, Link, Megaphone, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const RiskHeader = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Risk</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-muted rounded transition-colors">
            <AlignLeft className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded transition-colors">
            <Link className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded transition-colors">
            <Megaphone className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <div className="flex items-center gap-2 ml-4">
            <Avatar className="h-8 w-8 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                MD
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Matko Dadic</span>
              <span className="text-xs text-muted-foreground">Accountable Manager</span>
            </div>
          </div>
          
          <button className="p-2 hover:bg-muted rounded transition-colors">
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
