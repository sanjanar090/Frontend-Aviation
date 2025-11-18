interface WorkflowsTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function WorkflowsTabs({ activeTab, onTabChange }: WorkflowsTabsProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'steps', label: 'My workflow steps', badge: '5' },
    { id: 'change', label: 'Management of change' },
    { id: 'workflows', label: 'Workflows' },
    { id: 'actions', label: 'Actions', badge: '20' },
  ]

  return (
    <div className="flex gap-0 border-b border-medium-gray bg-white rounded-t-lg">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`tabs-underline ${activeTab === tab.id ? 'active' : ''}`}
        >
          {tab.label}
          {tab.badge && <span className="ml-2 bg-light-gray text-text-dark text-xs rounded-full px-2 py-0.5">{tab.badge}</span>}
        </button>
      ))}
    </div>
  )
}
