import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const actionsData = [
  {
    name: "All Actions",
    requireAttention: 2,
    overdue: null,
    rejected: null,
    completed: null,
    inProgressOpen: null,
    inProgressPending: null,
    closed: 2,
  },
  {
    name: 'Department "Compliance Monitoring"',
    requireAttention: null,
    overdue: null,
    rejected: null,
    completed: null,
    inProgressOpen: null,
    inProgressPending: null,
    closed: 2,
    isDepartment: true,
  },
  {
    name: "Okicki, Tihomir",
    requireAttention: 2,
    overdue: null,
    rejected: null,
    completed: null,
    inProgressOpen: null,
    inProgressPending: null,
    closed: null,
  },
];

export const ActionsView = () => {
  return (
    <div className="space-y-6">
      {/* Info Banner */}
     <div className="w-full border border-blue-200 rounded-md overflow-hidden flex">

  {/* LEFT GRADIENT BAR */}
  <div
    className="text-white px-4 py-5 flex items-start justify-center min-w-[52px]"
    style={{
      backgroundImage: "linear-gradient(180deg, #126fd6, #57aaff)",
    }}
  >
    <span className="text-lg font-semibold">i</span>
  </div>

  {/* RIGHT TEXT */}
  <div className="p-4 text-sm text-gray-700 leading-relaxed">
    The number of actions for each user includes assigned actions and delegated actions, therefore the sum of actions for all users may not equate to the total number of All Actions displayed.
Furthermore, the numbers shown below may include actions which you do not have permission to view.

  </div>

</div>


      {/* Filters Section */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Module:</span>
            <Select defaultValue="risk-module">
              <SelectTrigger className="w-[180px] border bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="risk-module">Risk Module</SelectItem>
                <SelectItem value="all">All Modules</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active/Inactive users:</span>
            <Select defaultValue="all-users">
              <SelectTrigger className="w-[250px] border bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="all-users">All users with open actions</SelectItem>
                <SelectItem value="active">Active users only</SelectItem>
                <SelectItem value="inactive">Inactive users only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Action Status:</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px] border bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button variant="outline" className="gap-2">
          <List className="h-4 w-4" />
          Show legend
        </Button>
      </div>

      {/* Actions Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-medium text-sm" rowSpan={2}>Name</th>
                <th className="text-center p-2 font-medium text-sm border-l" colSpan={4}>
                  Require Attention
                  <Badge variant="destructive" className="ml-2 rounded-full w-6 h-6 flex items-center justify-center p-0">
                    2
                  </Badge>
                </th>
                <th className="text-center p-2 font-medium text-sm border-l" colSpan={2}>In Progress</th>
                <th className="text-center p-2 font-medium text-sm border-l">
                  Closed
                  <Badge className="ml-2 rounded-full w-6 h-6 flex items-center justify-center p-0 bg-success text-success-foreground">
                    2
                  </Badge>
                </th>
              </tr>
              <tr className="border-b bg-muted/30">
                <th className="text-center p-2 text-xs font-medium text-muted-foreground border-l">Overdue</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Rejected</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Completed</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground"></th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground border-l">Open</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Pending</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground border-l"></th>
              </tr>
            </thead>
            <tbody>
              {actionsData.map((action, idx) => (
                <tr key={idx} className="border-b hover:bg-muted/20">
                  <td className={`p-4 ${action.isDepartment ? 'font-normal' : 'font-medium'}`}>
                    {action.name}
                  </td>
                  <td className="text-center p-2 border-l">
                    {action.requireAttention && (
                      <Badge variant="destructive" className="rounded-full w-7 h-7 flex items-center justify-center p-0 mx-auto">
                        {action.requireAttention}
                      </Badge>
                    )}
                  </td>
                  <td className="text-center p-2">
                    {action.overdue && (
                      <Badge variant="destructive" className="rounded-full w-7 h-7 flex items-center justify-center p-0 mx-auto">
                        {action.overdue}
                      </Badge>
                    )}
                  </td>
                  <td className="text-center p-2">
                    {action.rejected && (
                      <Badge variant="destructive" className="rounded-full w-7 h-7 flex items-center justify-center p-0 mx-auto">
                        {action.rejected}
                      </Badge>
                    )}
                  </td>
                  <td className="text-center p-2">
                    {action.completed && (
                      <Badge variant="destructive" className="rounded-full w-7 h-7 flex items-center justify-center p-0 mx-auto">
                        {action.completed}
                      </Badge>
                    )}
                  </td>
                  <td className="text-center p-2 border-l">
                    {action.inProgressOpen && (
                      <Badge className="rounded-full w-7 h-7 flex items-center justify-center p-0 mx-auto bg-primary text-primary-foreground">
                        {action.inProgressOpen}
                      </Badge>
                    )}
                  </td>
                  <td className="text-center p-2">
                    {action.inProgressPending && (
                      <Badge className="rounded-full w-7 h-7 flex items-center justify-center p-0 mx-auto bg-primary text-primary-foreground">
                        {action.inProgressPending}
                      </Badge>
                    )}
                  </td>
                  <td className="text-center p-2 border-l">
                    {action.closed && (
                      <Badge className="rounded-full w-7 h-7 flex items-center justify-center p-0 mx-auto bg-success text-success-foreground">
                        {action.closed}
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
