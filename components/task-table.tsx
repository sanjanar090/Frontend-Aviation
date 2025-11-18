import { ChevronRight } from 'lucide-react'

interface TableRow {
  module: string
  task: string
  title: string
  dueDate?: string
  assignedTo: string
}

interface TaskTableProps {
  activeTab: string
}

export default function TaskTable({ activeTab }: TaskTableProps) {
  const getRows = (): TableRow[] => {
    if (activeTab === 'module-summary') {
      return []
    }
    if (activeTab === 'assigned') {
      return [
        {
          module: 'Workflows - Workflows',
          task: 'Assigned action',
          title: 'WKF-000049 - Workflow 01 Action',
          dueDate: '11/11/2025',
          assignedTo: 'Matko Dadic',
        },
        {
          module: 'Compliance - Audit - Internal Compliance Monitoring',
          task: 'Assigned action',
          title: 'CMS-000073 - Document information regarding route cause analysis & provide info',
          dueDate: '20/11/2025',
          assignedTo: 'Florent Dufour',
        },
        {
          module: 'Compliance - Audit - Internal Compliance Monitoring',
          task: 'Assigned action',
          title: 'CMS-000074 - Document information regarding root cause analysis and provide info to Authority',
          dueDate: '28/11/2025',
          assignedTo: 'Kristijan Madjanovic',
        },
      ]
    }

    return [
      {
        module: 'Workflows - Workflows',
        task: 'Complete step',
        title: 'Air Senegal support in DSS airport for 9H-SZN - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval',
        assignedTo: 'Matko Dadic',
      },
      {
        module: 'Workflows - Workflows',
        task: 'Complete step',
        title: 'test3 - Final Management review and approval (final draft had to be provided) - Accountable Manager final review and approval',
        assignedTo: 'Matko Dadic',
      },
      {
        module: 'Workflows - Workflows',
        task: 'Complete action',
        title: 'WKF-000043 - Update email signature with new approval number',
        dueDate: '19/08/2024',
        assignedTo: 'Matko Dadic',
      },
    ]
  }

  const rows = getRows()

  if (rows.length === 0) return null

  const getDateColor = (date: string) => {
    if (date === '11/11/2025') return { bg: '#e8f5e9', border: '#4caf50', text: '#2e7d32' }
    if (date === '20/11/2025') return { bg: '#fffde7', border: '#fbc02d', text: '#f57f17' }
    if (date === '28/11/2025') return { bg: '#ffe0b2', border: '#ff9800', text: '#e65100' }
    return { bg: '#ffe6e6', border: '#cc3333', text: '#cc3333' }
  }

  return (
    <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border-light)', backgroundColor: 'white' }}>
      <table className="w-full">
        <thead style={{ backgroundColor: 'var(--light-gray)', borderBottomColor: 'var(--border-light)' }} className="border-b">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Module</th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Task</th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Title</th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Due date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Assigned to</th>
            <th className="px-6 py-4 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const dateColor = row.dueDate ? getDateColor(row.dueDate) : null
            return (
              <tr key={idx} className="border-b transition-colors" style={{ borderBottomColor: 'var(--border-light)' }}>
                <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-light)' }}>{row.module}</td>
                <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-light)' }}>{row.task}</td>
                <td className="px-6 py-4 text-sm" style={{ color: 'var(--text-dark)' }}>{row.title}</td>
                <td className="px-6 py-4 text-sm">
                  {row.dueDate && dateColor && (
                    <span 
                      className="border px-2 py-1 rounded text-sm font-medium" 
                      style={{ borderColor: dateColor.border, color: dateColor.text, backgroundColor: dateColor.bg }}
                    >
                      {row.dueDate}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: 'var(--primary-blue)' }}></div>
                    <span className="text-sm" style={{ color: 'var(--text-dark)' }}>{row.assignedTo}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 rounded transition-colors" style={{ color: 'var(--text-light)' }}>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
