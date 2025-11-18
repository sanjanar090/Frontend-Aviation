import { MessageSquare, Link2, MapPin, MoreVertical } from 'lucide-react'

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage = 'Dashboard' }: HeaderProps) {
  return (
    <header className="header-bg px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-red-500">
            {currentPage === 'Dashboard' ? '📊 Dashboard' : `🛡️ ${currentPage}`}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <MessageSquare className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <Link2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <MapPin className="w-5 h-5" style={{ color: 'var(--primary-blue)' }} />
          </button>
          
          <div className="flex items-center gap-3 ml-4 pl-4 border-l" style={{ borderColor: 'var(--border-light)' }}>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">Matko Dadic</div>
              <div className="text-xs" style={{ color: 'var(--text-light)' }}>Accountable Manager</div>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: 'var(--primary-blue)' }}>
              MD
            </div>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
