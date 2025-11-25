interface HSETabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function HSETabs({ activeTab, setActiveTab }: HSETabsProps) {
<<<<<<< HEAD
  
  return (
    <h1></h1>
=======
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'cases', label: 'Cases' },
    { id: 'drafts', label: 'Drafts' },
    { id: 'heatmap', label: 'Heatmap' },
    { id: 'kpis', label: 'KPIs' },
  ]

  return (
    <div className="flex items-center gap-1 border-b px-6" style={{ borderColor: 'var(--border-light)' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-3 font-medium transition-colors flex items-center gap-2 ${
            activeTab === tab.id
              ? 'border-b-2'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          style={{
            borderBottomColor: activeTab === tab.id ? 'var(--primary-blue)' : 'transparent',
            color: activeTab === tab.id ? 'var(--primary-blue)' : 'var(--text-light)',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
  )
}
