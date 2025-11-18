export default function WorkflowsTasksSection() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-gray-800 font-semibold flex items-center gap-3">
          My Workflows tasks
          <span className="inline-flex gap-2">
            <span className="inline-block badge-red px-2 py-1 text-sm">3</span>
            <span className="inline-block badge-green px-2 py-1 text-sm">2</span>
            <span className="inline-block px-2 py-1 text-sm font-semibold text-white rounded-full" style={{ backgroundColor: '#0099cc' }}>1</span>
          </span>
        </h3>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Complete step */}
        <div className="border border-medium-gray rounded-lg p-4">
          <h4 className="text-gray-700 font-medium mb-2">Complete step</h4>
          <div className="flex gap-1 h-1.5">
            <div className="flex-1 progress-red"></div>
            <div className="flex-1 progress-green"></div>
          </div>
        </div>

        {/* Complete action */}
        <div className="border border-medium-gray rounded-lg p-4">
          <h4 className="text-gray-700 font-medium mb-2">Complete action</h4>
          <div className="flex gap-1 h-1.5">
            <div className="w-1/4 progress-red"></div>
            <div className="flex-1 progress-bg"></div>
          </div>
        </div>

        {/* Close action */}
        <div className="border border-medium-gray rounded-lg p-4">
          <h4 className="text-gray-700 font-medium mb-2">Close action</h4>
          <div className="flex gap-1 h-1.5">
            <div className="w-1/2 progress-green"></div>
            <div className="flex-1 progress-bg"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
