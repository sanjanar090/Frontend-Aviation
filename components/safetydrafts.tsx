"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SafetyDraftsPage() {
  const [sentCount, setSentCount] = useState(0);

  const handleSendReminder = () => {
    setSentCount(sentCount + 1);
  };

  return (
    <div className="p-6 space-y-6">

      
      {/* Content Box */}
      <div className="bg-white border rounded-lg p-4">

        {/* Send Reminder Row */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSendReminder}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send Reminder To All
          </button>

          <p className="text-gray-600 text-sm">
            {sentCount} reminder(s) sent
          </p>
        </div>

        {/* Empty State */}
        <div className="w-full h-[500px] flex items-center justify-center text-gray-400">
          No draft records available.
        </div>
      </div>

    </div>
  );
}
