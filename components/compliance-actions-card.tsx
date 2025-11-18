export default function ActionsCard() {
  const actions = [
    { name: 'Customer Audits', red: 10, green: 0, yellow: 0, gray: 90 },
    { name: 'Audit - Internal Compliance Monitoring', red: 30, green: 50, yellow: 10, gray: 10 },
    { name: 'Audit - Competent Authorities', red: 5, green: 0, yellow: 0, gray: 95 },
    { name: 'Contracted Organisation Surveys', red: 0, green: 0, yellow: 0, gray: 100 },
    { name: 'Self-Audits', red: 0, green: 0, yellow: 0, gray: 100 },
    { name: 'Out of Base Management Audits', red: 0, green: 0, yellow: 0, gray: 100 },
  ]

  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-lg font-semibold" style={{ color: 'var(--text-dark)' }}>Actions (15)</h3>
      
      <div className="space-y-3">
        {actions.map((action, idx) => (
          <div key={idx}>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-dark)' }}>{action.name}</p>
            <div className="h-2 bg-gray-200 rounded overflow-hidden flex">
              {action.red > 0 && <div style={{ width: `${action.red}%`, backgroundColor: 'var(--accent-red)' }}></div>}
              {action.green > 0 && <div style={{ width: `${action.green}%`, backgroundColor: 'var(--accent-green)' }}></div>}
              {action.yellow > 0 && <div style={{ width: `${action.yellow}%`, backgroundColor: '#ff8c00' }}></div>}
              {action.gray > 0 && <div style={{ width: `${action.gray}%`, backgroundColor: 'var(--medium-gray)' }}></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
