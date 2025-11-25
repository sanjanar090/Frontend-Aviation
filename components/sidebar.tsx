'use client'

import { useState } from 'react'
<<<<<<< HEAD
import { LayoutGrid, Shield, CheckSquare, Zap, AlertTriangle, Package, Settings, Users, LifeBuoy, ChevronDown } from 'lucide-react'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>('Safety')
  
  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', href: '/', active: false },
=======
import Link from 'next/link'
import Image from 'next/image' // Import Image component

import {
  LayoutGrid, Shield, CheckSquare, Zap, AlertTriangle,
  Package, Settings, Users, ChevronDown
} from 'lucide-react'

// Define the URL for the Dale Aviation logo
const DALE_AVIATION_LOGO_URL = 'https://dale-aviation-test.centrik.net/Files/Logos/Dale_Aviation_high_res.png'

// Define the URL for the Centrik logo (NEW)
const CENTRIK_LOGO_URL = 'https://dale-aviation-test.centrik.net/Images/MainMenu/v5/centrik-logo.svg'

/** CUSTOM SUPPORT ICON (Circled 'i') **/
function InfoCircle(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

/** 🚀 MODIFIED: CUSTOM COLLAPSE ICON (To exactly match the three lines with arrow in the image) **/
function CollapseMenuIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Arrow pointing left */}
      <polyline points="7 12 3 16 3 8 7 12" /> 
      {/* Three lines that look like a menu/list */}
      <line x1="10" y1="4" x2="21" y2="4" />
      <line x1="10" y1="12" x2="21" y2="12" />
      <line x1="10" y1="20" x2="21" y2="20" />
    </svg>
  )
}


interface SidebarProps {
  isOpen: boolean
  onToggleSidebar: () => void
}

