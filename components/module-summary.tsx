export default function ModuleSummary() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {/* Compliance Module */}
      <div className="card p-6 col-span-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 flex items-center justify-center" style={{ color: 'var(--primary-blue)' }}>
            📋
          </div>
          <h3 className="font-semibold text-gray-900">Compliance Module</h3>
        </div>
        <div className="space-y-3">
          {/* Compliance items */}
          <div>
            <p className="text-sm font-medium text-gray-900">Compliance</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-600">Audit - Internal Compliance Monitoring</p>
              <div className="flex gap-2">
                <span className="badge-green text-xs px-2 py-1">3</span>
                <span className="badge-red text-xs px-2 py-1">1</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">Out of Base Management Audits</p>
              <span className="badge-gray text-xs px-2 py-1">1</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">Findings Open</p>
              <div className="flex gap-2">
                <span className="badge-gray text-xs px-2 py-1">1</span>
                <span className="badge-red text-xs px-2 py-1">2</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">Findings Corrective / Preventative Action Plans Required</p>
              <span className="badge-red text-xs px-2 py-1">3</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">Actions</p>
              <div className="flex gap-2">
                <span className="badge-green text-xs px-2 py-1">3</span>
                <span className="badge-gray text-xs px-2 py-1">2</span>
                <span className="badge-red text-xs px-2 py-1">10</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600">Audit - Competent Authorities</p>
          </div>

          <div>
            <p className="text-xs text-gray-600">Customer Audits</p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">Findings Corrective / Preventative Action Plans Received</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-600">Findings Open</p>
          </div>
        </div>
      </div>

      {/* Data Protection & Risk Module */}
      <div className="col-span-2 space-y-6">
        {/* Data Protection */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 flex items-center justify-center" style={{ color: 'var(--primary-blue)' }}>
              📊
            </div>
            <h3 className="font-semibold text-gray-900">Data Protection</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Status</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Data Retention Status</p>
            </div>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700 mt-2">
              View all →
            </button>
          </div>
        </div>

        {/* Risk Module */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 flex items-center justify-center" style={{ color: 'var(--primary-blue)' }}>
              ⚠️
            </div>
            <h3 className="font-semibold text-gray-900">Risk Module</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">Risk Assessments</p>
              <span className="badge-red text-xs px-2 py-1">8</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">Actions</p>
              <span className="badge-red text-xs px-2 py-1">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Module */}
      <div className="card p-6 col-span-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 flex items-center justify-center" style={{ color: 'var(--primary-blue)' }}>
            ⚙️
          </div>
          <h3 className="font-semibold text-gray-900">Workflow Module</h3>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-900">Workflows</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">Workflow Actions</p>
            <div className="flex gap-2">
              <span className="badge-green text-xs px-2 py-1">2</span>
              <span className="badge-red text-xs px-2 py-1">18</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">Contracts</p>
            <div className="flex gap-2">
              <span className="badge-green text-xs px-2 py-1">3</span>
              <span className="badge-red text-xs px-2 py-1">1</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-600">Suspension or Revocation of Company authorisation</p>
              <button className="text-xs px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-medium">
                Start
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-gray-600">Certification Authorisation issue 01</p>
              <div className="flex gap-2">
                <span className="badge-green text-xs px-2 py-1">3</span>
                <span className="badge-red text-xs px-2 py-1">2</span>
              </div>
            </div>
            <button className="text-xs px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-medium mt-1 w-full">
              Start
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-gray-600">Certification Authorization renewal</p>
              <div className="flex gap-2">
                <span className="badge-green text-xs px-2 py-1">3</span>
                <span className="badge-red text-xs px-2 py-1">2</span>
              </div>
            </div>
            <button className="text-xs px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-medium mt-1 w-full">
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
