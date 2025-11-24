"use client";

export default function SafetyDashboard() {
  return (
    <div className="p-4 sm:p-6 space-y-6">

      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Actions */}
        <div className="border rounded-xl bg-white p-4 shadow-sm">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full border-[10px] border-red-600 flex items-center justify-center">
              <span className="text-3xl font-bold text-red-600">2</span>
            </div>
            <p className="mt-2 text-gray-700">actions</p>
            <p className="text-sm text-red-600 mt-1">Overdue (2)</p>
          </div>
        </div>

        {/* All open MORs */}
        <div className="border rounded-xl bg-white p-4 shadow-sm">
          <h3 className="font-medium mb-3">All open MORs</h3>
          <p className="text-center text-gray-500 mt-6">
            No All open MORs to show
          </p>
        </div>

        {/* All open cases */}
        <div className="border rounded-xl bg-white p-4 shadow-sm">
          <h3 className="font-medium mb-3">All open cases (12)</h3>

          <div className="flex justify-center mb-3">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="#0B5ED7"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray="300"
                  strokeDashoffset="40"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                12
              </div>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <p className="flex items-center gap-2 text-blue-600">● Investigate (9)</p>
            <p className="flex items-center gap-2 text-green-600">● Monitor (1)</p>
            <p className="flex items-center gap-2 text-purple-600">● Ready to Close (2)</p>
          </div>
        </div>

        {/* Safety Reports */}
        <div className="border rounded-xl bg-white p-4 shadow-sm">
          <h3 className="font-medium mb-3">Safety reports</h3>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            Start new report
          </button>

          <p className="mt-4 text-sm text-gray-600">
            Start your frequently used reports:
          </p>

          <div className="mt-2 space-y-1 text-blue-600 text-sm">
            <p>MSR-01 - Maintenance Issue</p>
            <p>MSR-02 - Logistics and Store</p>
            <p>HAZ-02 - Other Hazard</p>
          </div>
        </div>
      </div>

      {/* My Safety Tasks */}
      <div className="pt-8 border-t">
        <h3 className="text-lg font-medium mb-6">My Safety tasks</h3>

        <div className="flex flex-col items-center justify-center text-center py-14 text-gray-500">
          <p>You don’t have any outstanding tasks</p>
        </div>
      </div>
    </div>
  );
}
