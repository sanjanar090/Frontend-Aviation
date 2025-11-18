'use client'

import { useState } from 'react'
import { LayoutGrid, Shield, CheckSquare, Zap, AlertTriangle, Package, Settings, Users, LifeBuoy, ChevronDown } from 'lucide-react'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>('Safety')
  
  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', href: '/', active: false },
    {
      icon: Shield,
      label: 'Safety',
      href: '/safety',
      active: false,
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
      active: false,
      submenu: [
        { label: 'Compliance', href: '/compliance' },
        { label: 'Regulations', href: '/compliance/regulations' },
        { label: 'Regs: Amendments', href: '/compliance/amendments' },
      ],
    },
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
