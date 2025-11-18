export default function SafetyTasksContent() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="w-32 h-32 flex items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--light-bg)' }}>
        <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
          <rect x="15" y="10" width="70" height="60" rx="4" stroke="#ddd" strokeWidth="2" fill="white" />
          <line x1="20" y1="20" x2="45" y2="20" stroke="#ddd" strokeWidth="1" />
          <line x1="20" y1="30" x2="80" y2="30" stroke="#ddd" strokeWidth="1" />
          <line x1="20" y1="40" x2="80" y2="40" stroke="#ddd" strokeWidth="1" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="#ddd" strokeWidth="1" />
          <circle cx="70" cy="75" r="12" fill="#f0a000" />
          <path d="M 70 65 L 75 75 L 65 75" fill="white" />
        </svg>
      </div>
      <p className="text-lg font-medium" style={{ color: 'var(--text-dark)' }}>You don't have any outstanding tasks</p>
    </div>
  )
}
