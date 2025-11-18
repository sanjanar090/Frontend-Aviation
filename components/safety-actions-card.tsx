'use client'

export default function SafetyActionsCard() {
  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: 'var(--border-light)' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold" style={{ color: 'var(--text-dark)' }}>
          All actions (2)
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e8d5d5" strokeWidth="10" />
            {/* Red progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="var(--accent-red)"
              strokeWidth="10"
              strokeDasharray="314 314"
              opacity="0.9"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>2</span>
            <span className="text-sm" style={{ color: 'var(--text-light)' }}>actions</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent-red)' }} />
          <span style={{ color: 'var(--accent-red)' }} className="font-medium">Overdue (2)</span>
        </div>
      </div>
    </div>
  )
}
