export default function HeatmapContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-dark)' }}>Safety heatmap</h2>
        <p className="text-sm" style={{ color: 'var(--text-light)' }}>
          Select a cell in the heatmap to show all related cases. In each cell, the first number shows the risk score, with the second number in the circle representing total related cases.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text-dark)' }}>Total Score</h3>
          <p className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>238</p>
        </div>
        
        <div className="col-span-2 bg-white rounded-lg border p-6" style={{ borderColor: 'var(--border-light)' }}>
          <div className="flex justify-between items-center">
            <p className="font-semibold" style={{ color: 'var(--text-dark)' }}>Organisation</p>
            <span className="px-2 py-1 rounded text-sm font-semibold" style={{ backgroundColor: 'var(--light-bg)', color: 'var(--text-light)' }}>67</span>
          </div>
        </div>
      </div>

      <div>
        <button className="px-4 py-2 rounded border font-medium" style={{ borderColor: 'var(--border-light)', color: 'var(--primary-blue)' }}>
          Risk Category
        </button>
      </div>

      <div className="bg-white rounded-lg border" style={{ borderColor: 'var(--border-light)' }}>
        <div className="p-6" style={{ backgroundColor: '#f5e6e6' }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold" style={{ color: 'var(--text-dark)' }}>Dale Aviation</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-2xl font-bold" style={{ color: 'var(--accent-red)' }}>238</p>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-light)' }}>67</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
