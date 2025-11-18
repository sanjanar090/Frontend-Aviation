export default function WorkflowsEmptyCard() {
  return (
    <div className="card p-6 bg-white flex flex-col items-center justify-center min-h-80">
      <h3 className="text-gray-700 font-semibold mb-6">Workflows (0)</h3>
      
      {/* Illustration placeholder */}
      <div className="w-32 h-32 mb-4 bg-light-gray rounded-lg flex items-center justify-center">
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-light-gray">
          <rect x="15" y="10" width="50" height="60" fill="none" stroke="currentColor" strokeWidth="2" rx="4" />
          <line x1="20" y1="25" x2="60" y2="25" stroke="currentColor" strokeWidth="1" />
          <line x1="20" y1="35" x2="60" y2="35" stroke="currentColor" strokeWidth="1" />
          <line x1="20" y1="45" x2="45" y2="45" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      
      <p className="text-gray-600 text-center">No outstanding workflows</p>
    </div>
  )
}
