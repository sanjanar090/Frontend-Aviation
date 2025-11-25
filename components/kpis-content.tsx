'use client'

import { useState } from 'react'

export default function KpisContent() {
  const [activeKpiTab, setActiveKpiTab] = useState('reference-values')
  const [selectedYear, setSelectedYear] = useState('2025')

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b" style={{ borderColor: 'var(--border-light)' }}>
        <button
          onClick={() => setActiveKpiTab('reference-values')}
          className={`px-4 py-3 font-medium transition-colors ${activeKpiTab === 'reference-values' ? 'border-b-2' : ''}`}
          style={{
            borderBottomColor: activeKpiTab === 'reference-values' ? 'var(--primary-blue)' : 'transparent',
            color: activeKpiTab === 'reference-values' ? 'var(--primary-blue)' : 'var(--text-light)',
          }}
        >
          Reference values
        </button>
        <button
          onClick={() => setActiveKpiTab('templates')}
          className={`px-4 py-3 font-medium transition-colors ${activeKpiTab === 'templates' ? 'border-b-2' : ''}`}
          style={{
            borderBottomColor: activeKpiTab === 'templates' ? 'var(--primary-blue)' : 'transparent',
            color: activeKpiTab === 'templates' ? 'var(--primary-blue)' : 'var(--text-light)',
          }}
        >
          KPI Report Templates
        </button>
      </div>

      {activeKpiTab === 'reference-values' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="px-4 py-2 rounded border" style={{ borderColor: 'var(--border-light)', color: 'var(--text-dark)' }}>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>

          <div className="overflow-x-auto border rounded-lg" style={{ borderColor: 'var(--border-light)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: 'var(--light-bg)' }}>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-dark)' }}>Reference</th>
                  <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--text-dark)' }}>Scope</th>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                    <th key={month} className="px-4 py-3 text-center font-semibold text-xs" style={{ color: 'var(--text-dark)' }}>{month}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid var(--border-light)`, backgroundColor: 'var(--light-bg)' }}>
                  <td colSpan={14} className="px-4 py-6 text-center" style={{ color: 'var(--text-dark)' }}>
                    No KPI references have been defined - use the "Define References" button to create one
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded text-white font-medium flex items-center gap-2" style={{ backgroundColor: 'var(--primary-blue)' }}>
              ✎ Edit
            </button>
            <button className="px-4 py-2 rounded border font-medium" style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)' }}>
              Define References
            </button>
          </div>
        </div>
      )}

      {activeKpiTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6" style={{ borderColor: 'var(--border-light)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-dark)' }}>KPI Report Template</th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-dark)' }}>Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2} className="px-4 py-6 text-center" style={{ color: 'var(--text-dark)' }}>
                    No KPI report templates have been defined - use the "New Template" button to create one
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 rounded text-white font-medium flex items-center gap-2" style={{ backgroundColor: 'var(--primary-blue)' }}>
              ✎ Edit
            </button>
            <button className="px-4 py-2 rounded border font-medium flex items-center gap-2" style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)' }}>
              + New Template
            </button>
            <button className="px-4 py-2 rounded border font-medium" style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)' }}>
              One-Off Report
            </button>
            <button className="px-4 py-2 rounded border font-medium" style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)' }}>
              References
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
