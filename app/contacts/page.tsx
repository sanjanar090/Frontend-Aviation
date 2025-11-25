'use client';

import { useState } from "react";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

// Importing Lucide icons used across the component
import { Menu, Share2, Link2, Flag, Search, Download, Plus, Settings2 } from 'lucide-react'

// --- Data & Types (Kept as provided) ---
interface Contact {
  id: string
  name: string
  jobTitle: string
  department: string
  email: string
  tel: string
  mobile: string
  username: string
}

const contacts: Contact[] = [
  {
    id: '1',
    name: 'Dhirendra Kumar',
    jobTitle: 'Certifying Staff',
    department: 'Maintenance',
    email: 'dk_ame@yahoo.com',
    tel: '',
    mobile: '',
    username: 'DKumar',
  },
  {
    id: '2',
    name: 'Centrik Support',
    jobTitle: 'Customer Support Team',
    department: 'Support',
    email: 'Support@centrik.net',
    tel: '+44(0)203 855 5972',
    mobile: '',
    username: 'csupport',
  },
  {
    id: '3',
    name: 'Krsmanovic, Moncilo',
    jobTitle: '',
    department: 'Maintenance',
    email: 'momcilocz@hotmail.com',
    tel: '+381 (69) 11 99 513',
    mobile: '',
    username: 'm_krsmanovic',
  },
  {
    id: '4',
    name: 'POTHIRAJ, Karthick',
    jobTitle: 'Certifying Staff',
    department: 'Maintenance',
    email: 'spkarthickame@gmail.com',
    tel: '+91 89035 81485',
    mobile: '',
    username: 'KPothiraj',
  },
  {
    id: '5',
    name: 'ABDALLAH MOHAMED, Mohamed',
    jobTitle: 'Production Planning Engineer',
    department: 'Maintenance & Engineering',
    email: 'mmohamed@dale-aviation.com',
    tel: '',
    mobile: '',
    username: 'MAbdallah',
  },
  {
    id: '6',
    name: 'ABDUL JALEEL, Mohamed Haroon Rasheed',
    jobTitle: 'Certifying Staff',
    department: 'Maintenance',
    email: 'rasheedbinjaleel@gmail.com',
    tel: '+919442392894',
    mobile: '',
    username: '',
  },
  {
    id: '7',
    name: 'Androcec, Josip',
    jobTitle: 'Certifying Staff',
    department: 'Maintenance & Engineering',
    email: 'josip.androcec@gmail.com',
    tel: '+38599811791',
    mobile: '',
    username: '',
  },
]

const letterGroups = ['All', 'A', 'B', 'C', 'D-F', 'G-I', 'J-L', 'M', 'N-O', 'P', 'Q-R', 'S', 'T-Z', 'Other']

// --- System-Wide Roles Data (Based on image) ---
const systemWideRoles = [
  { name: 'Centrik Admin (Internal)', type: 'link' }, 
  { name: 'Centrik Support', type: 'restricted' },
  { name: 'Shared Device', type: 'link' },
  { name: 'Third Party Quality Manager', type: 'link' }, 
  { name: 'User', type: 'link' },
];

// --- Department Data (Based on images) ---
const organizationDepartments = [
    { department: 'Administration', roles: ['Accountancy', 'Administration'] },
    { department: 'Blank', roles: [] },
    { department: 'CHR Managment', roles: [] },
    { department: 'Compliance Monitoring', roles: ['Compliance Monitoring Auditor', 'Compliance Monitoring Manager', 'Training and Quality Assistant'] },
    { department: 'Contract Signing Group', roles: [] },
    { department: 'CS Authorization', roles: [] },
    { department: 'Information Technology', roles: ['IT'] },
    { department: 'Logistics', roles: ['Logistic', 'Logistic Manager'] },
    { department: 'Maintenance', roles: ['Certifying Staff', 'Maintenance Manager', 'Station Manager'] },
    { department: 'Maintenance & Engineering', roles: ['Engineering', 'Maintenance Manager', 'Mechanic'] },
    { department: 'Management Team', roles: ['Accountable Manager', 'Compliance Monitoring Manager', 'Maintenance Manager'] },
    { department: 'Safety', roles: ['Safety Manager'] },
    { department: 'Training', roles: ['Training Manager'] },
];

