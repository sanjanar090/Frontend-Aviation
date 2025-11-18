export default function WorkflowsActionsCard() {
  return (
    <div className="card p-6 bg-white">
      <h3 className="text-gray-700 font-semibold mb-4">All actions (20)</h3>
      
      <div className="flex items-center justify-between">
        {/* Donut Chart */}
        <div className="flex flex-col items-center">
          <svg width="160" height="160" viewBox="0 0 160 160" className="mb-4">
            {/* Background circle */}
            <circle cx="80" cy="80" r="70" fill="none" stroke="#f0f0f0" strokeWidth="16" />
            
            {/* Red segment (Overdue - 18/20 = 324 degrees) */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#cc3333"
              strokeWidth="16"
              strokeDasharray="395.84 879.65"
              strokeDashoffset="0"
              transform="rotate(-90 80 80)"
            />
            
            {/* Green segment (Completed - 2/20 = 36 degrees) */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#22863a"
              strokeWidth="16"
              strokeDasharray="43.98 879.65"
              strokeDashoffset="-395.84"
              transform="rotate(-90 80 80)"
            />
            
            {/* Center text */}
            <text x="80" y="85" textAnchor="middle" className="text-2xl font-bold fill-text-dark" fontSize="32">
              20
            </text>
            <text x="80" y="105" textAnchor="middle" className="fill-text-light" fontSize="14">
              actions
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#22863a' }}></div>
            <span className="text-gray-600 text-sm">Completed (2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#cc3333' }}></div>
            <span className="text-gray-600 text-sm">Overdue (18)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
