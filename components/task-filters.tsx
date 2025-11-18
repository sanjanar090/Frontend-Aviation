import { ChevronDown, Search } from 'lucide-react'

export default function TaskFilters() {
  const filters = [
    { icon: '📅', label: 'Due date: All time' },
    { icon: '⭕', label: 'Status: All' },
    { icon: '📋', label: 'Task: All' },
    { icon: '🏷️', label: 'Type: All' },
    { icon: '📦', label: 'Module: All' },
    { icon: '👤', label: 'Assigned to: All' },
  ]

  return (
    <div className="flex gap-3 mb-6 items-center">
      {filters.map((filter, idx) => (
        <button
          key={idx}
          className="bg-white px-4 py-2 rounded border text-sm font-medium transition-colors"
          style={{
            borderColor: 'var(--border-light)',
            color: 'var(--text-dark)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          {filter.label}
          <ChevronDown className="w-4 h-4 inline ml-1" />
        </button>
      ))}
      <div className="ml-auto relative">
        <input
          type="text"
          placeholder="Search tasks..."
          className="px-4 py-2 border rounded w-64 text-sm bg-white"
          style={{ borderColor: 'var(--border-light)' }}
        />
        <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
}
