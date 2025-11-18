import HSEActionsCard from '@/components/hse-actions-card'
import HSEMORCard from '@/components/hse-mor-card'
import HSECasesCard from '@/components/hse-cases-card'
import HSEReportsCard from '@/components/hse-reports-card'

export default function HSECards() {
  return (
    <div className="px-6 pb-6">
      <div className="grid grid-cols-2 gap-6">
        <HSEActionsCard />
        <HSEMORCard />
        <HSECasesCard />
        <HSEReportsCard />
      </div>
    </div>
  )
}
