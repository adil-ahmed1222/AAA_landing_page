"use client"

import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { LoadingScreen } from "@/components/landing/loading-screen"
import { Footer } from "@/components/landing/footer"
import {
  WhyProgramSection,
  WhyChooseSection,
  WhoShouldJoinSection,
  ToolsSection,
  CurriculumSection,
  GraduationSection,
  CapabilitiesSection,
  ProjectsSection,
  CareerSection,
  MarketSection,
  DifferentiatorsSection,
  IncludesSection,
  PricingSection,
  FAQSection,
  FinalCTASection,
} from "@/components/landing/sections"

export function LandingPage() {
  return (
    <>
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
        <CareerSection />
        <MarketSection />
        <DifferentiatorsSection />
        <IncludesSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
