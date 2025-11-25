export default function AuditCard() {
  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-dark)' }}>Audit - Internal Compliance Monitoring (27)</h3>
        <a href="#" className="text-sm font-medium" style={{ color: 'var(--primary-blue)' }}>View checklists and schedules</a>
      </div>
      
      <div className="flex gap-8">
        {/* Donut Chart */}
        <div className="flex-1 flex items-center justify-center">
          <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
            {/* Green segment (Ok: 10/27 = 37%) */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="var(--accent-green)"
              strokeWidth="30"
              strokeDasharray={`${(10/27) * 440} 440`}
            />
            {/* Red segment (Overdue: 17/27 = 63%) */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="var(--accent-red)"
              strokeWidth="30"
              strokeDasharray={`${(17/27) * 440} 440`}
              strokeDashoffset={-((10/27) * 440)}
            />
            <circle cx="100" cy="100" r="50" fill="white" />
            <text x="100" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="var(--text-dark)">27</text>
            <text x="100" y="115" textAnchor="middle" fontSize="12" fill="var(--text-light)">scheduled</text>
          </svg>
        </div>
        
        {/* Legend and Findings */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent-green)' }}></div>
              <span className="text-sm" style={{ color: 'var(--text-dark)' }}>Ok (10)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent-red)' }}></div>
              <span className="text-sm" style={{ color: 'var(--text-dark)' }}>Overdue (17)</span>
            </div>
          </div>
          
          <div className="pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>Findings (3)</h4>
            <div className="h-2 bg-gray-200 rounded overflow-hidden flex mb-2">
              <div className="w-2/3 progress-red"></div>
              <div className="w-1/3" style={{ backgroundColor: '#ff8c00' }}></div>
            </div>
            <a href="#" className="text-sm font-medium" style={{ color: 'var(--primary-blue)' }}>View findings</a>
          </div>
          
          <div className="pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
            <h4 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Actions (12)</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
