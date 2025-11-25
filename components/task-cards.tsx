interface TaskCardsProps {
  activeTab: string
}

interface TaskCard {
  title: string
  tasks: Array<{
    name: string
    red?: number
    yellow?: number
    green?: number
  }>
}

export default function TaskCards({ activeTab }: TaskCardsProps) {
  const getCards = (): TaskCard[] => {
    if (activeTab === 'module-summary') {
      return []
    }
    if (activeTab === 'assigned') {
      return [
        {
          title: 'Compliance tasks',
          tasks: [
            { name: 'Assigned action', yellow: 100 },
          ],
        },
        {
          title: 'Workflows tasks',
          tasks: [
            { name: 'Assigned action', green: 100 },
          ],
        },
      ]
    }
    
    return [
<<<<<<< HEAD
      
     
=======
      {
        title: 'Workflows tasks',
        tasks: [
          { name: 'Complete step', red: 60, green: 40 },
          { name: 'Complete action', red: 80, green: 20 },
          { name: 'Close action', green: 35 },
        ],
      },
      {
        title: 'Compliance tasks',
        tasks: [
          { name: 'Complete audit', green: 60 },
        ],
      },
      {
        title: 'Risk tasks',
        tasks: [
          { name: 'Complete assessment', green: 25 },
        ],
      },
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
    ]
  }

  const cards = getCards()

  if (cards.length === 0) return null

  return (
    <div className={`grid gap-6 mb-6 ${activeTab === 'assigned' ? 'grid-cols-2' : 'grid-cols-3'}`}>
      {cards.map((card, idx) => (
        <div key={idx} className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">{card.title}</h3>
          <div className="space-y-4">
            {card.tasks.map((task, taskIdx) => (
              <div key={taskIdx}>
                <p className="text-sm text-gray-700 mb-2">{task.name}</p>
                <div className="flex gap-2 h-2">
                  {task.red && task.red > 0 && (
                    <div
                      className="progress-red rounded-full"
                      style={{ width: `${task.red}%` }}
                    />
                  )}
                  {task.yellow && task.yellow > 0 && (
                    <div
                      className="rounded-full"
                      style={{ width: `${task.yellow}%`, backgroundColor: '#ffc107' }}
                    />
                  )}
                  {task.green && task.green > 0 && (
                    <div
                      className="progress-green rounded-full"
                      style={{ width: `${task.green}%` }}
                    />
                  )}
                  {((task.red || 0) + (task.yellow || 0) + (task.green || 0) < 100) && (
                    <div
                      className="progress-bg rounded-full"
                      style={{ width: `${100 - (task.red || 0) - (task.yellow || 0) - (task.green || 0)}%` }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
