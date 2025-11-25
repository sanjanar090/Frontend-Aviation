export default function SurveysCard() {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-dark)' }}>Surveys (1)</h3>
        <a href="#" className="text-sm font-medium" style={{ color: 'var(--primary-blue)' }}>View surveys</a>
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-dark)' }}>Satisfaction Survey</p>
        <div className="h-2 bg-gray-200 rounded overflow-hidden">
          <div className="h-full w-full progress-red"></div>
        </div>
      </div>
    </div>
  )
}
