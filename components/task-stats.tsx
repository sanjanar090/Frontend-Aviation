interface TaskStatsProps {
  activeTab: string
}

export default function TaskStats({ activeTab }: TaskStatsProps) {
  const getStats = () => {
    if (activeTab === 'module-summary') {
      return {
        title: '',
        badges: [],
        showAddAction: false,
      }
    }
<<<<<<< HEAD
    
=======
    if (activeTab === 'assigned') {
      return {
        title: 'Tasks I have assigned to others',
        badges: [2, 1],
        showAddAction: true,
      }
    }
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
    return {
      title: 'My tasks',
      badges: [3, 6, 1],
      showAddAction: true,
    }
  }

  const stats = getStats()

  if (!stats.title) return null

  return (
<<<<<<< HEAD
   <h1></h1>
  )

}
=======
    <div className="card px-6 py-4 mb-6 flex items-center gap-4">
      <span className="font-semibold text-gray-900">{stats.title}</span>
      <div className="flex gap-3">
        {stats.badges.map((badge, idx) => {
          const badgeClass = activeTab === 'assigned' 
            ? (idx === 0 ? 'badge-gray' : 'badge-gray')
            : (idx === 0 ? 'badge-red' : idx === 1 ? 'badge-green' : 'badge-gray')
          return (
            <span key={idx} className={badgeClass}>
              {badge}
            </span>
          )
        })}
      </div>
      {stats.showAddAction && (
        <button className="btn-primary ml-auto flex items-center gap-2">
          ➕ Add Action
        </button>
      )}
    </div>
  )
}
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
