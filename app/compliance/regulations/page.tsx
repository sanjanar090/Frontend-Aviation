'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import RegulationsContent from '@/components/regulations-content'

export default function RegulationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="Regulations" />
        <main className="flex-1 overflow-auto">
          <RegulationsContent />
        </main>
      </div>
    </div>
  )
}
