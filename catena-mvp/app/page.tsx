import Navigation from '@/components/Navigation'
import HeroWithParallax from '@/components/HeroWithParallax'
import StatsSection from '@/components/StatsSection'
import WhyChooseCatena from '@/components/WhyChooseCatena'
import HowItWorks from '@/components/HowItWorks'
import PricingSection from '@/components/PricingSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-catena-navy min-h-screen">
      <Navigation />
      <HeroWithParallax />
      <StatsSection />
      <WhyChooseCatena />
      <HowItWorks />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}
