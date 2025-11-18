export default function HSEMORCard() {
  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: 'var(--border-light)' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold" style={{ color: 'var(--text-dark)' }}>
          All open MORs
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
          <rect x="15" y="20" width="45" height="55" fill="#22C55E" rx="2" />
          <circle cx="65" cy="35" r="12" fill="#0066cc" />
          <path d="M65 35 L68 32 L72 36 L68 40 Z" fill="#FFFFFF" />
          <circle cx="70" cy="60" r="20" fill="#3B82F6" opacity="0.3" />
          <path d="M75 55 L85 65 L80 70 Z" fill="#D97706" />
        </svg>
        <p className="text-center text-gray-600">No All open MORs to show</p>
      </div>
    </div>
  )
}
