'use client';

import Link from "next/link";
import { useState } from "react";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

import {
  Send,
  FileText,
  AlertTriangle,
  CheckSquare,
  Users,
  Zap,
  File,
  Briefcase,
  Package,
  ChevronDown,
  ChevronRight
} from "lucide-react";

// -----------------------------
// Module Interface
// -----------------------------
interface ModuleItem {
  icon: React.ElementType;
  label: string;
  sublessons?: { label: string; href: string }[];
}

// -----------------------------
// Module Button Component
// (EXACT STYLE FROM FIRST CODE)
// -----------------------------
const ModuleButton: React.FC<{
  module: ModuleItem;
  onToggle: (label: string) => void;
  isExpanded: boolean;
}> = ({ module, onToggle, isExpanded }) => {
  const Icon = module.icon;
  const isGettingStarted = module.label === "Getting Started";

  if (isGettingStarted) {
    return (
      <div className="rounded-md bg-[#ecf2f8] mb-2">
        <button
          onClick={() => onToggle(module.label)}
          className="w-full flex items-center px-4 py-3"
        >
          <ChevronDown
            className={`w-4 h-4 mr-3 text-black transition-transform duration-300 ${
              isExpanded ? "rotate-0" : "-rotate-90"
            }`}
          />

          <Send className="w-5 h-5 text-blue-600 mr-3" />

          <span className="text-base text-gray-900 font-medium">
            {module.label}
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-40" : "max-h-0"
          }`}
        >
          <div className="bg-[#f7f9fc] px-6 py-2">
            {module.sublessons?.map((lesson, idx) => (
              <p
                key={idx}
                className="py-2 text-sm text-gray-800 border-b last:border-none"
              >
                {lesson.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-[#ecf2f8] mb-2 px-4 py-3 flex items-center">
      <ChevronRight className="w-4 h-4 text-black mr-3" />

      <Icon className="w-5 h-5 text-gray-800 mr-3" />

      <span className="text-base text-gray-900 font-medium">
        {module.label}
      </span>
    </div>
  );
};

// -----------------------------
// MAIN PAGE (SECOND LAYOUT)
// -----------------------------
export default function LearnCentrikContentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModule, setExpandedModule] = useState<string | null>(
    "Getting Started"
  );

  const modules: ModuleItem[] = [
    {
      icon: Send,
      label: "Getting Started",
      sublessons: [
        { label: "LC5-GET01 - Navigating the system", href: "#" },
        { label: "LC5-GET02 - Action Management", href: "#" }
      ]
    },
    { icon: FileText, label: "Documents" },
    { icon: AlertTriangle, label: "Safety" },
    { icon: CheckSquare, label: "Compliance" },
    { icon: Users, label: "Meetings" },
    { icon: Zap, label: "Workflows" },
    { icon: File, label: "Forms" },
    { icon: Briefcase, label: "Training" },
    { icon: Package, label: "Equipment" },
    { icon: Send, label: "Additional Material" }
  ];

  const handleToggle = (label: string) => {
    if (label === "Getting Started") {
      setExpandedModule(expandedModule === label ? null : label);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="Learn Centrix" />

        <div className="flex-1 p-8 bg-gray-100 overflow-auto">
          <div className="w-full mx-auto bg-white p-12 rounded-lg shadow-xl min-h-full">

            {/* Breadcrumb */}
            <nav className="text-sm font-medium text-gray-500 mb-6">
              <Link href="/" className="hover:text-blue-600">
                Dashboard
              </Link>{" "}
              / <span className="text-gray-800 font-semibold">Learn Centrik</span>
            </nav>

            {/* Logo & Welcome */}
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="mb-10">
                <img
                  src="https://dale-aviation-test.centrik.net/Images/LearnCentrikLogo.png"
                  alt="LearnCentrik Logo"
                  className="h-10 sm:h-12 w-auto mx-auto"
                />
              </div>

              <h1 className="text-xl font-bold text-gray-800 mb-4">
                Welcome to LearnCentrik!
              </h1>

              <p className="text-gray-600 mb-4 max-w-2xl text-sm">
                LearnCentrik has been designed as a click and learn experience,
                providing our customers with training material which can be
                accessed anywhere, anytime.
              </p>

              <p className="text-gray-600 mb-4 max-w-2xl text-sm">
                For optimum performance and user experience, after loading the
                training session it is recommended to set your browser to
                full-screen mode. You can usually find a button for this near
                the zoom options in your browser's main menu.
              </p>

              <p className="text-gray-600 mb-6 font-semibold text-sm">
                We will continue to release new lessons, so please watch this
                space.
              </p>

              <p className="text-gray-500 text-sm mb-8">
                Please send any feedback on LearnCentrik content to{" "}
                <a href="mailto:training@trustflight.com">
                  training@trustflight.com
                </a>.
              </p>
            </div>

            {/* Training Modules List */}
            <div className="space-y-1">
              {modules.map((module, index) => (
                <ModuleButton
                  key={index}
                  module={module}
                  onToggle={handleToggle}
                  isExpanded={expandedModule === module.label}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
