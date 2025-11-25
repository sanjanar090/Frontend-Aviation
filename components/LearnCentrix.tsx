'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  // Lucide Icons for Modules
  Send, // Used for Getting Started (or a similar pointer icon)
  FileText, // Used for Documents
  AlertTriangle, // Used for Safety
  CheckSquare, // Used for Compliance
  Users, // Used for Meetings
  Zap, // Used for Workflows
  File, // Used for Forms
  Briefcase, // Used for Training
  Package, // Used for Equipment
  ChevronDown,
  ChevronRight // Used for Additional Material
} from 'lucide-react'

// Define the structure for a training module item
interface ModuleItem {
  icon: React.ElementType; 
  label: string;
  sublessons?: { label: string; href: string }[];
}

// =================================================================
// Sub-component: ModuleButton
// =================================================================
const ModuleButton: React.FC<{ module: ModuleItem; onToggle: (label: string) => void; isExpanded: boolean }> = ({ module, onToggle, isExpanded }) => {
    const Icon = module.icon;
    const isGettingStarted = module.label === 'Getting Started';

    // 1. Special Styling for the Getting Started (Collapsible) Section
    if (isGettingStarted) {
        return (
            <div className="border border-gray-300 rounded-md bg-white shadow-sm mb-6">
                <button
                    onClick={() => onToggle(module.label)}
                    // Light blue background for the collapsible header
                    className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 transition-colors rounded-t-md"
                >
                    {/* The small pointer icon (ChevronDown) rotated for open/close state */}
                    <ChevronDown className={`w-4 h-4 mr-3 text-blue-600 transition-transform duration-300 ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
                    <span className="font-semibold text-lg text-gray-800">{module.label}</span>
                </button>
                
                {/* Sub-lessons area for Getting Started */}
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="p-4 bg-white border-t border-gray-200">
                        {module.sublessons!.map((lesson, index) => (
                            <Link
                                key={index}
                                href={lesson.href}
                                // Action Management link is underlined and blue
                                className={`block text-sm py-1.5 pl-6 transition-colors ${lesson.label.includes('Action Management') ? 'text-blue-600 hover:text-blue-800 underline' : 'text-gray-700 hover:text-gray-900'}`}
                            >
                                {lesson.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // 2. Default Styling for the rest of the modules (simple buttons with icon and arrow)
    return (
        <Link
            href={`/learn/${module.label.toLowerCase().replace(/\s/g, '-')}`}
            className="flex items-center w-full p-3 mb-1 text-left text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition duration-150 relative group shadow-sm"
        >
            {/* Icon area */}
            <span className="flex items-center justify-center w-6 h-6 mr-3">
                <Icon className="w-5 h-5 text-gray-600" />
            </span>
            
            <span className="font-medium text-base flex-grow">{module.label}</span>
            
            {/* Small arrow indicator on the right */}
            <ChevronRight className="w-4 h-4 text-gray-400" />
        </Link>
    );
}

// =================================================================
// Main Component: LearnCentrikContent
// =================================================================
export default function LearnCentrikContent() {
  const [expandedModule, setExpandedModule] = useState<string | null>('Getting Started');

  const modules: ModuleItem[] = [
    {
      icon: Send, 
      label: 'Getting Started',
      sublessons: [
        { label: 'LC5-GET01 - Navigating the system', href: '/learn/navigating' },
        { label: 'LC5-GET02 - Action Management', href: '/learn/actions' },
      ],
    },
    { icon: FileText, label: 'Documents' },
    { icon: AlertTriangle, label: 'Safety' },
    { icon: CheckSquare, label: 'Compliance' },
    { icon: Users, label: 'Meetings' },
    { icon: Zap, label: 'Workflows' },
    { icon: File, label: 'Forms' },
    { icon: Briefcase, label: 'Training' },
    { icon: Package, label: 'Equipment' },
    { icon: ChevronRight, label: 'Additional Material' },
  ];

  const handleToggle = (label: string) => {
    // Only toggle the 'Getting Started' section
    if (label === 'Getting Started') {
      setExpandedModule(expandedModule === label ? null : label);
    }
  };

  return (
    // Main container styling based on the visible area in the images
    <div className="p-6 md:p-10 max-w-4xl mx-auto bg-white min-h-full shadow-lg border border-gray-200">
      
      {/* 1. Breadcrumb (Top Left) */}
      <nav className="text-sm font-medium text-gray-500 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link> / <span className="text-gray-800">Learn Centrik</span>
      </nav>
      
      {/* 2. Learn Centrik Logo & Welcome Message */}
      <div className="flex flex-col items-center mb-8 text-center">
        
        {/* Logo Placeholder (Replace with actual image if available) */}
        <div className="mb-6">
            {/* Using text styling to approximate the logo's look */}
            <span className="text-4xl font-light italic text-orange-500">
                <span className="font-bold text-gray-800">Learn</span>Centrik
            </span>
            
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-4">Welcome to LearnCentrik!</h1>
        <p className="text-gray-600 mb-4 max-w-2xl text-sm">
            LearnCentrik has been designed as a **click and learn experience**, providing our customers with training material which can be accessed anywhere, anytime.
        </p>
        <p className="text-gray-600 mb-4 max-w-2xl text-sm">
            For optimum performance and user experience, after loading the training session it is recommended to set your browser to **full-screen mode**. You can usually find a button for this near the zoom options in your browser's main menu.
        </p>
        <p className="text-gray-600 mb-6 font-semibold text-sm">
            We will continue to release new lessons, so please watch this space.
        </p>
        <p className="text-gray-500 text-sm mb-8">
            Please send any feedback on LearnCentrik content to <a href="mailto:training@trustflight.com" className="text-blue-600 hover:underline">training@trustflight.com</a>.
        </p>
      </div>

      {/* 3. Training Modules List */}
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
  );
}