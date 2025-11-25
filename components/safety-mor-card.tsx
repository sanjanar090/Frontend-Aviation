export default function SaftyMORCard() {
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

      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <svg className="w-24 h-24 opacity-60" viewBox="0 0 100 100" fill="none">
          {/* Document/folder shape in green */}
          <path d="M25 30 L25 70 Q25 75 30 75 L70 75 Q75 75 75 70 L75 35 Q75 30 70 30 L50 30 L45 25 Q42 22 38 22 L30 22 Q25 22 25 27 Z" fill="#22863a" opacity="0.7" />
          {/* Blue circle with magnifying glass */}
          <circle cx="70" cy="55" r="18" fill="#0066cc" opacity="0.8" />
          <circle cx="70" cy="55" r="14" fill="none" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="80" y1="65" x2="85" y2="70" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {/* Light cloud/empty indicator */}
          <path d="M50 65 Q45 62 40 65 Q35 65 35 70 Q35 75 40 75 L60 75 Q65 75 65 70 Q65 62 60 60 Q65 55 60 50" fill="none" stroke="#d0d0d0" strokeWidth="2" opacity="0.5" />
        </svg>
        <p style={{ color: 'var(--text-light)' }} className="text-center text-sm font-medium">
          No All open MORs to show
        </p>
      </div>
    </div>
  )
}