// --- Main Component ---
export default function ContactsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('departments') 
  const [selectedLetter, setSelectedLetter] = useState('All')
  const [department, setDepartment] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Access Rights specific states
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedAccessDept, setSelectedAccessDept] = useState('all');
  
  // Departments Section State
  const [departmentViewTab, setDepartmentViewTab] = useState('General'); 

  // --- Helper Components for Department View ---

  // Component for a single Department Row
  const DepartmentRow = ({ department, roles }: { department: string, roles: string[] }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors bg-white">
        <td className="px-6 py-3 text-gray-900">{department}</td>
        <td className="px-6 py-3">
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View</button>
        </td>
        <td className="px-6 py-3 text-gray-700">{roles.join(', ')}</td>
    </tr>
  );

  // Component for the Departments Section
  const DepartmentsSection = () => {
    
    // Helper component for Organization Detail field pairs
    const DetailField = ({ label, value }: { label: string, value: string }) => (
      <div className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
        <span className="text-sm font-medium text-gray-700 w-1/3">{label}</span>
        <span className="text-sm text-gray-900 w-2/3">{value}</span>
      </div>
    );
    
    // Helper for Address/Financial Address
    const AddressField = ({ label, value }: { label: string, value: string }) => (
      <div className="flex py-2 border-b border-gray-100 last:border-b-0">
        <span className="text-sm font-medium text-gray-700 w-1/3">{label}</span>
        <div className="flex w-2/3">
            <span className="text-sm text-gray-900 w-1/2">{value}</span>
            <span className="text-sm font-medium text-gray-700 w-1/2">Financial Address</span>
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Organisation Detail</h2>

          {/* Top Detail Section */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
            <div>
              <DetailField label="Name" value="Dale Aviation" />
              <DetailField label="Organisation Date Format" value="British (dd/mm/yyyy)" />
              <DetailField label="Oversight Period (Months)" value="-" />
              <DetailField label="Comments" value="-" />
            </div>
            <div>
              <DetailField label="Location" value="-" />
              <DetailField label="TLA (Three letter code)" value="oOP" />
            </div>
            {/* The Date Format setting box is placed visually next to the format detail */}
            <div className="col-span-2 flex justify-start -mt-8 ml-80">
                <div className="border border-gray-300 p-2 text-xs text-gray-600 flex items-center h-10">
                    Use System Default<br/>Date Format
                </div>
            </div>
          </div>
          
          {/* General / Oversight Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <button
              onClick={() => setDepartmentViewTab('General')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                departmentViewTab === 'General'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setDepartmentViewTab('Oversight')}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                departmentViewTab === 'Oversight'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              Oversight
            </button>
          </div>
          
          {/* Tab Content (General) */}
          {departmentViewTab === 'General' && (
            <div className="space-y-6">
                
              {/* Address Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden p-4 bg-gray-50">
                <h3 className="text-base font-semibold text-slate-900 mb-2">Address</h3>
                <div className="bg-white p-4">
                    <AddressField label="Address" value="-" />
                </div>
              </div>
              
              {/* Attachments Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden p-4 bg-gray-50">
                <h3 className="text-base font-semibold text-slate-900 mb-2">Attachments</h3>
                <div className="bg-white p-4 text-sm text-gray-700">
                    There are no associated attachments.
                    <div className="border-2 border-dashed border-blue-300 p-6 mt-4 flex justify-center items-center">
                        <button className="text-blue-600 font-medium flex items-center">
                            <Plus className="w-4 h-4 mr-1"/>
                            Add Attachment
                        </button>
                        <span className="ml-2 text-gray-500">or drag and drop files</span>
                    </div>
                </div>
              </div>
              
              {/* Organisation Type Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden p-4 bg-gray-50">
                <h3 className="text-base font-semibold text-slate-900 mb-2">Organisation Type</h3>
                <div className="bg-white p-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm mb-2">Change</button>
                    <p className="text-sm text-gray-900">Maintenance Organisation</p>
                </div>
              </div>

              {/* Departments List */}
              <div className="border border-gray-200 rounded-lg overflow-hidden p-4 bg-gray-50">
                <h3 className="text-base font-semibold text-slate-900 mb-2">Departments</h3>
                <div className="bg-white p-4 border-b border-gray-200">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Add</button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-y border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700 w-1/3">Department</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700 w-16"></th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">Roles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {organizationDepartments.map((dept, index) => (
                                <DepartmentRow 
                                    key={index} 
                                    department={dept.department} 
                                    roles={dept.roles} 
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

              </div>
              
            </div>
          )}
          
          {/* Tab Content (Oversight) - Placeholder */}
          {departmentViewTab === 'Oversight' && (
            <div className="p-4 text-gray-600">Oversight details go here.</div>
          )}

        </div>
        
        {/* Footer Actions */}
        <div className="flex justify-start space-x-3 mt-4">
            <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-150 text-sm">
                Edit
            </button>
            <button className="border border-red-600 text-red-600 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition duration-150 text-sm">
                Delete
            </button>
        </div>
      </div>
    );
  };


  // --- Helper Components for System-Wide Roles ---

  // Component for a single role item - STYLED TO MATCH IMAGE
  const RoleItem = ({ name, type }: { name: string, type: string }) => {
    const isRestricted = type === 'restricted';
    const isLink = type === 'link';
    
    let textClasses = 'text-gray-900';
    if (isLink) {
        textClasses = 'text-blue-600 hover:text-blue-700 hover:underline';
    }

    return (
      // The restricted item has a light gray background in the image, others are white
      // Uses `flex-col` wrapper and padding to match the image spacing
      <div className={`flex flex-col border-b border-gray-100 cursor-pointer ${isRestricted ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}>
        <div className="px-4 py-2.5 flex items-center">
            
            <span className={`text-sm font-medium ${textClasses}`}>
                {name}
            </span>

            {/* Restricted Tag - Placed immediately next to the name, with small horizontal margin */}
            {isRestricted && (
                <span className="ml-3 bg-gray-300 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                    restricted
                </span>
            )}
        </div>
      </div>
    );
  };

  // Component for the Roles List section - STYLED TO MATCH IMAGE
  const SystemWideRolesList = () => {
    return (
      // Main container with padding to separate it from the tabs
      <div className="p-6 bg-white shadow-sm max-w-full">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Roles</h3>
        
        {/* Header Row for Role list - Matches simple style in the image */}
        <div className="bg-gray-50 px-4 py-2 border-y border-gray-200 text-sm font-medium text-gray-700">
            Role
        </div>

        {/* List Container - Note: The top border is handled by the header's border-y */}
        <div className="border-b border-gray-200 overflow-hidden">
          {systemWideRoles.map((role, index) => (
            <RoleItem key={index} name={role.name} type={role.type} />
          ))}
        </div>

        {/* Create Button - Increased size to match image */}
        <button className="mt-8 flex items-center bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg hover:bg-blue-700 transition duration-150 text-base">
          <Plus className="h-4 w-4 mr-2" />
          Create System-Wide Role
        </button>
      </div>
    );
  };
  
  // --- Access Rights Components ---
  const AccessRightsSection = () => {
    // Helper component for the table headers
    const TableHeader = ({ title, colSpan, isRightAligned = false, isSmall = false }: { title: string, colSpan?: number, isRightAligned?: boolean, isSmall?: boolean }) => (
        <th 
            colSpan={colSpan} 
            className={`py-2 px-4 text-left font-semibold text-gray-700 ${isRightAligned ? 'text-right' : ''} ${isSmall ? 'w-16' : ''}`}
        >
            {title}
        </th>
    );

    return (
      <div className="space-y-6">
        {/* Scope Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Scope</h2>

          <div className="flex items-end space-x-4">
            {/* Module Dropdown */}
            <div>
              <label htmlFor="module-select" className="block text-sm font-medium text-gray-700 mb-1">
                Module
              </label>
              <div className="flex items-center space-x-2">
                <select
                  id="module-select"
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none w-52"
                >
                  <option value="">(please select)</option>
                  <option value="contacts">Contacts</option>
                  <option value="safety">Safety</option>
                </select>
                <span className="text-lg text-gray-700">-</span>
              </div>
            </div>

            {/* Access Right Dropdown */}
            <div>
              <label htmlFor="access-right-select" className="block text-sm font-medium text-gray-700 mb-1">
                Access Right
              </label>
              <select
                id="access-right-select"
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none w-52"
              >
                <option value="">-</option>
              </select>
            </div>
          </div>
          
          {/* Department Dropdown & Search Button */}
          <div className="flex items-end space-x-4 mt-4">
            <div>
              <label htmlFor="access-department-select" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                id="access-department-select"
                value={selectedAccessDept}
                onChange={(e) => setSelectedAccessDept(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none w-52"
              >
                <option value="all">(all)</option>
                <option value="maintenance">Maintenance</option>
                <option value="support">Support</option>
              </select>
            </div>

            <button className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-150 text-sm">
                Search
            </button>
          </div>
        </div>

        {/* Groups Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-slate-900 p-4 border-b border-gray-200">Groups</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                    <TableHeader title="Department" />
                    <TableHeader title="Role" />
                    <TableHeader title="Rights" isRightAligned colSpan={3} />
                </tr><tr className="bg-gray-50 text-xs font-normal text-gray-600">
                    <td className="p-0 border-b border-gray-200" colSpan={2}></td> {/* Empty cells for Department and Role */}
                    <TableHeader title="Sys." isRightAligned isSmall />
                    <TableHeader title="Dept." isRightAligned isSmall />
                    <td className="p-0 border-b border-gray-200"></td> {/* Placeholder for empty cell */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {/* Example rows */}
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900"></td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">Admin</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900 text-right">Full Access</td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-blue-600 font-bold">✓</td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-gray-400">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-slate-900 p-4 border-b border-gray-200">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                    <TableHeader title="Department" />
                    <TableHeader title="User" />
                    <TableHeader title="Rights" isRightAligned colSpan={3} />
                    <TableHeader title="From roles:" />
                </tr><tr className="bg-gray-50 text-xs font-normal text-gray-600">
                    <td className="p-0 border-b border-gray-200" colSpan={2}></td> {/* Empty cells */}
                    <TableHeader title="All" isRightAligned isSmall />
                    <TableHeader title="Dept." isRightAligned isSmall />
                    <td className="p-0 border-b border-gray-200" colSpan={2}></td> {/* Empty cells */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {/* Example rows */}
                <tr>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">Maintenance</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">Dhirendra Kumar</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900 text-right">Edit</td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-blue-600 font-bold">✓</td>
                  <td className="px-6 py-3 whitespace-nowrap text-right text-gray-400">-</td>
                  <td className="px-6 py-3 whitespace-nowrap text-gray-900">Certifying Staff</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // --- Tab Data ---
  const tabs = [
    { id: 'all-contacts', label: 'All contacts' },
    { id: 'departments', label: 'Departments' },
    { id: 'system-roles', label: 'System-Wide Roles' },
    { id: 'access-rights', label: 'Access rights' },
  ]


  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />

      {/* MAIN COLUMN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="Contacts" />

        {/* PAGE TOP BAR (Placeholder, as content is empty) */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-8 py-4 flex items-center justify-between">
            {/* Content for Page Top Bar */}
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-8 flex items-center gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="px-8 py-8 overflow-auto">
          {/* RENDER ALL CONTACTS TAB */}
          {activeTab === 'all-contacts' && (
            <div className="bg-white rounded-lg shadow-sm">

              {/* HEADER + FILTERS */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">All contacts (149)</h2>

                {/* Department Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none w-48"
                  >
                    <option value="all">(all)</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="support">Support</option>
                    <option value="engineering">Engineering</option>
                  </select>
                </div>

                {/* Letter Groups */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {letterGroups.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        selectedLetter === letter
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm">
                    <Plus className="w-4 h-4" />
                    Add contact
                  </button>

                  <div className="flex-1 flex items-center gap-2 relative">
                    <Search className="w-4 h-4 text-gray-400 absolute ml-3" />
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none w-full max-w-sm"
                    />
                  </div>

                  <button className="border border-blue-600 hover:bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm">
                    <Settings2 className="w-4 h-4" />
                    Show settings
                  </button>
                </div>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Name ▼</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Job title / Rank ▼</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Department ▼</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">E-mail ▼</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Tel. ▼</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">Mobile ▼</th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-700">User name ▼</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contacts.map((contact, index) => (
                      <tr
                        key={contact.id}
                        className={`border-b border-gray-200 hover:bg-gray-50 transition-colors bg-white`}
                      >
                        <td className="px-6 py-3 text-gray-900">{contact.name}</td>
                        <td className="px-6 py-3 text-gray-700">{contact.jobTitle}</td>
                        <td className="px-6 py-3 text-gray-700">{contact.department}</td>
                        <td className="px-6 py-3 text-gray-700">{contact.email}</td>
                        <td className="px-6 py-3 text-gray-700">{contact.tel}</td>
                        <td className="px-6 py-3 text-gray-700">{contact.mobile}</td>
                        <td className="px-6 py-3 text-gray-900 font-medium">{contact.username}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* FOOTER */}
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button className="border border-blue-600 hover:bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          )}

          {/* RENDER DEPARTMENTS TAB */}
          {activeTab === 'departments' && (
            <DepartmentsSection />
          )}
          
          {/* RENDER SYSTEM-WIDE ROLES TAB */}
          {activeTab === 'system-roles' && (
            <SystemWideRolesList />
          )}

          {/* RENDER ACCESS RIGHTS TAB */}
          {activeTab === 'access-rights' && (
            <AccessRightsSection />
          )}

        </main>
      </div>
    </div>
  )
}