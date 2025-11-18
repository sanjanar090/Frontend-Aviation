'use client'

import { useState } from 'react'
import { ChevronRight, Settings, Download } from 'lucide-react'

export default function RegulationsContent() {
  const [activeTab, setActiveTab] = useState('regulations')
  const [expandedItems, setExpandedItems] = useState<string[]>(['all-regulations'])

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'regulations', label: 'Regulations' },
    { id: 'amendments', label: 'Amendments' },
    { id: 'actions', label: 'Actions' },
    { id: 'manage', label: 'Manage' },
  ]

  const regulations = [
    { id: 'easa', label: 'EASA Regulations' },
    { id: 'uk', label: 'UK Regulations' },
  ]

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const isExpanded = (id: string) => expandedItems.includes(id)

  return (
    <div className="p-6 space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b" style={{ borderColor: 'var(--border-light)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tabs-underline px-4 py-2 ${activeTab === tab.id ? 'active' : 'text-gray-600'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {activeTab === 'regulations' && (
        <div className="grid grid-cols-2 gap-6 h-full">
          {/* Left Panel - Regulations List */}
          <div className="bg-white rounded-lg border" style={{ borderColor: 'var(--border-light)' }}>
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-light)' }}>
              <h3 className="font-semibold" style={{ color: 'var(--text-dark)' }}>
                All regulations (2)
              </h3>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Settings className="w-4 h-4" style={{ color: 'var(--text-light)' }} />
              </button>
            </div>

            <div className="p-4 space-y-2">
              {/* Main item */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleExpanded('all-regulations')}
                  className="w-full flex items-center gap-2 text-left hover:bg-gray-50 p-2 rounded"
                >
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${isExpanded('all-regulations') ? 'rotate-90' : ''}`}
                    style={{ color: 'var(--text-light)' }}
                  />
                  <span style={{ color: 'var(--text-dark)' }} className="text-sm">
                    All regulations
                  </span>
                </button>

                {/* Nested items */}
                {isExpanded('all-regulations') && (
                  <div className="pl-4 space-y-1">
                    {regulations.map((reg) => (
                      <button
                        key={reg.id}
                        className="w-full flex items-center gap-2 text-left hover:bg-gray-50 p-2 rounded cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-light)' }} />
                        <span style={{ color: 'var(--text-dark)' }} className="text-sm">
                          {reg.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Empty State */}
          <div className="bg-white rounded-lg border flex items-center justify-center flex-col gap-4" style={{ borderColor: 'var(--border-light)' }}>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              {/* Document and search icon */}
              <rect x="30" y="20" width="50" height="70" fill="#E8F0F8" rx="4" />
              <circle cx="90" cy="80" r="25" fill="none" stroke="#0066cc" strokeWidth="3" />
              <path d="M105 95L115 105" stroke="#0066cc" strokeWidth="3" strokeLinecap="round" />
              <rect x="38" y="35" width="30" height="8" fill="#00AA44" rx="2" />
              <rect x="38" y="48" width="30" height="6" fill="#CCCCCC" rx="2" />
              <rect x="38" y="58" width="30" height="6" fill="#CCCCCC" rx="2" />
            </svg>
            <p className="text-center" style={{ color: 'var(--text-dark)' }}>
              No Regulations selected.
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-between">
        <button className="px-4 py-2 border rounded font-medium" style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)' }}>
          Hide Empty Sections
        </button>
        <button className="px-4 py-2 border rounded font-medium flex items-center gap-2" style={{ borderColor: 'var(--primary-blue)', color: 'var(--primary-blue)' }}>
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  )
}
