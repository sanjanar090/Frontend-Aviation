import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, Download, Plus, Building2, CircleDot, Search } from "lucide-react";

const assessments = [
  {
    number: "1",
    name: "Incorrect/ unserviceable tools usage",
    department: "Safety",
    nextDue: "30/05/2025",
    currentRisk: { overall: "Accept", overallColor: "success", highestScore: "10", actions: "-" },
    plannedRisk: { overall: "Accept", overallColor: "success", highestScore: "10" },
    status: "Continue",
    statusIndicator: "D",
  },
  {
    number: "2",
    name: "Incorrect maintenance procedure / maintenance data usage",
    department: "Safety",
    nextDue: "30/05/2026",
    currentRisk: { overall: "Accept", overallColor: "success", highestScore: "10", actions: "-" },
    plannedRisk: { overall: "Accept", overallColor: "success", highestScore: "-" },
    status: "Continue",
    statusIndicator: null,
  },
  {
    number: "03",
    name: "Aircraft services",
    department: "(all)",
    nextDue: "16/01/2026",
    involvement: "Involvement: none",
    currentRisk: { overall: "Secure", overallColor: "warning", highestScore: "-", actions: "-" },
    plannedRisk: { overall: "Monitor", overallColor: "primary", highestScore: "-" },
    status: "In Progress",
    statusIndicator: "D",
  },
  {
    number: "3",
    name: "Incorrect Installation Of Component",
    department: "Safety",
    nextDue: "30/05/2025",
    currentRisk: { overall: "Improve", overallColor: "destructive", highestScore: "100", actions: "-" },
    plannedRisk: { overall: "Monitor", overallColor: "primary", highestScore: "40" },
    status: "Continue",
    statusIndicator: null,
  },
  {
    number: "4",
    name: "Insufficient staff qualification",
    department: "Safety",
    nextDue: "-",
    currentRisk: { overall: "-", overallColor: "info", highestScore: "10", actions: "-" },
    plannedRisk: { overall: "-", overallColor: "info", highestScore: "10" },
    status: "In Progress",
    statusIndicator: "D",
  },
  {
    number: "5",
    name: "Incorrect handling of hazardous chemicals during aircraft maintenance in store",
    department: "Safety",
    nextDue: "04/06/2025",
    currentRisk: { overall: "Accept", overallColor: "success", highestScore: "10", actions: "-" },
    plannedRisk: { overall: "-", overallColor: "info", highestScore: "10" },
    status: "Continue",
    statusIndicator: null,
  },
  {
    number: "6",
    name: "Communication issues",
    department: "Safety",
    nextDue: "-",
    currentRisk: { overall: "-", overallColor: "info", highestScore: "-", actions: "-" },
    plannedRisk: { overall: "-", overallColor: "info", highestScore: "-" },
    status: "In Progress",
    statusIndicator: "D",
  },
  {
    number: "7",
    name: "FOD",
    department: "Safety",
    nextDue: "04/06/2025",
    currentRisk: { overall: "Improve", overallColor: "destructive", highestScore: "40", actions: "-" },
    plannedRisk: { overall: "Monitor", overallColor: "primary", highestScore: "10" },
    status: "Continue",
    statusIndicator: "D",
    actionCount: null,
  },
  {
    number: "8",
    name: "Incorrect handling of GSE",
    department: "Safety",
    nextDue: "04/12/2024",
    currentRisk: { overall: "Improve", overallColor: "destructive", highestScore: "40", actions: "1" },
    plannedRisk: { overall: "Monitor", overallColor: "primary", highestScore: "10" },
    status: "Continue",
    statusIndicator: null,
  },
  {
    number: "10",
    name: "No hangar space available for planned base maintenance",
    department: "Safety",
    nextDue: "04/06/2025",
    currentRisk: { overall: "Improve", overallColor: "destructive", highestScore: "40", actions: "1" },
    plannedRisk: { overall: "Monitor", overallColor: "primary", highestScore: "10" },
    status: "Continue",
    statusIndicator: null,
  },
];

