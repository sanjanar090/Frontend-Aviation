import { ChevronDown, Search } from 'lucide-react'

export default function TaskFilters() {
  const filters = [
    
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
      
    </div>
  )
}
