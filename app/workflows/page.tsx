'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import WorkflowsDashboard from '@/components/workflows-dashboard'

export default function WorkflowsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="Workflows" />
        <main className="flex-1 overflow-auto">
          <WorkflowsDashboard />
        </main>
      </div>
    </div>
  )
}
