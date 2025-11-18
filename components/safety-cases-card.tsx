'use client'

export default function SafetyCasesCard() {
  const caseStats = [
    { label: 'Investigate', value: 9, color: '#0066cc' },
    { label: 'Monitor', value: 1, color: '#22863a' },
    { label: 'Ready to Close', value: 2, color: '#7b68ee' },
  ]

  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: 'var(--border-light)' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold" style={{ color: 'var(--text-dark)' }}>
          All open cases (12)
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            {/* Light gray background */}
            <circle cx="60" cy="60" r="45" fill="none" stroke="#e0e0e0" strokeWidth="14" />
            
            {/* Blue segment - Investigate (9/12 = 270 degrees) */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#0066cc"
              strokeWidth="14"
              strokeDasharray="212 283"
              strokeDashoffset="0"
              transform="rotate(-90 60 60)"
            />
            
            {/* Green segment - Monitor (1/12 = 30 degrees) */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#22863a"
              strokeWidth="14"
              strokeDasharray="24 283"
              strokeDashoffset="-212"
              transform="rotate(-90 60 60)"
            />
            
            {/* Purple segment - Ready to Close (2/12 = 60 degrees) */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#7b68ee"
              strokeWidth="14"
              strokeDasharray="47 283"
              strokeDashoffset="-236"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>12</span>
            <span className="text-sm" style={{ color: 'var(--text-light)' }}>cases</span>
          </div>
        </div>

        <div className="space-y-2 w-full">
          {caseStats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }} />
              <span style={{ color: 'var(--text-light)' }} className="text-sm">
                {stat.label} ({stat.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
