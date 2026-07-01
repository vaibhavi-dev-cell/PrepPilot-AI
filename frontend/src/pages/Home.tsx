import AppShell from '../components/layout/AppShell'
import FeaturesSection from '../components/sections/FeaturesSection'
import HeroSection from '../components/sections/HeroSection'

export default function Home() {
  return (
    <AppShell
      title="AI-powered interview prep for final year students"
      subtitle="Practice coding, system design, and behavioral interviews with guided AI support and a polished resume-ready experience."
      ctaText="Start practicing"
      ctaHref="#features"
    >
      <HeroSection />
      <FeaturesSection />
    </AppShell>
  )
}
