"use client";

import Sidebar from "@/components/sidebar";
import SafetyAnalysisDashboard from "@/components/ui/safety-anlysisdashboard";

export default function SafetyAnalysisPage() {
  return (
    <div className="flex">
      {/* Left sidebar */}
      <Sidebar isOpen={true} />

      {/* Right content */}
      <div className="flex-1">
        <SafetyAnalysisDashboard />
      </div>
    </div>
  );
}
