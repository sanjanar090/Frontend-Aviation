import SafetyActionsCard from '@/components/safety-actions-card'
import SaftyMORCard from '@/components/safety-mor-card'
import SafetyCasesCard from '@/components/safety-cases-card'
import SafetyReportsCard from '@/components/safety-reports-card'

export default function SafetyCards() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <SafetyActionsCard />
      <SaftyMORCard />
      <SafetyCasesCard />
      <SafetyReportsCard />
    </div>
  )
}
