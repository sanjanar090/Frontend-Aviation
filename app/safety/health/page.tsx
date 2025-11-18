'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import HSEDashboard from '@/components/hse-dashboard'

export default function HealthSafetyEnvironmentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="Health, Safety and Environment" />
        <main className="flex-1 overflow-auto">
          <HSEDashboard />
        </main>
      </div>
    </div>
  )
}
