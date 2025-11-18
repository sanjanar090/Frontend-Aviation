import { Shield } from 'lucide-react'

export default function SafetyHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--primary-blue)' }}>
        <Shield className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-2xl font-bold" style={{ color: 'var(--text-dark)' }}>
        Safety - Safety
      </h1>
    </div>
  )
}
