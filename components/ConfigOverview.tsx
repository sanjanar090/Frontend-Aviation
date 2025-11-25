"use client";

import React from "react";
import { Home, Users, Plane, FileText } from "lucide-react";

// Define the structure for a button/link within a group
interface ConfigLink {
  id: string;
  label: string;
  icon: React.ElementType;
}

// Define the structure for a group of links
interface ConfigGroup {
  title: string;
  links: ConfigLink[];
}

// IMPORTANT: IDs must match ConfigPage currentView EXACTLY
const systemConfigData: ConfigGroup[] = [
  {
    title: "ORGANISATIONAL",
    links: [
      { id: "Departments", label: "Departments", icon: Home },
      { id: "System-Wide User Roles", label: "System-Wide User Roles", icon: Users },
    ],
  },
  {
    title: "AIRCRAFT",
    links: [
      { id: "Aircraft Types", label: "Aircraft Types", icon: Plane },
      { id: "Aircraft", label: "Aircraft", icon: Plane },
    ],
  },
  {
    title: "SAFETY",
    links: [
      { 
        id: "Safety Report Numbering",
        label: "Safety Report Numbering",
        icon: FileText 
      },
    ],
  },
];

interface SystemConfigurationOverviewProps {
  configData?: ConfigGroup[];
  setCurrentView: (view: string) => void;
}

export default function SystemConfigurationOverview({
  configData = systemConfigData,
  setCurrentView,
}: SystemConfigurationOverviewProps) {

  const ConfigButton: React.FC<{ link: ConfigLink }> = ({ link }) => {
    const Icon = link.icon;
    return (
      <button
        onClick={() => setCurrentView(link.id)}
        className="
          flex items-center justify-start 
          px-4 py-3 w-full
          text-sm font-medium text-[#126fd6] 
          border border-blue-300 bg-white hover:bg-blue-50 
          rounded-md shadow-sm transition-colors duration-150
        "
        style={{ minHeight: "50px" }}
      >
        <Icon className="w-4 h-4 mr-2 text-gray-600" />
        {link.label}
      </button>
    );
  };

  return (
    <div className="p-10 bg-white w-full border border-gray-200 rounded-lg">
      <div className="flex justify-center w-full">
        <div className="flex space-x-12">
          {configData.map((group, index) => (
            <div key={index} className="flex flex-col min-w-[210px]">
              <div className="pb-1 mb-4">
                <h3
                  className="
                    text-xs font-semibold uppercase text-gray-600 
                    tracking-wider inline-block pr-2
                  "
                >
                  {group.title}
                </h3>
                <div className="border-b border-gray-300 -mt-[1px] w-full"></div>
              </div>

              <div className="flex flex-col space-y-3">
                {group.links.map((link) => (
                  <ConfigButton key={link.id} link={link} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
