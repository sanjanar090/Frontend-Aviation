import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WorkflowFilters = () => {
  return (
    <div className="bg-muted/50 px-6 py-4 flex items-center gap-3 flex-wrap">
      <Select defaultValue="all">
        <SelectTrigger className="w-[220px] bg-card">
          <SelectValue placeholder="Workflow Definition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Workflow Definition: All workflows</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="due-date">
        <SelectTrigger className="w-[200px] bg-card">
          <SelectValue placeholder="Organise By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="due-date">Organise By: Step Due Date</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="overdue">
        <SelectTrigger className="w-[280px] bg-card">
          <SelectValue placeholder="Workflow Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="overdue">Workflow Status: Overdue, Due in next 30 days or...</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <X className="h-4 w-4" />
      </Button>

      <Select defaultValue="all-dates">
        <SelectTrigger className="w-[150px] bg-card">
          <SelectValue placeholder="Due Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-dates">Due Date: All</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
