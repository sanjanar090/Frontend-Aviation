'use client'

import { useState } from 'react'
import { ChevronUp } from 'lucide-react'

interface HeatmapData {
  [key: string]: number | null
}

const departments = [
  'all',
  'Administration',
  'Blank',
  'CHR Management',
  'Compliance Monitoring',
  'Contract Signing Group',
  'CS Authorization',
  'Information Technology',
  'Logistics',
  'Maintenance & Engineering',
  'Safety',
  'Support Training',
]

const categories = [
  { label: 'Main Impact', subcategories: ['General'] },
]

// Generate sample heatmap data
const generateHeatmapData = () => {
  const data: Record<string, HeatmapData> = {}
  categories.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      data[sub] = {}
      departments.forEach((dept) => {
        data[sub][dept] = Math.random() > 0.3 ? Math.floor(Math.random() * 50) : null
      })
    })
  })
  return data
}

const heatmapData = generateHeatmapData()

// Function to get color based on risk level
const getRiskColor = (value: number | null): string => {
  if (value === null) return 'bg-slate-50'
  if (value < 10) return 'bg-emerald-100'
  if (value < 20) return 'bg-emerald-200'
  if (value < 30) return 'bg-yellow-100'
  if (value < 40) return 'bg-orange-200'
  return 'bg-red-200'
}

export function HeatmapGrid() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(['Main Impact']))

  const toggleRow = (row: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(row)) {
      newExpanded.delete(row)
    } else {
      newExpanded.add(row)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100 border-b border-slate-200">
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 w-32">
              <div className="flex items-center gap-2">
                <span>Total Score</span>
              </div>
              <div className="text-2xl font-bold text-slate-900">238</div>
              <div className="text-sm text-slate-600">22</div>
            </th>
            {departments.map((dept) => (
              <th
                key={dept}
                className="px-2 py-3 text-center text-xs font-semibold text-slate-700 bg-slate-50 border-l border-slate-200 min-w-max"
              >
                <div className="text-xs">{dept === 'all' ? '(all)' : dept}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const isExpanded = expandedRows.has(category.label)
            return (
              <tr key={category.label} className="border-b border-slate-200 bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-700">
                  <button
                    onClick={() => toggleRow(category.label)}
                    className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
                  >
                    <ChevronUp
                      className={`w-4 h-4 transition-transform ${isExpanded ? '' : 'rotate-180'}`}
                    />
                    {category.label}
                  </button>
                </td>
                {departments.map((dept) => (
                  <td
                    key={`${category.label}-${dept}`}
                    className="px-2 py-3 text-center border-l border-slate-200 bg-slate-50"
                  >
                    -
                  </td>
                ))}
              </tr>
            )
          })}

          {/* Subcategories */}
          {categories.map((category) => {
            const isExpanded = expandedRows.has(category.label)
            return isExpanded
              ? category.subcategories.map((subcat) => (
                  <tr key={subcat} className="border-b border-slate-200">
                    <td className="px-4 py-3 text-sm font-medium text-slate-700 pl-12">
                      {subcat}
                    </td>
                    {departments.map((dept) => {
                      const value = heatmapData[subcat]?.[dept]
                      return (
                        <td
                          key={`${subcat}-${dept}`}
                          className={`px-2 py-3 text-center border-l border-slate-200 cursor-pointer hover:opacity-80 transition-opacity ${getRiskColor(value)}`}
                        >
                          {value !== null && value > 0 && (
                            <div className="font-semibold text-slate-900">{value}</div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))
              : null
          })}

          {/* Summary Row */}
          <tr className="bg-red-50 border-t-2 border-slate-200">
            <td colSpan={13} className="px-4 py-3 text-right pr-8">
              <div className="text-right">
                <div className="text-2xl font-bold text-red-600">238</div>
                <div className="text-sm text-red-600">22</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
