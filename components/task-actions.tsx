export default function TaskActions() {
  return (
    <div className="w-64 flex flex-col gap-6">
      {/* More Task Views */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">More task views</h3>
          <button className="p-1 hover:bg-gray-100 rounded">
            ⚙️
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold text-xs">
              👥
            </div>
            <span className="text-sm text-gray-700">My actions</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
              🛡️
            </div>
            <span className="text-sm text-gray-700">Safety</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-semibold">
              ✓
            </div>
            <span className="text-sm text-gray-700">Compliance</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 font-semibold">
              ⚡
            </div>
            <span className="text-sm text-gray-700">Workflows</span>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-semibold">
              ⚠️
            </div>
            <span className="text-sm text-gray-700">My risk assessments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
