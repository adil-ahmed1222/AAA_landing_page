"use client"

import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { LoadingScreen } from "@/components/landing/loading-screen"
import { Footer } from "@/components/landing/footer"
import { ModalProvider } from "@/components/modals/ModalProvider"
import {
  WhyProgramSection,
  WhyChooseSection,
  WhoShouldJoinSection,
  ToolsSection,
  CurriculumSection,
  GraduationSection,
  CapabilitiesSection,
  ProjectsSection,
  MarketSection,
  CareerOutcomesSection,
  DifferentiatorsSection,
  IncludesSection,
  PricingSection,
  FAQSection,
  FinalCTASection,
} from "@/components/landing/sections"

export function LandingPage() {
  return (
    <ModalProvider>
      <LoadingScreen />
      <Navbar />
      <main className="relative overflow-x-hidden bg-[#030303]">
        <Hero />
        <WhyProgramSection />
        <WhyChooseSection />
        <WhoShouldJoinSection />
        <ToolsSection />
        <CurriculumSection />
        <GraduationSection />
        <CapabilitiesSection />
        <ProjectsSection />
        <MarketSection />
        <CareerOutcomesSection />
        <DifferentiatorsSection />
        <IncludesSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </ModalProvider>
  )
}
