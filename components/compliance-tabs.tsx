interface ComplianceTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function ComplianceTabs({ activeTab, setActiveTab }: ComplianceTabsProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'my-audits', label: 'My audits', badge: '3' },
    { id: 'my-findings', label: 'My findings' },
    { id: 'checklists', label: 'Checklists schedule' },
    { id: 'third-parties', label: 'Third parties' },
    { id: 'surveys', label: 'Surveys' },
    { id: 'findings', label: 'Findings' },
    { id: 'actions', label: 'Actions', badge: '15' },
    { id: 'heatmap', label: 'Heatmap' },
    { id: 'kpis', label: 'KPIs' },
  ]

  return (
    <div className="flex gap-2 border-b" style={{ borderColor: 'var(--border-light)' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`tabs-underline flex items-center gap-2 ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.label}
          {tab.badge && (
            <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--light-gray)', color: 'var(--text-dark)' }}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
