'use client'

import { useState } from 'react'
import SafetyHeader from '@/components/safety-header'
import SafetyTabs from '@/components/safety-tabs'
import SafetyCards from '@/components/safety-cards'
import SafetyTasksContent from '@/components/safety-tasks-content'
import CasesContent from '@/components/cases-content'
import KpisContent from '@/components/kpis-content'
import HeatmapContent from '@/components/heatmap-content'

export default function SafetyDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="p-6 space-y-6">
      <SafetyHeader />
      <SafetyTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-dark)' }}>My Safety tasks</h2>
          <SafetyTasksContent />
          <SafetyCards />
        </div>
      )}
      {activeTab === 'cases' && <CasesContent />}
      {activeTab === 'drafts' && <div className="text-center py-12" style={{ color: 'var(--text-light)' }}>No drafts available</div>}
      {activeTab === 'actions' && <div className="text-center py-12" style={{ color: 'var(--text-light)' }}>No actions available</div>}
      {activeTab === 'heatmap' && <HeatmapContent />}
      {activeTab === 'kpis' && <KpisContent />}
      {activeTab === 'newsletters' && <div className="text-center py-12" style={{ color: 'var(--text-light)' }}>No newsletters available</div>}
    </div>
  )
}
