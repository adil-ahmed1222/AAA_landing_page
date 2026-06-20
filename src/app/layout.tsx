import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { CustomCursor } from "@/components/ui/custom-cursor"
import "./globals.css"
import "lenis/dist/lenis.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "NeuralVarsity | Agents & Automation Master Program",
  description:
    "Become job-ready in Agentic AI. Build AI agents, automation workflows, and production-ready systems in 4 weeks. Enroll in Cohort 1.",
  keywords: [
    "Agentic AI",
    "AI Agents",
    "Automation",
    "NeuralVarsity",
    "AI Engineering",
    "n8n",
    "RAG",
  ],
  openGraph: {
    title: "NeuralVarsity | Agents & Automation Master Program",
    description:
      "Build AI Agents. Automate Businesses. Become an Agentic AI Engineer.",
    url: "https://neuralvarsity.ai",
    siteName: "NeuralVarsity",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark`}
    >
      <body className="min-h-full overflow-x-hidden antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
