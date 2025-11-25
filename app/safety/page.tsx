'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import SafetyDashboard from '@/components/safety-dashboard'

export default function SafetyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="Safety" />
        <main className="flex-1 overflow-auto">
          <SafetyDashboard />
        </main>
      </div>
    </div>
  )
}
