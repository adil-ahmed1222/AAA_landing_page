"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Code2,
  GraduationCap,
  Layers,
  MessageCircle,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import {
  AGENT_CAPABILITIES,
  CAPABILITIES,
  CAREER_OUTCOMES,
  CURRICULUM,
  FAQS,
  GRADUATION_BUILDS,
  MARQUEE_ROW_1,
  MARQUEE_ROW_2,
  PROGRAM_DIFFERENTIATORS,
  PROGRAM_INCLUDES,
  PROJECTS,
  TOOL_BADGES,
  WHO_SHOULD_JOIN,
} from "@/lib/landing-data"
import { CountUp } from "@/components/landing/count-up"
import { Marquee } from "@/components/landing/marquee"
import {
  FadeUp,
  GlassCard,
  GlowButton,
  Section,
  SectionLabel,
  SectionSubtitle,
  SectionTitle,
  StaggerGrid,
  StaggerItem,
} from "@/components/landing/motion"

const WHY_CARDS = [
  {
    icon: Bot,
    title: "AI Agents are replacing repetitive workflows.",
  },
  {
    icon: TrendingUp,
    title: "Organizations need automation talent immediately.",
  },
  {
    icon: Sparkles,
    title: "AI builders are becoming strategic assets.",
  },
]

const WHY_CHOOSE = [
  {
    icon: Code2,
    title: "Learn by Building",
    desc: "Build real AI systems through guided projects and hands-on implementation.",
  },
  {
    icon: Layers,
    title: "No-Code & Low-Code",
    desc: "Create powerful automations and intelligent agents without heavy engineering.",
  },
  {
    icon: Briefcase,
    title: "Career Ready From Day One",
    desc: "Build skills, portfolio, and confidence to get hired, freelance, or launch your own AI services.",
  },
  {
    icon: Rocket,
    title: "Production-Ready Projects",
    desc: "Every project is designed to solve real business problems.",
  },
]

