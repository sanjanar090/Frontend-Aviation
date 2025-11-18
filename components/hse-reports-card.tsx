export default function HSEReportsCard() {
  const reports = [
    { id: 'HSE-01', label: 'Minor Accident Report' },
    { id: 'HSE-04', label: 'Hazardous Environment Report' },
  ]

  return (
    <div className="bg-white rounded-lg border p-6" style={{ borderColor: 'var(--border-light)' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold" style={{ color: 'var(--text-dark)' }}>
          Health, Safety and Environment reports
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <button
          className="w-full px-4 py-2.5 font-semibold text-white rounded transition-all hover:opacity-90 flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--primary-blue)' }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Start new report
        </button>

        <div>
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-light)' }}>
            Start your frequently used reports:
          </p>
          <div className="space-y-2">
            {reports.map((report) => (
              <a
                key={report.id}
                href="#"
                className="block text-sm font-medium hover:underline transition-colors"
                style={{ color: 'var(--primary-blue)' }}
              >
                {report.id} - {report.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
