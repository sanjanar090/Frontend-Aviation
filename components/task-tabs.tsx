interface TaskTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TaskTabs({ activeTab, setActiveTab }: TaskTabsProps) {
  const tabs = [
    { id: 'my-tasks', label: 'My tasks' },
    { id: 'assigned', label: 'Tasks assigned' },
    { id: 'module-dashboard', label: 'Module dashboard' },
    { id: 'module-summary', label: 'Module summary' },
  ]

  return (
    <div className="flex gap-8 border-b border-gray-200 mb-6 bg-white px-6 py-4 rounded-t-lg">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-3 font-medium transition-colors ${
            activeTab === tab.id
              ? 'border-b-2 border-red-600 text-red-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
      <button className="ml-auto text-blue-600 text-sm font-medium hover:text-blue-700">
        📋 Show legend
      </button>
    </div>
  )
}