export function WhyProgramSection() {
  return (
    <Section id="why" className="border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>Why This Program Exists</SectionLabel>
          <SectionTitle>
            THE WORLD RUNS ON AI AGENTS NOW.
            <span className="mt-2 block text-zinc-500">
              MOST PEOPLE ARE STILL WATCHING FROM THE SIDELINES.
            </span>
          </SectionTitle>
          <SectionSubtitle>
            AI Agents are transforming how work gets done. They can:
          </SectionSubtitle>
        </FadeUp>

        <StaggerGrid className="mt-8 flex flex-wrap gap-3">
          {AGENT_CAPABILITIES.map((cap) => (
            <StaggerItem key={cap}>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-2 text-sm text-orange-200">
                <Zap className="size-3.5 text-orange-400" />
                {cap}
              </span>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <FadeUp className="mt-8">
          <p className="max-w-3xl text-zinc-400">
            Organizations are rapidly adopting AI and automation and urgently
            need professionals who can build intelligent systems. This program
            exists to help you become one of those builders.
          </p>
        </FadeUp>

        <StaggerGrid className="mt-12 grid gap-6 md:grid-cols-3">
          {WHY_CARDS.map(({ icon: Icon, title }) => (
            <StaggerItem key={title}>
              <GlassCard className="h-full">
                <Icon className="mb-4 size-8 text-orange-400" />
                <p className="text-lg font-medium text-zinc-200">{title}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  )
}

export function WhyChooseSection() {
  return (
    <Section className="bg-white/[0.02]">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>Why NeuralVarsity</SectionLabel>
          <SectionTitle>WHY CHOOSE NEURALVARSITY</SectionTitle>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map(({ icon: Icon, title, desc }) => (
            <StaggerItem key={title}>
              <GlassCard className="h-full">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-orange-500/10">
                  <Icon className="size-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {desc}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  )
}

export function WhoShouldJoinSection() {
  return (
    <Section>
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>Audience</SectionLabel>
          <SectionTitle>WHO SHOULD JOIN</SectionTitle>
          <SectionSubtitle>
            Whether you&apos;re starting out or scaling up — if you want to build
            with AI, this program is for you.
          </SectionSubtitle>
        </FadeUp>
        <StaggerGrid className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {WHO_SHOULD_JOIN.map((persona) => (
            <StaggerItem key={persona}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card gradient-border flex h-full items-center justify-center rounded-xl p-4 text-center"
              >
                <div>
                  <Users className="mx-auto mb-2 size-5 text-orange-400" />
                  <span className="text-sm font-medium text-zinc-300">
                    {persona}
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  )
}

export function ToolsSection() {
  return (
    <Section id="tools" className="overflow-hidden border-y border-white/5 bg-white/[0.02] py-20">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="px-4 md:px-8">
          <SectionLabel>Tech Stack</SectionLabel>
          <SectionTitle>Master the Complete Agentic AI Tech Stack</SectionTitle>
          <SectionSubtitle>
            Learn the same tools used by AI startups, automation agencies, and
            modern businesses to build production-ready AI systems.
          </SectionSubtitle>
        </FadeUp>

        <div className="mt-12 space-y-6">
          <Marquee items={MARQUEE_ROW_1} direction="right" speed={45} />
          <Marquee items={MARQUEE_ROW_2} direction="left" speed={50} />
        </div>

        <StaggerGrid className="mt-12 flex flex-wrap justify-center gap-3 px-4">
          {TOOL_BADGES.map((badge) => (
            <StaggerItem key={badge}>
              <span className="rounded-full border border-white/10 bg-gradient-to-r from-orange-500/10 to-amber-500/5 px-4 py-2 text-xs font-medium text-zinc-300 md:text-sm">
                {badge}
              </span>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  )
}

export function CurriculumSection() {
  return (
    <Section id="curriculum">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>Curriculum</SectionLabel>
          <SectionTitle>4-WEEK AGENTIC AI MASTER PROGRAM</SectionTitle>
          <SectionSubtitle>
            A structured, hands-on journey from AI foundations to deploying
            your own AI Employee.
          </SectionSubtitle>
        </FadeUp>

        <div className="relative mt-16">
          <div className="absolute top-0 left-4 h-full w-px bg-gradient-to-b from-orange-500/50 via-orange-500/20 to-transparent md:left-1/2 md:-translate-x-px" />

          {CURRICULUM.map((week, index) => (
            <FadeUp key={week.week} delay={index * 0.1}>
              <div
                className={`relative mb-12 flex flex-col gap-8 md:flex-row md:items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden flex-1 md:block" />
                <div className="absolute left-4 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-orange-500/50 bg-black md:left-1/2">
                  <span className="text-xs font-bold text-orange-400">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 pl-12 md:pl-0">
                  <GlassCard>
                    <div className="mb-2 text-sm font-semibold tracking-wider text-orange-400 uppercase">
                      {week.week}
                    </div>
                    <h3 className="text-xl font-bold text-white md:text-2xl">
                      {week.title}
                    </h3>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {week.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-start gap-2 text-sm text-zinc-400"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-orange-500/70" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                      <span className="text-xs font-semibold tracking-wider text-orange-400 uppercase">
                        Week Outcome
                      </span>
                      <p className="mt-1 text-sm text-zinc-300">{week.outcome}</p>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function GraduationSection() {
  return (
    <Section className="bg-white/[0.02]">
      <div className="mx-auto max-w-7xl text-center">
        <FadeUp>
          <SectionLabel>By Graduation</SectionLabel>
          <SectionTitle>
            NOT JUST A CERTIFICATE.
            <span className="mt-2 block bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
              A CAREER PORTFOLIO.
            </span>
          </SectionTitle>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GRADUATION_BUILDS.map((item) => (
            <StaggerItem key={item}>
              <GlassCard className="flex items-center gap-3 text-left">
                <GraduationCap className="size-5 shrink-0 text-orange-400" />
                <span className="font-medium text-zinc-200">{item}</span>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  )
}

export function CapabilitiesSection() {
  return (
    <Section>
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>Skills</SectionLabel>
          <SectionTitle>CORE PROFESSIONAL CAPABILITIES</SectionTitle>
        </FadeUp>
        <StaggerGrid className="mt-12 flex flex-wrap gap-3">
          {CAPABILITIES.map((cap) => (
            <StaggerItem key={cap}>
              <span className="glass-card inline-block rounded-full px-5 py-2.5 text-sm font-medium text-zinc-300">
                {cap}
              </span>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  )
}

export function ProjectsSection() {
  return (
    <Section id="projects" className="border-t border-white/5 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>Portfolio</SectionLabel>
          <SectionTitle>
            BUILD REAL PRODUCTS.
            <span className="text-zinc-500"> NOT TOY PROJECTS.</span>
          </SectionTitle>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <StaggerItem key={project}>
              <GlassCard className="group h-full">
                <div className="mb-3 text-xs font-bold text-orange-500/70">
                  PROJECT {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-orange-200">
                  {project}
                </h3>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  )
}

export function CareerSection() {
  return (
    <Section id="careers">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>Career Paths</SectionLabel>
          <SectionTitle>WHERE THIS PROGRAM CAN TAKE YOU</SectionTitle>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CAREER_OUTCOMES.map((career) => (
            <StaggerItem key={career}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card gradient-border flex h-full flex-col items-center justify-center rounded-xl p-6 text-center"
              >
                <Target className="mb-3 size-6 text-orange-400" />
                <span className="text-sm font-semibold text-zinc-200">
                  {career}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  )
}

export function MarketSection() {
  return (
    <Section className="bg-gradient-to-b from-orange-500/5 to-transparent">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>Market Opportunity</SectionLabel>
          <SectionTitle>THE AI AUTOMATION ECONOMY IS BOOMING</SectionTitle>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <GlassCard className="text-center">
              <div className="text-5xl font-bold text-orange-400">
                <CountUp end={40} suffix="+" />%
              </div>
              <p className="mt-3 text-zinc-400">
                Growth in AI and Automation Roles
              </p>
            </GlassCard>
          </StaggerItem>
          <StaggerItem>
            <GlassCard className="text-center">
              <div className="text-3xl font-bold text-amber-300 md:text-4xl">
                ₹15K–₹75K
              </div>
              <p className="mt-3 text-zinc-400">
                Typical Freelance Automation Project Value
              </p>
            </GlassCard>
          </StaggerItem>
          <StaggerItem>
            <GlassCard className="text-center">
              <div className="text-5xl font-bold text-orange-400">1</div>
              <p className="mt-3 text-lg font-medium text-zinc-200">
                Project
              </p>
              <p className="mt-1 text-zinc-400">
                Can recover your entire program investment.
              </p>
            </GlassCard>
          </StaggerItem>
        </StaggerGrid>
      </div>
    </Section>
  )
}

export function DifferentiatorsSection() {
  return (
    <Section>
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>Why Us</SectionLabel>
          <SectionTitle>WHAT MAKES THIS PROGRAM DIFFERENT</SectionTitle>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PROGRAM_DIFFERENTIATORS.map((item) => (
            <StaggerItem key={item}>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <CheckCircle2 className="size-4 shrink-0 text-orange-400" />
                <span className="text-sm text-zinc-300">{item}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  )
}

export function IncludesSection() {
  return (
    <Section className="bg-white/[0.02]">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <SectionLabel>Program Includes</SectionLabel>
          <SectionTitle>EVERYTHING YOU NEED TO SUCCEED</SectionTitle>
        </FadeUp>
        <StaggerGrid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAM_INCLUDES.map((item) => (
            <StaggerItem key={item}>
              <GlassCard className="flex items-start gap-3">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-amber-400" />
                <span className="text-sm text-zinc-300">{item}</span>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  )
}

export function PricingSection() {
  return (
    <Section id="pricing">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="text-center">
          <SectionLabel>Pricing</SectionLabel>
          <SectionTitle>
            ONE MONTH.
            <br />
            ONE DECISION.
            <br />
            <span className="bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
              ONE CAREER SHIFT.
            </span>
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            The next twelve months will pass either way. The only question is
            whether you spend them consuming AI or building with it.
          </SectionSubtitle>
        </FadeUp>

        <FadeUp className="mx-auto mt-12 max-w-md">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pricing-card gradient-border relative overflow-hidden rounded-[32px] border border-orange-500/20 p-8 text-center shadow-[0_0_60px_-12px_rgba(255,140,0,0.35)] backdrop-blur-[20px] md:p-10"
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-orange-300 uppercase">
              Launch Price
            </p>

            <p className="mt-4 text-5xl font-bold tracking-tight text-white md:text-6xl">
              ₹14,999
            </p>

            <div className="mt-5 space-y-1 text-sm text-zinc-400">
              <p>Inclusive of GST</p>
              <p>No Hidden Fees</p>
              <p>2 Easy Installments Available</p>
            </div>

            <p className="mt-5 text-base font-medium text-orange-200/90">
              ₹7,500 × 2
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <GlowButton variant="primary" href="#consultation" className="w-full">
                Enroll in Cohort 1
              </GlowButton>
              <GlowButton variant="secondary" href="#consultation" className="w-full">
                Book Free Consultation
              </GlowButton>
            </div>
          </motion.div>
        </FadeUp>
      </div>
    </Section>
  )
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq" className="border-t border-white/5 bg-white/[0.02]">
      <div className="mx-auto max-w-3xl">
        <FadeUp className="text-center">
          <SectionLabel>FAQ</SectionLabel>
          <SectionTitle>FREQUENTLY ASKED QUESTIONS</SectionTitle>
        </FadeUp>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <FadeUp key={faq.q} delay={i * 0.05}>
              <div className="glass-card overflow-hidden rounded-xl !p-0">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="pr-4 font-medium text-zinc-200">{faq.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-orange-400 transition-transform ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/5 px-6 py-4 text-sm leading-relaxed text-zinc-400">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function FinalCTASection() {
  return (
    <Section id="consultation" className="relative overflow-hidden">
      <div className="aurora-bg absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-4xl text-center">
        <FadeUp>
          <SectionTitle>
            BUILD PORTFOLIO PROJECTS.
            <br />
            BUILD AI SYSTEMS.
            <br />
            <span className="bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
              BUILD YOUR FUTURE.
            </span>
          </SectionTitle>
          <SectionSubtitle className="mx-auto">
            Become job-ready in Agentic AI, Automation, and AI Engineering by
            building real systems that companies and clients actually need.
          </SectionSubtitle>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <GlowButton variant="primary" href="#pricing">
              Enroll in Cohort 1
            </GlowButton>
            <GlowButton variant="secondary" href="#consultation">
              Book Free AI Career Consultation
            </GlowButton>
            <GlowButton
              variant="ghost"
              href="https://wa.me/919999999999"
              className="gap-2"
            >
              <MessageCircle className="size-4" />
              Talk on WhatsApp
            </GlowButton>
          </div>
        </FadeUp>
      </div>
    </Section>
  )
}
