'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SlidersHorizontal } from 'lucide-react'
import { HeatmapGrid } from './heatmap-grid'

export function HeatmapView() {
  
  return (
    <div className="bg-slate-50 flex flex-col h-full">
      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
       
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Hazard Heatmap</h2>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Show filters
            </Button>
          </div>

          <HeatmapGrid />

          <div className="p-6 text-center text-sm text-slate-600 border-t border-slate-200">
            Select a field in the heatmap to show all related risk assessment results
          </div>
        </div>
      </div>
    </div>
  )
}
