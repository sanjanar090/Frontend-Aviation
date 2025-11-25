'use client'

import { useState } from "react";
// Assuming Header and Sidebar are defined in your project
import Header from "@/components/header"; 
import Sidebar from "@/components/sidebar";
import ConfigOverview from "@/components/ConfigOverview";

// Ensure all necessary icons are imported
import { Home, Grid3x3, Plane, FileText, Plus, Save, Search, Settings } from "lucide-react"; 

interface Department {
    name: string;
    roles: string;
}
interface NewRoleFormProps {
    setShowForm: (value: boolean) => void;
}
const configData = [
    {
      category: "ORGANISATIONAL",
      items: [
        { icon: Home, label: "Departments" },
        { icon: Grid3x3, label: "System-Wide User Roles" },
      ],
    },
    {
      category: "AIRCRAFT",
      items: [
        { icon: Plane, label: "Aircraft Types" },
        { icon: Plane, label: "Aircraft" },
      ],
    },
    {
      category: "SAFETY",
      items: [
        { icon: FileText, label: "Safety Report Numbering" },
      ],
    },
];

// ---------------------------------------------
// --- 1. DepartmentsConfig Component (UPDATED) ---
// ---------------------------------------------
function DepartmentsConfig() {
    // --- State Management for Interactive Elements & Data ---
    const [attachments, setAttachments] = useState<File[]>([]);
    const [activeTab, setActiveTab] = useState<'General' | 'Oversight'>('General');
    const [isEditing, setIsEditing] = useState(false); // New state to control the view mode

    // State for Editable Fields (initialized with the current values)
    const [orgName, setOrgName] = useState('Dale Aviation');
    const [location, setLocation] = useState(''); // Assuming empty initially
    const [tla, setTla] = useState('OP');
    const [dateFormat, setDateFormat] = useState('British (dd/mm/yyyy)');
    const [useSystemDefault, setUseSystemDefault] = useState(false);
    const [oversightPeriod, setOversightPeriod] = useState(''); // Assuming empty initially
    const [comments, setComments] = useState(''); // Assuming empty initially
    const [address, setAddress] = useState('');
    const [financialAddress, setFinancialAddress] = useState('');


    // Function to trigger edit mode on click/focus of any editable area
    const handleToggleEdit = () => {
        if (!isEditing) {
            setIsEditing(true);
        }
    };


    // --- Data (Mock data compiled from uploaded images) ---
    const departments: Department[] = [
        { name: "Administration", roles: "Accountancy, Administration" },
        { name: "Blank", roles: "" },
        { name: "CHR Managment", roles: "" },
        { name: "Compliance Monitoring", roles: "Compliance Monitoring Auditor, Compliance Monitoring Manager, Training and Quality Assistant" },
        { name: "Contract Signing Group", roles: "" },
        { name: "CS Authorization", roles: "" },
        { name: "Information Technology", roles: "IT" },
        { name: "Logistics", roles: "Logistic, Logistic Manager" },
        { name: "Maintenance", roles: "Certifying Staff, Maintenance Manager, Station Manager" },
        { name: "Maintenance & Engineering", roles: "Engineering, Maintenance Manager, Mechanic" },
        { name: "Management Team", roles: "Accountable Manager, Compliance Monitoring Manager, Maintenance Manager, Safety Manager" }, 
        { name: "Safety", roles: "Safety Manager" },
        { name: "Training", roles: "Training Manager" },
    ];

    // --- Event Handlers for Attachments ---
    const handleFiles = (files: FileList) => {
        const newFiles = Array.from(files);
        setAttachments((prev) => [...prev, ...newFiles]);
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleToggleEdit(); // Trigger edit mode on file drop
        if (isEditing) {
            handleFiles(e.dataTransfer.files);
        }
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };


    // --- Conditional Components ---

    /**
     * Renders the header section with Organisation details (Read-Only or Editable)
     */
    const OrganisationHeader: React.FC = () => (
        <div 
            className={`border border-gray-200 p-4 mb-6 rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
            // Add a click handler to the entire block to trigger Edit Mode
            onClick={handleToggleEdit}
        >
            <h3 className="text-base font-semibold text-gray-700 mb-4 border-b pb-2">Organisation</h3>
            
            <div className={`grid grid-cols-3 gap-y-4 gap-x-6 text-sm text-gray-700 pt-2 ${!isEditing ? 'cursor-pointer' : ''}`}>
                
                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500" htmlFor="orgName">Name</label>
                    {isEditing ? (
                        <input 
                            id="orgName" 
                            type="text" 
                            value={orgName} 
                            onChange={(e) => setOrgName(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" 
                            onClick={(e) => e.stopPropagation()} // Stop click from bubbling up and re-setting isEditing to true unnecessarily
                        />
                    ) : (
                        <p className="mt-1 text-gray-700">{orgName}</p>
                    )}
                </div>
                
                {/* Location */}
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500" htmlFor="location">Location (optional)</label>
                    {isEditing ? (
                        <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" onClick={(e) => e.stopPropagation()} />
                    ) : (
                        <p className="mt-1 text-gray-700">{location || '-'}</p>
                    )}
                </div>
                
                {/* TLA */}
                <div className="flex flex-col">
                    <label className="text-xs font-semibold text-gray-500" htmlFor="tla">TLA (Three letter code) (optional)</label>
                    {isEditing ? (
                        <input id="tla" type="text" value={tla} onChange={(e) => setTla(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" onClick={(e) => e.stopPropagation()} />
                    ) : (
                        <p className="mt-1 text-gray-700">{tla || '-'}</p>
                    )}
                </div>

                {/* Date Format and Checkbox */}
                <div className="col-span-3 flex items-start space-x-6 pt-4">
                    <div className="flex flex-col">
                        <label className="text-xs font-semibold text-gray-500" htmlFor="dateFormat">Organisation Date Format (optional)</label>
                        {isEditing ? (
                            <select
    id="dateFormat"
    value={dateFormat}
    onChange={(e) => setDateFormat(e.target.value)}
    className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 bg-white"
    onClick={(e) => e.stopPropagation()}
>
    <option>British (dd/mm/yyyy)</option>
    <option>British Long (dd/mmm/yyyy)</option>
    <option>US (mm/dd/yyyy)</option>
    <option>European (dd.mm.yyyy)</option>
    <option>ISO (yyyy-mm-dd)</option>
</select>

                        ) : (
                            <p className="mt-1 text-gray-700">{dateFormat}</p>
                        )}
                    </div>
                    
                    <div className="mt-4 flex items-center p-3 text-xs text-gray-600 h-fit border border-gray-300 rounded bg-white">
    <label className="flex items-center space-x-2">
        {isEditing ? (
            <input
                type="checkbox"
                checked={useSystemDefault}
                onChange={(e) => setUseSystemDefault(e.target.checked)}
                className="form-checkbox text-blue-600 border-gray-300 rounded"
                onClick={(e) => e.stopPropagation()}
            />
        ) : (
            <input
                type="checkbox"
                checked={useSystemDefault}
                readOnly
                className="form-checkbox text-blue-600 border-gray-300 rounded"
            />
        )}
        <span>Use System Default Date Format</span>
    </label>
</div>

                </div> 

                {/* Oversight Period (Months) */}
                <div className="flex flex-col gap-4 w-full">

    {/* Oversight Period */}
    <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500" htmlFor="oversight">
            Oversight Period (Months) (optional)
        </label>

        {isEditing ? (
            <input
                id="oversight"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
        ) : (
            <p className="mt-1 text-gray-700">{location || '-'}</p>
        )}
    </div>

    {/* Comments */}
    <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500" htmlFor="comments">
            Comments (optional)
        </label>

        {isEditing ? (
            <input
                id="comments"
                type="text"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
        ) : (
            <p className="mt-1 text-gray-700">{comments || '-'}</p>
        )}
    </div>

</div>

            </div>
        </div>
    );


    // Department Section (Used in General Tab) - Read-Only functionality for now
    const DepartmentsSection: React.FC = () => (
        <div className="mt-8">
            <h3 className="text-base font-semibold text-gray-700 border-b pb-2 mb-4">Departments</h3>
            {isEditing && (
                <button className="px-6 py-2 text-sm font-medium rounded-md shadow-sm text-[#126fd6] border border-blue-300 bg-white hover:bg-blue-50 mb-4">
                    Add
                </button>
            )}
            
            {/* Department List Header */}
            <div className="flex py-2 px-2 text-sm font-semibold text-gray-500 bg-gray-50 border-y border-gray-200">
                <span className="w-1/3">Department</span>
                <span className="w-1/6"></span> 
                <span className="w-1/2">Roles</span>
            </div>

            {/* Department List Body */}
            <div className="divide-y divide-gray-200">
                {departments.map((dept, index) => (
                    <div key={index} className="flex items-center py-2 px-2 hover:bg-gray-50 cursor-pointer">
                        <span className="text-sm text-gray-700 w-1/3">{dept.name}</span>
                        <span className="w-1/6">
                            <button className="px-3 py-1 text-xs font-medium rounded-md text-[#126fd6] border border-blue-300 bg-white hover:bg-blue-50">
                                View
                            </button>
                        </span>
                        <span className="text-sm text-gray-500 w-1/2">{dept.roles || '-'}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    // General Tab Content
    const GeneralTabContent: React.FC = () => (
        <div className="space-y-6 text-sm text-gray-700">
            
            {/* Address Section */}
            <div 
                className={`border border-gray-200 p-4 rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                onClick={handleToggleEdit}
            >
                <h4 className="font-semibold text-gray-600 mb-4 border-b pb-2">Address</h4>
                <div className={`flex space-x-8 ${!isEditing ? 'cursor-pointer' : ''}`}>
                    <div className="w-1/2">
                        <label className="font-bold text-xs text-gray-500" htmlFor="address">Address (optional)</label>
                        {isEditing ? (
                            <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" onClick={(e) => e.stopPropagation()} />
                        ) : (
                            <p className="mt-1 text-gray-700">{address || '-'}</p> 
                        )}
                    </div>
                    <div className="w-1/2">
                        <label className="font-bold text-xs text-gray-500" htmlFor="financialAddress">Financial Address (optional)</label>
                        {isEditing ? (
                            <input id="financialAddress" type="text" value={financialAddress} onChange={(e) => setFinancialAddress(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" onClick={(e) => e.stopPropagation()} />
                        ) : (
                            <p className="mt-1 text-gray-700">{financialAddress || '-'}</p>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Attachments Section */}
            <div 
                className="border border-gray-200 p-4 rounded-lg bg-white"
                onClick={handleToggleEdit}
            >
                <h4 className="font-semibold text-gray-700 mb-3">Attachments</h4>

                {/* No attachments message (Conditional Rendering based on state) */}
                {attachments.length === 0 && (
                    <p className="text-sm text-gray-600 mb-3">
                        There are no associated attachments.
                    </p>
                )}

                {/* Upload Area (Clickable to enter Edit Mode) */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className={`w-full border-2 border-dashed border-[#3b82f680] rounded-md p-4 bg-[#f5f8fd] ${!isEditing ? 'cursor-pointer' : ''}`}
                >
                    <input
                        type="file"
                        id="fileUpload"
                        multiple
                        className="hidden"
                        onChange={(e) => { 
                            handleToggleEdit(); 
                            e.target.files && handleFiles(e.target.files)
                        }}
                    />

                    <div className="flex items-center gap-3">
                        <label
                            htmlFor="fileUpload"
                            className="cursor-pointer inline-flex items-center gap-2 px-2 py-1.5 
                            text-sm font-medium text-[#126fd6] border border-[#1d72c9] bg-white 
                            rounded-md hover:bg-blue-50"
                            onClick={(e) => e.stopPropagation()} // Stop click from bubbling and causing double-toggle
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#126fd6" viewBox="0 0 16 16">
                                <path d="M8 1a.5.5 0 0 1 .5.5V7h5.5a.5.5 0 0 1 0 1H8.5v5.5a.5.5 0 0 1-1 0V8H2a.5.5 0 0 1 0-1h5.5V1.5A.5.5 0 0 1 8 1z" />
                            </svg>
                            Add Attachment
                        </label>

                        <span className="text-gray-500 text-sm">
                            or drag and drop files
                        </span>
                    </div>
                </div>


                {/* File List (Shows in both modes, but 'Remove' only in Edit Mode) */}
                {attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                        {attachments.map((file, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center p-2 border border-gray-200 rounded bg-gray-50"
                            >
                                <span className="text-sm text-gray-700">{file.name}</span>

                                {isEditing && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent container click from resetting isEditing
                                            setAttachments((prev) => prev.filter((_, index) => index !== i))
                                        }}
                                        className="text-red-600 hover:underline text-xs"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Organisation Type Section */}
            <div 
                className={`border border-gray-200 p-4 rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                onClick={handleToggleEdit}
            >
                <h4 className="font-semibold text-gray-600 mb-4 border-b pb-2">Organisation Type</h4>
                {isEditing && (
                    <button className="px-4 py-2 text-sm font-medium rounded-md shadow-sm text-[#126fd6] border border-blue-300 bg-white hover:bg-blue-50 mb-2" onClick={(e) => e.stopPropagation()}>
                        Change
                    </button>
                )}
                <p className="text-gray-700">Maintenance Organisation</p>
            </div>

            {/* Departments Section is included here based on image structure */}
            <DepartmentsSection />
        </div>
    );
    

    // Oversight Tab Content
    const OversightTabContent: React.FC = () => (
        <div className={`space-y-4 text-sm text-gray-700 p-4 border border-gray-200 rounded-lg ${isEditing ? 'bg-white' : 'bg-gray-50'}`}>
            <h4 className="font-semibold text-gray-600 mb-4 border-b pb-2">Oversight Details</h4>
            
            <p className="text-gray-500">The Oversight Period and Comments visible in the top "Organisation" section are the primary Oversight details. Any additional specific content would be shown here.</p>
            <p className="mt-2 text-gray-500">- Next Review Date: N/A</p>
            <p className="text-gray-500">- Audit Findings: None</p>
        </div>
    );
    

    // --- Main Component Render ---
    return (
        <div className="p-8 w-full min-h-screen bg-gray-100">
            <div className="bg-white p-6 w-full max-w-7xl mx-auto rounded-lg shadow">
                
                <OrganisationHeader />
                
                {/* Tab Navigation */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        {['General', 'Oversight'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as 'General' | 'Oversight')} 
                                className={`
                                    py-2 px-1 text-sm font-medium border-b-2
                                    ${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content Area */}
                <div className="pb-20">
                    {activeTab === 'General' ? <GeneralTabContent /> : <OversightTabContent />}
                </div>

            </div>


            {/* Sticky Action Buttons */}
            <div className="fixed bottom-0 left-[224px] right-0 z-20 p-4 bg-white border-t border-gray-300 shadow-lg">
                <div className="w-full max-w-7xl mx-auto flex gap-4">

                    {isEditing ? (
                        // --- EDIT MODE BUTTONS (Save/Cancel) ---
                        <>
                            <button 
                                onClick={() => setIsEditing(false)} // In a real app, this would save the changes first
                                className="flex items-center gap-2 px-4 py-2 rounded-md text-white" 
                                style={{ backgroundColor: "#126fd6" }}>
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)} // In a real app, this would discard unsaved changes
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-white text-gray-700"
                                style={{ border: "1px solid #ccc" }}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        // --- READ-ONLY MODE BUTTONS (Edit/Delete) ---
                        <>
                            {/* This button now also triggers the edit state */}
                            <button 
                                onClick={handleToggleEdit}
                                className="flex items-center gap-2 px-4 py-2 rounded-md text-white" 
                                style={{ backgroundColor: "#126fd6" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706l-1.043 1.043-2.12-2.12L13.38.525a.5.5 0 0 1 .707 0l1.414 1.414zm-2.75 2.456L5.939 11.21 5 11.5l.29-.94 6.813-6.813 2.12 2.12z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11A.5.5 0 0 1 2.5 2h6a.5.5 0 0 0 0-1h-6A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                                Edit
                            </button>
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-md bg-white"
                                style={{ border: "1.5px solid #ac1717", color: "#ac1717" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ac1717" viewBox="0 0 16 16">
                                    <path d="M2.5 3a1 1 0 0 1 1-1h1l.5-1h5l.5 1h1a1 1 0 0 1 1 1v1H2.5V3zm1 2h9l-.8 9.6a2 2 0 0 1-2 1.8H5.3a2 2 0 0 1-2-1.8L2.5 5z"/>
                                </svg>
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function SystemWideRolesConfig() {

    const [showForm, setShowForm] = useState(false);

    const roles = [
        { name: "Centrik Admin (Internal)", isRestricted: false },
        { name: "Centrik Support", isRestricted: true },
        { name: "Shared Device", isRestricted: false },
        { name: "Third Party Quality Manager", isRestricted: false },
        { name: "User", isRestricted: false },
    ];


const NewRoleForm: React.FC<NewRoleFormProps> = ({ setShowForm }) => {
    
    // Base classes for the input fields for reuse
    const inputBgColor = 'bg-[#F3F7FC]'; // Closest match to the light blue background of inputs/selects
    const inputBorderColor = 'border-gray-300'; // Standard border color
    
    const inputBaseClasses = `
        w-full py-2.5 px-3 mt-1 ${inputBgColor} border ${inputBorderColor} rounded text-gray-800 text-sm
        focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500
    `;
    
    // Classes for select fields (adds appearance-none and custom arrow style)
    const selectClasses = `${inputBaseClasses} appearance-none cursor-pointer`;
    
    // Style for the custom arrow in the select boxes
    const selectArrowStyle = { 
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/%3E%3C/svg%3E")`, 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'right 0.75rem center', 
        backgroundSize: '1.25em 1.25em', 
        paddingRight: '2.5rem' 
    };

    // Helper component for a single table row (Action and Checkboxes)
    const TableRow: React.FC<{ action: string, area?: string, isCategory?: boolean }> = ({ action, area, isCategory = false }) => (
        <tr className={`border-b border-gray-100 text-xs ${isCategory ? 'text-gray-800 font-medium' : 'text-gray-700'}`}>
            <td className={`p-3 pl-8 ${isCategory ? 'text-sm font-semibold' : 'text-xs'}`}>
                {area && <span className="text-gray-900 font-semibold block">{area}</span>}
            </td>
            <td className="p-3 whitespace-nowrap">{!isCategory && action}</td>
            <td className="p-3 text-center"><input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/></td>
            <td className="p-3 text-center"><input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/></td>
            <td className="p-3 text-center">-</td>
            <td className="p-3 text-center">-</td>
            <td className="p-3 whitespace-nowrap">{!isCategory && action.startsWith('See') ? action : '-'}</td>
            <td className="p-3 text-center"><input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/></td>
            <td className="p-3 text-center"><input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/></td>
            <td className="p-3 text-center">-</td>
            <td className="p-3 text-center">-</td>
            <td className="p-3 whitespace-nowrap">{!isCategory && !action.startsWith('See') ? action : '-'}</td>
            <td className="p-3 text-center"><input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/></td>
            <td className="p-3 pr-8 text-center"><input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/></td>
        </tr>
    );


    return (
        <div className="p-0 bg-gray-50 min-h-screen">
           

            {/* --- MAIN CONTENT CONTAINER --- */}
            <div className="w-full max-w-[1200px] mx-auto pb-20"> 

           
                <div className="bg-white my-6 border border-gray-200 shadow-sm">
                    
                    <h2 className="text-xl font-normal text-gray-700 px-8 py-5 border-b border-gray-100">
                        Role Detail
                    </h2>

                    <div className="px-8 py-6 space-y-7">
                        
                        <div className="max-w-4xl space-y-7 mt-[-30]"> 

                            {/* NAME */}
                            <div>
                                <label className="block text-sm font-normal text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    className={`
                                        ${inputBaseClasses}
                                        /* Styling for the persistent orange left bar */
                                        border-l-4 border-l-orange-500 
                                        border-t-gray-300 border-r-gray-300 border-b-gray-300
                                    `}
                                />
                            </div>

                            {/* DEPARTMENT - Now an empty writable input with the hint above */}
                            <div>
                                <label className="block text-sm font-normal text-gray-700 mb-1">Department</label>
                                <p className="text-sm text-gray-600 mb-1">(entire system)</p>
                                <input
                                    type="text"
                                    className={`${inputBaseClasses}`}
                                />
                            </div>

                            {/* ROLE ASSIGNMENT */}
                            <div>
                                <label className="block text-sm font-normal text-gray-700 mb-1">Role Assignment</label>
                                <select
                                    className={selectClasses}
                                    style={selectArrowStyle}
                                >
                                    <option>Has to be assigned manually to users</option>
                                    <option>Applies to all users automatically</option>
                                </select>
                            </div>

                            {/* WHO CAN ASSIGN */}
                            <div>
                                <label className="block text-sm font-normal text-gray-700 mb-1">Who can assign this role</label>
                                <select
                                    className={selectClasses}
                                    style={selectArrowStyle}
                                >
                                    <option>Standard - Can be assigned by any user administrator</option>
                                    <option>Restricted - Can only be assigned by a system-level administrator</option>
                                </select>
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                                <label className="block text-sm font-normal text-gray-700 mb-1">
                                    Description <span className="text-gray-500">(optional)</span>
                                </label>
                                <textarea
                                    rows={5}
                                    className={`${inputBaseClasses} resize-y`}
                                />
                            </div>

                        </div> 
                    </div> 

                    <div className="border-b border-gray-200 py-1"></div>
                </div>
<div className="bg-white my-6 border border-gray-200 shadow-sm overflow-x-auto">
    
    <h2 className="text-xl font-normal text-gray-700 px-8 py-5 border-b border-gray-100">
        Access Rights
    </h2>

    <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-600  tracking-wider font-semibold">
            <tr className='text-xs'>
                {/* Row 1: Main Headings */}
                <th rowSpan={2} className="px-8 py-2 text-left">Area</th>
                <th colSpan={3} className="px-4 py-2 text-center border-l border-r border-gray-200">Do</th>
                <th colSpan={3} className="px-4 py-2 text-center border-r border-gray-200">See</th>
                <th colSpan={3} className="px-4 py-2 text-center border-r border-gray-200">Manage</th>
                <th colSpan={2} className="px-4 py-2 text-center"></th>
            </tr>
            <tr className='text-xs'>
                {/* Row 2: Sub-Headings */}
                <th className="p-2 text-center border-l border-gray-200">Action</th>
                <th className="p-2 text-center">Sys.</th>
                <th className="p-2 text-center border-r border-gray-200">Dept.</th>
                
                <th className="p-2 text-center">Action</th>
                <th className="p-2 text-center">Sys.</th>
                <th className="p-2 text-center border-r border-gray-200">Dept.</th>
                
                <th className="p-2 text-center">Action</th>
                <th className="p-2 text-center">Sys.</th>
                <th className="p-2 text-center border-r border-gray-200">Dept.</th>
                
                {/* The last two columns are general permissions not tied to Do/See/Manage actions */}
                <th className="p-2 text-center">Sys.</th>
                <th className="p-2 text-center border-r border-gray-200">Dept.</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
            
            {/* General */}
            <TableRow area="General" action="-" isCategory={true} />
            
            {/* EFB */}
            <TableRow area="EFB" action="Install (Personal)" />
            <TableRow action="Install (Shared)" />

            {/* Safety */}
            <TableRow area="Safety" action="-" isCategory={true} />
            <TableRow area="Safety" action="Submit Cases" />
            <TableRow action="See Dashboard" />
            <TableRow action="Manage Newsletters" />
            
            {/* Information Security */}
            <TableRow area="Information Security" action="Submit Cases" />
            <TableRow action="Add Comments" />

            {/* Health, Safety and Environment */}
            <TableRow area="Health, Safety and Environment" action="Submit Cases" />
            <TableRow action="See Dashboard" />

            {/* Compliance */}
            <TableRow area="Compliance" action="-" isCategory={true} />
            <TableRow action="Receive Regulation Amendment notifications" />
            <TableRow action="Edit Regulation Amendments" />
            <TableRow action="See Regulations" /> 

            {/* Internal Compliance Monitoring */}
            <TableRow area="Internal Compliance Monitoring" action="Perform Audits" />
            <TableRow action="See Dashboard" />

            {/* Competent Authorities */}
            <TableRow area="Competent Authorities" action="Perform Audits" />
            <TableRow action="See Dashboard" />

            {/* Customer Audit */}
            <TableRow area="Customer Audit" action="Perform Audits" />
            <TableRow action="See Dashboard" />

            {/* Out of Base Management Audit */}
            <TableRow area="Out of Base Management Audit" action="Perform Audits" />
            <TableRow action="See Dashboard" />

            {/* Self-Audit */}
            <TableRow area="Self-Audit" action="Perform Audits" />
            <TableRow action="See Dashboard" />

            {/* Contracted Organisation Survey */}
            <TableRow area="Contracted Organisation Survey" action="Perform Audits" />
            <TableRow action="See Dashboard" />

            {/* Survey */}
            <TableRow area="Survey" action="Perform Audits" />
            <TableRow action="Manage Surveys" />

            {/* Workflows */}
            <TableRow area="Workflows" action="-" isCategory={true} />
            <TableRow area="Workflows" action="See All Workflows" />
            <TableRow action="See WF Dashboard" />

            {/* Risk */}
            <TableRow area="Risk" action="-" isCategory={true} />
            <TableRow area="Risk" action="See All" />
            <TableRow action="See Dashboard" />
            <TableRow action="Risk Manager" />

            {/* Config */}
            <TableRow area="Config" action="-" isCategory={true} />
            <TableRow action="Aircraft and Types" />

            {/* Administration */}
            <TableRow area="Administration" action="Can See Contact List" />
            <TableRow action="Contact Centrik Support" />
            <TableRow action="Manage Login Detail" />
            <TableRow action="Manage Roles" />
            <TableRow action="Manage Org Structure" />
            <TableRow action="Backup Database" />
            <TableRow action="Data Protection Officer" />

        </tbody>
    </table>

    <div className="border-b border-gray-200 py-1"></div>
</div>

            </div>

            {/* --- FIXED FOOTER/ACTION BAR --- */}
            <div className="fixed bottom-0 left-[224px] right-0 h-16 bg-white border-t border-gray-300 shadow-lg flex items-center px-8">
                
                {/* Container to align buttons with the main content's width/positioning */}
                <div className="flex justify-between w-full max-w-[1200px] mx-auto">
                    
                    {/* Left Buttons */}
                    <div className="flex gap-3">
                        {/* Save Button (Blue, Solid) */}
                        <button className="px-5 py-2 text-white bg-[#126fd6] hover:bg-blue-700 rounded-sm text-sm font-medium shadow-sm transition-colors flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7z" />
                                <path fillRule="evenodd" d="M3 17a1 1 0 01-1-1V5a2 2 0 012-2h12a2 2 0 012 2v11a1 1 0 01-1 1H3zm12-7a1 1 0 000 2h-4a1 1 0 000 2h4a1 1 0 100-2h-4a1 1 0 000-2h4z" clipRule="evenodd" />
                            </svg>
                            Save
                        </button>
                        
                        {/* Cancel Button (White, Bordered) */}
                        <button 
                            className="px-5 py-2 border border-[#126fd6] text-[#126fd6] bg-white hover:bg-gray-50 rounded-sm text-sm font-medium shadow-sm transition-colors" 
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Middle Button (Edit Users) */}
                    <div className="self-center">
    <button className="px-5 py-2 text-[#4A90E2] hover:text-[#3a7fd4] rounded-md text-sm font-medium border border-[#D0E0F0] bg-[#EAF2FA] shadow-sm">
        Edit Users
    </button>
</div>

                    {/* Right Placeholder - Keeping structure for balance */}
                    <div></div>
                </div>
            </div>
        </div>
    );
};
  
    if (showForm) {
        return <NewRoleForm />;
    }

    // ----------------------
    // YOUR ORIGINAL PAGE
    // ----------------------
    return (
        <div className="p-8 w-full">
            <div className="bg-white p-6 w-full max-w-9xl mx-auto">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Roles</h2>

                <div className="bg-gray-100 p-2 text-sm font-medium text-gray-500 border-b border-gray-200">
                    Role
                </div>

                <div className="divide-y divide-gray-200">
                    {roles.map((role, index) => (
                        <div key={index} className="flex items-center py-2 px-1 hover:bg-gray-50 cursor-pointer">
                            <span className="text-sm text-gray-700 w-2/3">{role.name}</span>
                            {role.isRestricted && (
                                <span className="text-xs font-semibold px-2 py-1 ml-1 rounded-sm text-gray-600 border border-gray-400 bg-gray-200">
                                    restricted
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 border-t border-gray-300 pt-6">
                    <button
                        className="flex items-center px-6 py-3 text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        onClick={() => setShowForm(true)}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create System-Wide Role
                    </button>
                </div>
            </div>
        </div>
    );
}


function NewTypeForm({ setCurrentSubView }) { // Simplified signature for standard JS/React

    // Placeholder for the Save icon (retained from your input)
    const Save = (props) => (
        <svg {...props} className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 3h10v18H7z" opacity=".25"/>
            <path d="M17 21v-4a1 1 0 00-1-1H8a1 1 0 00-1 1v4H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-2zM8 5h8v4H8V5z" />
        </svg>
    );

    // --- Components for Fields WITH the Orange Vertical Bar (Input or Custom Select Look) ---

    // Component for standard text inputs (Name, Short Designator, Manufacturer, Landing Gear Type)
    const InputFieldWithOrangeBar = ({ label, placeholder = "" }) => (
        <div>
            <label className="text-sm text-gray-700 block mb-1">{label}</label>
            <div className="relative">
                {/* Orange border element */}
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <input
                    type="text"
                    className={`pl-3 pr-2 py-2 h-9 w-full border border-gray-300 bg-white text-gray-800 focus:border-blue-500 focus:ring-blue-500 text-sm`}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );

    // Component for Custom Select Fields (Manufacturer/model, Aircraft category, Mass group)
    // These look like inputs with placeholders, so they also need the orange bar.
    const CustomSelectWithOrangeBar = ({ label, optional = false, placeholder = "(please select)", isNotSpecified = false }) => (
        <div>
            <label className="text-sm text-gray-700 block mb-1">
                {label}
                {optional && <span className="text-gray-500"> (optional)</span>}
            </label>
            <div className="relative">
                {/* Orange border element */}
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <input
                    type="text"
                    className={`pl-3 pr-2 py-2 h-9 w-full border border-gray-300 bg-white text-gray-500 focus:border-blue-500 focus:ring-blue-500 text-sm`}
                    placeholder={isNotSpecified ? "(not specified)" : placeholder}
                    readOnly // Visually acts as a display field
                />
            </div>
        </div>
    );

    // --- Components for Fields WITHOUT the Orange Vertical Bar (Standard Dropdowns) ---

    // Component for native dropdowns (Propulsion Type, Rotorcraft mass group)
    const StandardDropdownField = ({ label, optional = false, placeholder = "(please select)", isNotSpecified = false }) => (
        <div>
            <label className="text-sm text-gray-700 block mb-1">
                {label}
                {optional && <span className="text-gray-500"> (optional)</span>}
            </label>
            <select
                className={`w-full border border-gray-300 p-2 h-9 bg-white text-gray-500 focus:border-blue-500 focus:ring-blue-500 text-sm`}
                defaultValue="" 
            >
                <option value="" disabled className="text-gray-500">{isNotSpecified ? "(not specified)" : placeholder}</option>
                {/* Other options here */}
            </select>
        </div>
    );
    const propulsionOptions = [
  "Electrical",
  "Reciprocating",
  "Turboprop",
  "Turbofan",
  "Turbojet",
  "Turboshaft",
  "None",
  "Other",
  "Not Applicable",
  "Unknown",
];


    return (
        <div className="p-4 w-full bg-gray-50 min-h-screen">
        

            {/* --- TYPE SECTION CONTAINER --- */}
            <div className="bg-white p-6 shadow-sm w-full max-w-9xl mx-auto border border-gray-300 mb-6">
                <h2 className="text-base font-semibold text-gray-700 mb-4">Type</h2>

                {/* Name + Short Designator (Inputs with orange bar) */} 
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="md:col-span-2 ">
                        <InputFieldWithOrangeBar label="Name" />
                    </div>
                    <div>
                        <InputFieldWithOrangeBar label="Short Designator" />
                    </div>
                </div>

                {/* Manufacturer (Input with orange bar) */}
                <div className="mb-4">
                    <InputFieldWithOrangeBar label="Manufacturer" />
                </div>
            </div>

            {/* --- ADREP DETAILS SECTION CONTAINER --- */}
         <div className="w-full bg-white p-6 shadow-sm border border-gray-300">
  <h2 className="text-base font-semibold text-gray-700 mb-4">
    ADREP Type Details
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full mb-6">

    {/* Manufacturer/model */}
    <div className="col-span-1 md:col-span-2 flex flex-col justify-end">
      <CustomSelectWithOrangeBar
        label="Manufacturer/model"
        placeholder="(please select)"
      />
    </div>

    {/* Aircraft category */}
    <div className="col-span-1 md:col-span-2 flex flex-col justify-end">
      <CustomSelectWithOrangeBar
        label="Aircraft category"
        placeholder="(please select)"
      />
    </div>

  </div>

 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">

  {/* Propulsion type */}
  <div className="flex flex-col justify-end">
  <label className="text-sm text-gray-700 block mb-1">Propulsion type</label>

  <div className="relative">
    {/* Orange bar */}
    <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>

    <select
      className="pl-3 pr-2 py-2 h-9 w-full border border-gray-300 bg-white text-gray-700 text-sm"
    >
      <option value="">(please select)</option>
      <option>Electrical</option>
      <option>Reciprocating</option>
      <option>Turboprop</option>
      <option>Turbofan</option>
      <option>Turbojet</option>
      <option>Turboshaft</option>
      <option>None</option>
      <option>Other</option>
      <option>Not Applicable</option>
      <option>Unknown</option>
    </select>
  </div>
</div>

  {/* Landing gear type */}
  <div className="flex flex-col justify-end">
    <InputFieldWithOrangeBar
      label="Landing gear type"
      placeholder="(not specified)"
      
    />
  </div>

  {/* Mass group */}
  <div className="flex flex-col justify-end">
    <CustomSelectWithOrangeBar
      label="Mass group"
      placeholder="(please select)"
    />
  </div>

  {/* Rotorcraft mass group */}
  <div className="flex flex-col justify-end">
  <label className="text-sm text-gray-700 block mb-1">
    Rotorcraft mass group <span className="text-gray-500">(optional)</span>
  </label>

  <div className="relative">
    {/* Orange bar */}
    <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>

    <select
      className="pl-3 pr-2 py-2 h-9 w-full border border-gray-300 bg-white text-gray-700 text-sm"
    >
      <option value="">(not specified)</option>
      <option>0–2250 kg</option>
      <option>2251–3175 kg</option>
      <option>&gt; 3175 kg</option>
      <option>Not Applicable</option>
    </select>
  </div>
</div>


</div>

</div>




            {/* --- SAVE / CANCEL BUTTONS --- */}
            <div 
    // This outer wrapper is necessary to make the background and sticky effect span the full viewport width.
    className="fixed bottom-0 left-[224px] right-0 z-10 bg-gray-50"
>
    {/* Thin separator line above the buttons */}
    <hr className="border-t border-gray-300 w-full" />
    
    <div className="w-full border-t border-gray-300 bg-[#f5f7fa] py-4 flex justify-start px-6">
    
    {/* SAVE BUTTON */}
    <button
        className="
            flex items-center
            px-5 py-2.5
            bg-[#126fd6] hover:bg-[#155fa8]
            text-white text-sm font-medium
            rounded-sm
            shadow-sm
            border border-[#126fd6]
        "
    >
        <Save className="w-4 h-4 mr-2" />
        Save
    </button>

    {/* CANCEL BUTTON */}
    <button
        className="
            ml-3
            px-5 py-2.5
            bg-white hover:bg-gray-50
            text-[#126fd6] text-sm
            rounded-sm
            border border-[#126fd6]
            shadow-sm
        "
        onClick={() => setCurrentSubView('Table')}
    >
        Cancel
    </button>

</div>


</div>
        </div>
    ); 
}
function AircraftTypesConfig({
    setCurrentSubView,
    setSelectedType
}: {
    setCurrentSubView: (view: string) => void;
    setSelectedType: (type: any) => void;
}) {
    return (
        <div className="p-8 w-full"> 
            <div className="bg-white p-6 w-full max-w-9xl mx-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Manufacturer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Variants
                            </th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Airbus
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                A320
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                A320-200
                            </td>

                            {/* EDIT BUTTON */}
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button
                                    className="text-blue-600 hover:underline"
                                    onClick={() => {
                                        setSelectedType({
                                            manufacturer: "Airbus",
                                            type: "A320",
                                            variants: ["A320-200"]
                                        });
                                        setCurrentSubView("Edit Type");
                                    }}
                                >
                                    Edit Type
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* ADD TYPE BUTTON */}
                <div className="mt-6">
                    <button
                        className="flex items-center px-6 py-3 text-sm font-medium rounded-md shadow-sm text-white bg-[#126fd6] hover:bg-blue-700"
                        onClick={() => setCurrentSubView("New Type")}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Type
                    </button>
                </div>
            </div>
        </div>
    );
}


function SafetyReportNumberingConfig() {
    return (
        <div className="p-8 w-full">
            <div className="bg-white p-6 w-full max-w-9xl mx-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white">
                        <tr>
                            <th scope="col" className="w-1/6 px-6 py-3 text-left text-sm font-medium text-gray-500"></th> 
                            <th scope="col" className="w-1/6 px-6 py-3 text-left text-sm font-medium text-gray-500">Prefix</th>
                            <th scope="col" className="w-1/6 px-6 py-3 text-left text-sm font-medium text-gray-500">Seed No</th>
                            <th scope="col" className="w-1/6 px-6 py-3 text-left text-sm font-medium text-gray-500">Suffix</th>
                            <th scope="col" className="w-1/6 px-6 py-3 text-left text-sm font-medium text-gray-500">Next Number Preview</th>
                            <th scope="col" className="w-1/6 px-6 py-3 text-left text-sm font-medium text-gray-500"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Safety Reports
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input type="text" className="w-full border border-gray-300 p-2 rounded-md shadow-sm bg-gray-100" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input type="text" className="w-full border border-gray-300 p-2 rounded-md shadow-sm bg-gray-100" defaultValue="94"/>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input type="text" className="w-full border border-gray-300 p-2 rounded-md shadow-sm bg-gray-100" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                000094
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    className="px-16 py-1 text-sm font-medium rounded-md text-blue-700 border border-blue-300 bg-white hover:bg-blue-50"
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-8">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Guidance</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 pl-4">
                        <li><span className="font-bold text-black-600 text-sm">CAUTION:</span> Changes made here can be overwritten by ALL Safety Subsystems.</li>
                        <li>Report numbers are auto-incrementing, but you can specify a Prefix and/or Suffix.</li>
                        <li>Prefixes and/or Suffixes may contain special date tags, which automatically update, as follows: **{'{YYYY}'}** = current year **{'{MM}'}** = current month.</li>
                        <li>You can also (re)set the **'Seed No'** - the number that will be used for the next Report submitted.</li>
                        <li>The auto-incrementing number part will be left-padded with zeroes to make a 6 character string, eg: '23' becomes '000023'.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function NewAircraftForm({ setCurrentSubView }: { setCurrentSubView: (view: string) => void }) {
    return (
        <div className="p-8 w-full">
            <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-5xl mx-auto">
                
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Aircraft Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select className="mt-1 block w-full border border-orange-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100">
                            <option>Select Type (e.g., Airbus A320)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Registration Mark (Tail Number)</label>
                        <input type="text" className="mt-1 block w-full border border-orange-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Serial No.</label>
                        <input type="text" className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Owner/Operator</label>
                        <input type="text" className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100" />
                    </div>
                </div>
                
                <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Operational Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">In Service Date (Optional)</label>
                        <input type="date" className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Flight Hours (Optional)</label>
                        <input type="number" className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Current Cycles (Optional)</label>
                        <input type="number" className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm bg-gray-100" />
                    </div>
                </div>

            </div>

            {/* Save/Cancel Buttons */}
            <div className="mt-4 p-4 flex gap-3 bg-white border-t w-full max-w-5xl mx-auto">
                <button
                    className="flex items-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                    <Save className="w-4 h-4 mr-1"/>
                    Save
                </button>
                <button
                    className="px-4 py-2 text-base font-medium rounded-md text-gray-700 border border-gray-300 bg-white hover:bg-gray-50"
                    onClick={() => setCurrentSubView('Table')}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

function AircraftConfig({ setCurrentSubView, currentSubView }: { setCurrentSubView: (view: string) => void, currentSubView: string }) {

    // Check if we should render the New Aircraft Form or the Search/Table
    if (currentSubView === 'New Aircraft') {
        return <NewAircraftForm setCurrentSubView={setCurrentSubView} />;
    }

    // Default view: Search and Table
    return (
        <div className="p-8 w-full"> 
            <div className="bg-white p-6 w-full max-w-9xl mx-auto">
                
                {/* Search Bar - Uses items-end to align input and button bases */}
                <div className="flex items-end space-x-4 mb-8">
                    
                    {/* 1. Search Input */}
                    <div>
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Part of mark, type or owner</label>
                        <input 
                            id="search"
                            type="text" 
                            // Fixed width of 300px based on user's inline code 
                            className="w-[300px] border border-gray-300 p-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                        />
                    </div>
                    
                    {/* 2. Search Button - Right next to the input */}
                    <button
                        className="flex items-center px-6 py-3 text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700" 
                        onClick={() => console.log("Search Aircraft clicked")}
                    >
                        <Search className="mr-2 h-4 w-4" />
                        Search
                    </button>
                </div>

                {/* Aircraft Table */}
                <table className="min-w-full divide-y divide-gray-200 border-t border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial No.</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Mark</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            {/* Empty state placeholder */}
                           <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                           </td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-6">
                    <button
                        className="flex items-center px-6 py-3 text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        onClick={() => setCurrentSubView('New Aircraft')}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Aircraft
                    </button>
                </div>
            </div>
        </div>
    );
}

// Default component for the main view when no specific config is selected
function ConfigOverviewWrapper({ setCurrentView }: { setCurrentView: (view: string) => void }) {
    return <ConfigOverview configSections={configData} setCurrentView={setCurrentView} />;
}

// ----------------------------------------------------
// --- 3. Main ConfigPage Component (FINAL EXPORT) ---
// ----------------------------------------------------

export default function ConfigPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    // Set initial view to 'Overview' so the config cards show first
    const [currentView, setCurrentView] = useState('Overview'); 
    // State to manage sub-views like 'Table' or 'New Aircraft'
    const [currentSubView, setCurrentSubView] = useState('Table'); 

    const handleSetCurrentView = (view: string) => {
        setCurrentView(view);
        // Reset subview when switching major view
        setCurrentSubView('Table'); // Default to 'Table' for any new main view
    };
    
    let breadcrumbPath;
    let mainContent;

    if (currentView === 'Departments') { 
        breadcrumbPath = (
            <>
                <a href="/" className="text-gray-500 hover:text-gray-700">Dashboard</a>
                <span className="mx-2 text-gray-400">/</span>
                <a href="#" onClick={() => handleSetCurrentView('Overview')} className="text-gray-500 hover:text-gray-700">System Configuration</a>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-medium text-gray-900">Organisation Detail</span>
            </>
        );
        mainContent = <DepartmentsConfig />; // RENDER THE DEPARTMENTS COMPONENT

    } else if (currentView === 'System-Wide User Roles') {
        breadcrumbPath = (
            <>
                <a href="/" className="text-gray-500 hover:text-gray-700">Dashboard</a>
                <span className="mx-2 text-gray-400">/</span>
                <a href="#" onClick={() => handleSetCurrentView('Overview')} className="text-gray-500 hover:text-gray-700">System Configuration</a>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-medium text-gray-900">System-Wide User Roles</span>
            </>
        );
        mainContent = <SystemWideRolesConfig />;

    } else if (currentView === 'Aircraft') {
        breadcrumbPath = (
            <>
                <a href="/" className="text-gray-500 hover:text-gray-700">Dashboard</a>
                <span className="mx-2 text-gray-400">/</span>
                <a href="#" onClick={() => handleSetCurrentView('Overview')} className="text-gray-500 hover:text-gray-700">System Configuration</a>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-medium text-gray-900">Aircraft</span>
            </>
        );
        mainContent = <AircraftConfig setCurrentSubView={setCurrentSubView} currentSubView={currentSubView} />;

    } else if (currentView === 'Safety Report Numbering') {
        breadcrumbPath = (
            <>
                <a href="/" className="text-gray-500 hover:text-gray-700">Dashboard</a>
                <span className="mx-2 text-gray-400">/</span>
                <a href="#" onClick={() => handleSetCurrentView('Overview')} className="text-gray-500 hover:text-gray-700">System Configuration</a>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-medium text-gray-900">Safety Report Numbering</span>
            </>
        );
        mainContent = <SafetyReportNumberingConfig />;

    } else if (currentView === 'Aircraft Types') {
        breadcrumbPath = (
            <>
                <a href="/" className="text-gray-500 hover:text-gray-700">Dashboard</a>
                <span className="mx-2 text-gray-400">/</span>
                <a href="#" onClick={() => handleSetCurrentView('Overview')} className="text-gray-500 hover:text-gray-700">System Configuration</a>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-medium text-gray-900">Aircraft Types</span>
            </>
        );
        if (currentSubView === 'New Type') {
            mainContent = <NewTypeForm setCurrentSubView={setCurrentSubView} />;
        } else {
            mainContent = <AircraftTypesConfig setCurrentSubView={setCurrentSubView} />;
        }
    } else { // 'Overview' view
        breadcrumbPath = (
            <>
                <a href="/" className="text-gray-500 hover:text-gray-700">Dashboard</a>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-medium text-gray-900">System Configuration</span>
            </>
        );
        mainContent = <ConfigOverviewWrapper setCurrentView={handleSetCurrentView} />;
    }

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            
            {/* The Sidebar component is assumed to be defined elsewhere */}
            <Sidebar isOpen={sidebarOpen} /> 

            <div className="flex-1 flex flex-col overflow-hidden">

                {/* The Header component is assumed to be defined elsewhere */}
                <Header currentPage="System Configuration" />

                <div className="bg-gray-100 border-b border-gray-300 px-8 py-3">
                    <p className="text-sm text-gray-700">
                        {breadcrumbPath}
                    </p>
                </div>

                {/* IMPORTANT: This container must allow scrolling for the sticky buttons in DepartmentsConfig to work */}
                <div className="flex-1 overflow-y-auto">
                    {mainContent} 
                </div>

            </div>
        </div>
    );
}

// Export the main component
// export default ConfigPage; // Already exported above