const getBadgeVariant = (color: string) => {
  switch (color) {
    case "success":
      return "bg-success/10 text-success border-success/30";
    case "warning":
      return "bg-warning/10 text-warning border-warning/30";
    case "destructive":
      return "bg-destructive/10 text-destructive border-destructive/30";
    case "primary":
      return "bg-primary/10 text-primary border-primary/30";
    case "info":
      return "bg-info/10 text-info border-info/30";
    default:
      return "bg-muted/10 text-muted-foreground border-muted/30";
  }
};

export const AssessmentsView = () => {
  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] border-0 bg-muted/50">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Department: All</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <CircleDot className="h-4 w-4 text-muted-foreground" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] border-0 bg-muted/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status: All</SelectItem>
              <SelectItem value="continue">Continue</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative flex-1 ml-auto max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for name..."
            className="pl-9 bg-muted/50 border"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Number ▼</TableHead>
                <TableHead className="font-medium">Name ▼</TableHead>
                <TableHead className="font-medium">Department ▼</TableHead>
                <TableHead className="font-medium">Next Due ▼</TableHead>
                <TableHead colSpan={3} className="text-center font-medium border-r">
                  Current Risk
                </TableHead>
                <TableHead colSpan={2} className="text-center font-medium border-r">
                  Planned Risk
                </TableHead>
                <TableHead className="font-medium">Status ▼</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
              <TableRow className="bg-muted/30">
                <TableHead colSpan={4}></TableHead>
                <TableHead className="text-center text-xs">Overall ▼</TableHead>
                <TableHead className="text-center text-xs">Highest Score ▼</TableHead>
                <TableHead className="text-center text-xs border-r">Actions ▼</TableHead>
                <TableHead className="text-center text-xs">Overall ▼</TableHead>
                <TableHead className="text-center text-xs border-r">Highest Score ▼</TableHead>
                <TableHead colSpan={2}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((assessment, idx) => (
                <TableRow key={idx} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-destructive">{assessment.number}</TableCell>
                  <TableCell>
                    <div>
                      <div>{assessment.name}</div>
                      {assessment.involvement && (
                        <div className="text-xs text-muted-foreground mt-1">{assessment.involvement}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{assessment.department}</TableCell>
                  <TableCell>
                    {assessment.nextDue !== "-" ? (
                      <Badge 
                        variant="outline" 
                        className={
                          assessment.nextDue.includes("2024")
                            ? "bg-destructive/10 text-destructive border-destructive/30"
                            : assessment.nextDue.includes("2025")
                            ? "bg-destructive/10 text-destructive border-destructive/30"
                            : "bg-success/10 text-success border-success/30"
                        }
                      >
                        {assessment.nextDue}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={getBadgeVariant(assessment.currentRisk.overallColor)}>
                      {assessment.currentRisk.overall}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-info/10 text-info border-info/30">
                      {assessment.currentRisk.highestScore}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center border-r">
                    {assessment.currentRisk.actions !== "-" ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          {assessment.currentRisk.actions}
                        </div>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={getBadgeVariant(assessment.plannedRisk.overallColor)}>
                      {assessment.plannedRisk.overall}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center border-r">
                    <Badge variant="outline" className="bg-info/10 text-info border-info/30">
                      {assessment.plannedRisk.highestScore}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                        {assessment.status}
                      </Badge>
                      {assessment.statusIndicator && (
                        <div className="w-6 h-6 bg-foreground text-background rounded flex items-center justify-center text-xs font-bold">
                          {assessment.statusIndicator}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <button className="p-1 hover:bg-muted rounded">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-4 border-t bg-muted/20">
          <div className="flex gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Risk Assessment
            </Button>
            <Button variant="outline">Show Archive</Button>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};
