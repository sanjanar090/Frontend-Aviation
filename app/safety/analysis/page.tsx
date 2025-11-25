"use client";

export default function SafetyAnalysisDashboard({ activeTab, setActiveTab }) {
  return (
    <div className="flex">

      {/* LEFT MENU */}
      <div className="w-64 bg-white border-r p-4">
        <button
          className={`w-full p-2 text-left mb-2 rounded ${
            activeTab === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`w-full p-2 text-left mb-2 rounded ${
            activeTab === "logs" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("logs")}
        >
          Logs
        </button>

        <button
          className={`w-full p-2 text-left mb-2 rounded ${
            activeTab === "analytics" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 p-6">
        {activeTab === "dashboard" && <h2 className="text-xl font-bold">Dashboard View</h2>}
        {activeTab === "logs" && <h2 className="text-xl font-bold">Logs View</h2>}
        {activeTab === "analytics" && <h2 className="text-xl font-bold">Analytics View</h2>}
      </div>
    </div>
  );
}