export default function Sidebar({ isOpen, onToggleSidebar }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const currentPath = null 

  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', href: '/' },
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
    {
      icon: Shield,
      label: 'Safety',
      href: '/safety',
<<<<<<< HEAD
      active: false,
=======
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
      submenu: [
        { label: 'Safety', href: '/safety' },
        { label: 'Health, Safety and E...', href: '/safety/health' },
        { label: 'Analysis (All)', href: '/safety/analysis' },
      ],
    },
    {
      icon: CheckSquare,
      label: 'Compliance',
      href: '/compliance',
<<<<<<< HEAD
      active: false,
=======
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
      submenu: [
        { label: 'Compliance', href: '/compliance' },
        { label: 'Regulations', href: '/compliance/regulations' },
        { label: 'Regs: Amendments', href: '/compliance/amendments' },
      ],
    },
<<<<<<< HEAD
    { icon: Zap, label: 'Workflows', href: '/workflows', active: false },
    { icon: AlertTriangle, label: 'Risk', href: '/risk' },
    { icon: Package, label: 'Devices', href: '/devices' },
    { icon: Settings, label: 'Config', href: '/config' },
    { icon: Users, label: 'Contacts', href: '/contacts' },
    { icon: LifeBuoy, label: 'Support', href: '/support' },
  ]

  return (
    <aside className="w-56 sidebar-bg text-white flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 sidebar-border border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border-2 border-white rounded flex items-center justify-center text-xs font-bold">
            DA
          </div>
          <span className="font-bold text-lg">Dale Aviation</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item, idx) => {
          const Icon = item.icon
          const hasSubmenu = 'submenu' in item
          const isExpanded = expandedMenu === item.label

          return (
            <div key={idx}>
              <button
                onClick={() => hasSubmenu && setExpandedMenu(isExpanded ? null : item.label)}
                className={`sidebar-nav-item w-full ${item.active ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {hasSubmenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                )}
              </button>

              {/* Submenu */}
              {hasSubmenu && isExpanded && (
                <div className="bg-blue-900 bg-opacity-50">
                  {item.submenu?.map((subitem, subidx) => (
                    <Link
                      key={subidx}
                      href={subitem.href}
                      className="block px-8 py-2 text-sm text-white hover:bg-blue-800 transition-colors"
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer Logo */}
      <div className="px-6 py-6 sidebar-border border-t">
        <div className="text-xs text-gray-400">
          Centrik
        </div>
      </div>
    </aside>
  )
}
=======
    { icon: Zap, label: 'Workflows', href: '/workflows' },
    { icon: AlertTriangle, label: 'Risk', href: '/risk' }, 
    { icon: Package, label: 'Devices', href: '/devices' },
    { icon: Settings, label: 'Config', href: '/config' },
    { icon: Users, label: 'Contacts', href: '/contacts' },
  ]

  const lowerMenuItems = [
    {
      icon: InfoCircle,
      label: 'Support',
      href: '/support',
      submenu: [
        { label: 'Learn Centrik', href: '/support/learn' },
        { label: 'Documentation', href: 'https://helpdesk.trustflight.com/hc/en-gb' },
      ],
    },
  ]

  const renderCollapsibleItem = (item: any, key: number, isLowerItem = false) => {
    const Icon = item.icon
    const isExpanded = expandedMenu === item.label
    const isActive = item.href === currentPath 
    
    const paddingClass = !isCollapsed
      ? 'px-4 py-3' 
      : 'py-3 px-0'

    const activeClass = isActive ? 'bg-blue-600 border-l-4 border-white' : 'hover:bg-blue-800'
    
    const itemClasses = `sidebar-nav-item w-full text-white transition-colors ${paddingClass} ${activeClass} ${!isCollapsed ? 'justify-start' : 'justify-center'}`

    return (
      <div key={key}>
        {item.submenu ? (
          <button
            onClick={() => {
              if (!isCollapsed) {
                setExpandedMenu(isExpanded ? null : item.label)
              }
            }}
            className={`flex items-center justify-between ${itemClasses} text-white`} 
          >
            <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
              <Icon className={`w-5 h-5 ${!isCollapsed ? 'mr-2' : 'mx-auto'}`} />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </div>

            {!isCollapsed && item.submenu && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            )}
          </button>
        ) : (
          <Link
            href={item.href}
            className={`flex items-center ${itemClasses}`} 
          >
            <Icon className={`w-5 h-5 ${!isCollapsed ? 'mr-2' : 'mx-auto'}`} />
            {!isCollapsed && <span className="text-sm">{item.label}</span>}
          </Link>
        )}

        {item.submenu && isExpanded && !isCollapsed && (
          <div className="bg-blue-900 bg-opacity-50">
            {item.submenu.map((subitem: any, subidx: number) => (
              <Link
                key={subidx}
                href={subitem.href}
                className="block pl-12 pr-4 py-2 text-sm hover:bg-blue-800 transition-colors"
              >
                {subitem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside
      className={`bg-slate-900 text-white flex flex-col transition-all duration-300 h-screen
      ${isCollapsed ? 'w-20' : 'w-56'}
    `}
    >
      {/* 1. LOGO HEADER SECTION - Dale Aviation */}
      <div className={`px-4 py-4 ${isCollapsed ? 'px-0 text-center' : ''}`}>
        <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className={`w-8 h-8 relative ${isCollapsed ? 'mx-auto' : ''}`}>
            <Image
              src={DALE_AVIATION_LOGO_URL}
              alt="Dale Aviation Logo"
              fill={true} 
              sizes="32px"
              className="object-contain" 
            />
          </div>
          {!isCollapsed && <span className="font-bold text-lg">Dale Aviation</span>}
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav className="flex-1 overflow-y-auto pt-2 pb-4">
        {/* Render upper menu items */}
        {menuItems.map((item, idx) => renderCollapsibleItem(item, idx))}
      </nav>

      {/* 3. LOWER SECTION (Support, Collapse, Centrik) */}
      <div className="pt-2 mb-7">
        {lowerMenuItems.map((item, idx) =>
          renderCollapsibleItem(item, idx + menuItems.length, true)
        )}

        {/* Collapse Menu Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full flex items-center transition-all hover:bg-blue-800 border-t border-gray-700 text-white ${
            isCollapsed ? 'justify-center px-0 py-3' : 'px-4 py-3'
          }`}
        >
          {isCollapsed ? (
            // Rotate the new icon 180 degrees to point the arrow right when collapsed
            <CollapseMenuIcon className="w-5 h-5 text-gray-300 rotate-180" />
          ) : (
            <>
              <CollapseMenuIcon className="w-5 h-5 mr-2 text-gray-300" />
              <span className="text-sm">Collapse menu</span>
            </>
          )}
        </button>

        {/* Centrik Logo */}
        <div
          className={`px-4 py-4 flex justify-center items-center ${
            isCollapsed ? 'px-0 py-3' : ''
          }`}
        >
          <div className={`${isCollapsed ? 'w-10 h-6' : 'w-20 h-6'} relative`}>
            <Image
              src={CENTRIK_LOGO_URL}
              alt="Centrik Logo"
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

    </aside>
  )
}
>>>>>>> b75a8b4a776e32a1ee56f24a596b27f958aae8a5
