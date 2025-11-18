export default function FindingsCard() {
  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: 'var(--text-dark)' }}>Findings (3)</h3>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-dark)' }}>Created</p>
          <div className="h-2 bg-gray-200 rounded overflow-hidden">
            <div className="h-full w-full progress-red"></div>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-dark)' }}>Responded</p>
          <div className="h-2 bg-gray-200 rounded overflow-hidden flex">
            <div className="w-1/3" style={{ backgroundColor: '#ff8c00' }}></div>
            <div className="w-2/3 progress-bg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
