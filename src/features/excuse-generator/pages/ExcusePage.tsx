import { HeroSection } from '../components/HeroSection'
import { RankingSection } from '../components/RankingSection'
import { ExcuseForm } from '../components/GenerateExcuseForm'
import { ExcuseResult } from '../components/ExcuseResult'

export function ExcusePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <div className="grid md:grid-cols-2 gap-6">
        <ExcuseForm />
        <ExcuseResult />
      </div>

      <RankingSection />
    </div>
  )
}
