"use client";

export default function SafetyActionsPage() {
  return (
    <div className="p-6 space-y-6">

      {/* PAGE TITLE */}
      <h2 className="text-2xl font-semibold text-gray-800">Actions By User</h2>

      {/* TABS */}
      <div className="flex items-center space-x-6 border-b pb-3">
        {[
          "Dashboard",
          "Cases (12)",
          "Drafts",
          "Actions (2)",
          "Heatmap",
          "KPIs",
          "Safety Newsletters documents",
        ].map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              tab === "Actions (2)"
                ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* INFO BOX */}
      <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-md text-sm">
        <p>
          The number of actions for each user includes assigned actions and delegated actions,
          therefore the sum of actions for all users may not equate to the total number of All
          Actions displayed. The numbers shown below may include actions which you do not have
          permission to view.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <select className="border rounded px-3 py-2 bg-white">
          <option>Module: Safety Module</option>
        </select>

        <select className="border rounded px-3 py-2 bg-white">
          <option>Active/Inactive users: All users with open actions</option>
        </select>

        <select className="border rounded px-3 py-2 bg-white">
          <option>Action Status: All</option>
        </select>

        <select className="border rounded px-3 py-2 bg-white">
          <option>Subsystems: Safety</option>
        </select>

        <button className="ml-auto px-4 py-2 border rounded text-sm text-blue-600 hover:bg-blue-100">
          Show legend
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden border rounded-lg bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium w-1/3">Name</th>
              <th className="px-4 py-3 text-center font-medium">Require Attention</th>
              <th className="px-4 py-3 text-center font-medium">Overdue</th>
              <th className="px-4 py-3 text-center font-medium">Rejected</th>
              <th className="px-4 py-3 text-center font-medium">Completed</th>
              <th className="px-4 py-3 text-center font-medium">In Progress</th>
              <th className="px-4 py-3 text-center font-medium">Closed</th>
            </tr>
          </thead>

          <tbody>
            {[
              { name: "All Actions", require: 2, overdue: 2, closed: 29 },
              { name: 'Department "Compliance Monitoring"', closed: 5 },
              { name: 'Department "Maintenance & Engineering"', closed: 4 },
              { name: 'Department "Safety"', closed: 2 },
              { name: "Karciauskiene, Modesta", require: 1, closed: 6 },
              { name: "PERROCHON, Camille", require: 1, closed: 1 },
              { name: 'Role "Engineering"', closed: 1 },
            ].map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{row.name}</td>

                {/* Require Attention */}
                <td className="px-4 py-3 text-center">
                  {row.require && (
                    <span className="w-6 h-6 inline-flex items-center justify-center rounded-full border border-red-500 text-red-500 text-xs">
                      {row.require}
                    </span>
                  )}
                </td>

                {/* Overdue */}
                <td className="px-4 py-3 text-center">
                  {row.overdue && (
                    <span className="w-6 h-6 inline-flex items-center justify-center rounded-full border border-red-500 text-red-500 text-xs">
                      {row.overdue}
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-center">—</td>
                <td className="px-4 py-3 text-center">—</td>
                <td className="px-4 py-3 text-center">—</td>

                {/* Closed */}
                <td className="px-4 py-3 text-center">
                  {row.closed && (
                    <span className="w-6 h-6 inline-flex items-center justify-center rounded-full border border-green-600 text-green-600 text-xs">
                      {row.closed}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
