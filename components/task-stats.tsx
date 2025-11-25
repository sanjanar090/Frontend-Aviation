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
    
    return {
      title: 'My tasks',
      badges: [3, 6, 1],
      showAddAction: true,
    }
  }

  const stats = getStats()

  if (!stats.title) return null

  return (
   <h1></h1>
  )

}