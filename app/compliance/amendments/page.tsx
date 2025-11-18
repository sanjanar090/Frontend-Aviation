'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

export default function AmendmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filters, setFilters] = useState({
    amendmentName: '',
    regulationGroup: 'All',
    regulation: '',
    publishedStatus: 'Unpublished ...',
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage="Custom Amendments" />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-600">
              <a href="/compliance/regulations" className="hover:text-blue-600">Regulations</a>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">Custom Amendments</span>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amendment Name</label>
                  <input
                    type="text"
                    placeholder=""
                    value={filters.amendmentName}
                    onChange={(e) => handleFilterChange('amendmentName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Regulation Group</label>
                  <select
                    value={filters.regulationGroup}
                    onChange={(e) => handleFilterChange('regulationGroup', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Regulation</label>
                  <input
                    type="text"
                    placeholder=""
                    value={filters.regulation}
                    onChange={(e) => handleFilterChange('regulation', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Published Status</label>
                  <select
                    value={filters.publishedStatus}
                    onChange={(e) => handleFilterChange('publishedStatus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Unpublished ...</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" style={{ backgroundColor: 'var(--primary-blue)' }}>
                Search
              </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      <button className="flex items-center gap-1 hover:text-gray-900">
                        Title
                        <span className="text-xs">↓</span>
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Regulations(s)</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      <button className="flex items-center gap-1 hover:text-gray-900">
                        Published On
                        <span className="text-xs">↓</span>
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      <button className="flex items-center gap-1 hover:text-gray-900">
                        Centrik Published
                        <span className="text-xs">↓</span>
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      <button className="flex items-center gap-1 hover:text-gray-900">
                        Status
                        <span className="text-xs">↓</span>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="py-12 px-4 text-center text-gray-500">
                      No Regulation Amendments to show.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Button */}
            <div className="mt-6">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium" style={{ backgroundColor: 'var(--primary-blue)' }}>
                <span>+</span>
                New Amendment
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
