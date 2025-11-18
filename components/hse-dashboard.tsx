'use client'

import { useState } from 'react'
import HSETabs from '@/components/hse-tabs'
import HSECards from '@/components/hse-cards'

export default function HSEDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="p-6 space-y-6">
      <HSETabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'dashboard' && <HSECards />}
    </div>
  )
}
