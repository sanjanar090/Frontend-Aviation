'use client'

import { Plus, Download } from 'lucide-react'
import { useState } from 'react'

interface Template {
  id: number
  name: string
  description?: string
}

const TEMPLATES: Template[] = [
  {
    id: 1,
    name: 'Line Maintenance Station - BOD',
    description: '',
  },
]

export default function TemplatesTable() {
  const [sortBy, setSortBy] = useState<'number' | 'name'>('number')

  const handleAddTemplate = () => {
    console.log('Add template clicked')
  }

  const handleUseTemplate = (id: number) => {
    console.log('Use template:', id)
  }

  const handleDownload = () => {
    console.log('Download templates')
  }

  return (
    <div className="flex flex-col h-full text-sm">
      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex-1">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => setSortBy('number')}
                  className="flex items-center gap-1 font-semibold text-gray-700 hover:text-gray-900"
                >
                  Number
                  <span className="text-gray-400">•</span>
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => setSortBy('name')}
                  className="flex items-center gap-1 font-semibold text-gray-700 hover:text-gray-900"
                >
                  Name
                  <span className="text-gray-400">•</span>
                </button>
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Description
              </th>
              <th className="px-6 py-4 text-right font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {TEMPLATES.map((template) => (
              <tr key={template.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-900">{template.id}</td>
                <td className="px-6 py-4 text-gray-900">{template.name}</td>
                <td className="px-6 py-4 text-gray-600">{template.description || '-'}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Use
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-6">
        <button
          onClick={handleAddTemplate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Template
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
        >
          <Download className="w-5 h-5" />
          Download
        </button>
      </div>
    </div>
  )
}
