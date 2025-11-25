import WorkflowsActionsCard from '@/components/workflows-actions-card'
import WorkflowsEmptyCard from '@/components/workflows-empty-card'
import WorkflowsTasksSection from '@/components/workflows-tasks-section'
import WorkflowsTasksTable from '@/components/workflows-tasks-table'

export default function WorkflowsContent() {
  return (
    <div className="space-y-6">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 gap-6">
        <WorkflowsActionsCard />
        <WorkflowsEmptyCard />
      </div>

      {/* My Workflows Tasks Section */}
      <WorkflowsTasksSection />

      {/* Filters and Table */}
      <WorkflowsTasksTable />
    </div>
  )
}
