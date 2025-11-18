'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import ComplianceDashboard from '@/components/compliance-dashboard'

export default function CompliancePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="Compliance" />
        <main className="flex-1 overflow-auto">
          <ComplianceDashboard />
        </main>
      </div>
    </div>
  )
}
