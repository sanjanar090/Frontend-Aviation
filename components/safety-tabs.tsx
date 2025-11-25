interface SafetyTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function SafetyTabs({ activeTab, setActiveTab }: SafetyTabsProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'cases', label: 'Cases', badge: '12' },
    { id: 'drafts', label: 'Drafts' },
    { id: 'actions', label: 'Actions', badge: '2' },
    { id: 'heatmap', label: 'Heatmap' },
    { id: 'kpis', label: 'KPIs' },
    { id: 'newsletters', label: 'Safety Newsletters documents' },
  ]

  return (
    <div className="flex items-center gap-1 border-b" style={{ borderColor: 'var(--border-light)' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-3 font-medium transition-colors flex items-center gap-2 ${
            activeTab === tab.id
              ? 'border-b-2 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{
            borderBottomColor: activeTab === tab.id ? 'var(--primary-blue)' : 'transparent',
            color: activeTab === tab.id ? 'var(--primary-blue)' : 'var(--text-light)',
          }}
        >
          {tab.label}
          {tab.badge && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--border-light)', color: 'var(--text-light)' }}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
