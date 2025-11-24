"use client";

export default function SafetyKPI() {
  const kpiData = [
    {
      id: 1,
      title: "0 fatal accidents per year",
      comment:
        "0 fatal accidents per year in an aircraft maintenance environment. This is applicable to Dale Aviation maintenance staff, passengers and any other involved personnel.",
    },
    {
      id: 2,
      title: "0 on-the-job injuries per year",
      comment:
        "0 on-the-job injuries per year in Dale Aviation facilities, line and base maintenance stations, and out-of-base maintenance activities.",
    },
    {
      id: 3,
      title: "Reduce events assessed as 'not tolerable' by 10% over the previous year",
      comment:
        "Reduce events assessed as 'not tolerable' (yellow) by 10% over the previous year",
    },
    {
      id: 4,
      title: "Reporting rate increase 10% each year",
      comment:
        "Reporting rate increase 10% each year. It is applicable to all - Voluntary, mandatory reports.",
    },
    {
      id: 5,
      title: "All MORs sent to authorities on time",
      comment:
        "All MORs sent to authorities on time, including initial investigation and closures.",
    },
    {
      id: 6,
      title:
        "90% of Initial investigations performed within 1 month after report",
      comment:
        "90% of Initial investigations were performed within 1 mo after initial report submitted.",
    },
    {
      id: 7,
      title: "90% of Staff trained for SMS and HF",
      comment:
        "90% of Staff trained for SMS and HF. Applicable to all Dale Aviation staff.",
    },
    {
      id: 8,
      title: "Feedback to the reporter",
      comment:
        "Feedback to the reporter: - 90% feedback sent to a reporter by contacting him/her",
    },
    {
      id: 9,
      title: "Safety Newsletters rate",
      comment:
        "At least 12 Safety Newsletters are sent to staff each year.",
    },
  ];

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-4">KPI Report Templates</h2>

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left w-12">#</th>
              <th className="p-3 text-left">KPI Report Template</th>
              <th className="p-3 text-left">Comment</th>
              <th className="p-3 text-left w-24"></th>
            </tr>
          </thead>

          <tbody>
            {kpiData.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.comment}</td>

                {/* ACTION BUTTONS */}
                <td className="p-3 flex flex-col gap-2">
                  <button className="px-3 py-1 border rounded text-blue-600 hover:bg-blue-50">
                    Details
                  </button>
                  <button className="px-3 py-1 border rounded text-blue-600 hover:bg-blue-50">
                    Use
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* FOOTER BUTTONS */}
        <div className="p-4 flex gap-3">
          <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Edit
          </button>

          <button className="px-4 py-2 rounded border hover:bg-gray-100">
            + New Template
          </button>

          <button className="px-4 py-2 rounded border hover:bg-gray-100">
            One-Off Report
          </button>

          <button className="px-4 py-2 rounded border hover:bg-gray-100">
            References
          </button>
        </div>

      </div>
    </div>
  );
}
