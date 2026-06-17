import { AboutHero, IntroSection, SkillCards, Timeline, VisionSection } from './About'

export default function About() {
  return (
    <div className="min-h-screen pb-28 pt-20 md:pb-36 md:pt-24">
      <AboutHero />

      <div className="mx-auto mt-28 max-w-5xl space-y-32 px-5 md:mt-40 md:space-y-40 lg:space-y-48 md:px-8">
        <IntroSection />
        <SkillCards />
        <Timeline />
        <VisionSection />
      </div>
    </div>
  )
}
