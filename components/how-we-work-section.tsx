"use client"

import { useState } from "react"
import { ArrowRight, Plus, Minus } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Understand Africa's Needs",
    description:
      "We begin with deep consultation to understand your business goals and how they align with Africa's digital transformation, ensuring strategies that contribute to Rwanda's tech ecosystem vision.",
  },
  {
    id: 2,
    title: "Design Ecosystem Solutions",
    description:
      "Our team crafts innovative solutions that address African business challenges while contributing to the broader tech ecosystem, leveraging next-generation technologies for continental impact.",
  },
  {
    id: 3,
    title: "Build & Scale Together",
    description:
      "We implement solutions with precision and provide ongoing support to ensure your success contributes to Rwanda's emergence as Africa's premier tech hub, scaling impact across the continent."
  },
]

export function HowWeWorkSection() {
  const [openStep, setOpenStep] = useState(1)

  return (
    <section className="relative overflow-hidden bg-primary/90 dark:bg-primary/20 py-24">
      {/* Decorative grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 h-full w-1/2">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container relative mx-auto px-4">
        <div className="rounded-[28px] bg-transparent px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-block">
              <span className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white">How We Work</span>
            </div>

            <h2 className="mb-6 text-5xl font-bold leading-tight text-white">
              How We Build Africa's Tech Ecosystem
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-white/80">
              NexaTech Rwanda creates comprehensive technology solutions that empower African businesses and drive continental progress. Innovation and ecosystem thinking are the hallmarks of our approach to building Rwanda's tech future.
            </p>

            <div>
              <button className="group flex items-center gap-2 rounded-lg bg-card px-6 py-3 font-semibold text-foreground transition-all hover:gap-3 hover:shadow-lg">
                Join The Ecosystem
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right side - Accordion Steps */}
          <div className="relative flex flex-col justify-center">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-foreground/20" />

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  {/* Timeline node */}
                  <div className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-card text-lg font-bold text-primary">
                    {step.id}
                  </div>

                  {/* Accordion item */}
                  <div className="ml-16">
                    <button
                      onClick={() => setOpenStep(openStep === step.id ? 0 : step.id)}
                      className="flex w-full items-center justify-between rounded-2xl bg-card/95 px-6 py-6 text-left transition-all hover:bg-card hover:shadow-lg"
                    >
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                      {openStep === step.id ? (
                        <Minus className="h-6 w-6 flex-shrink-0 text-foreground" />
                      ) : (
                        <Plus className="h-6 w-6 flex-shrink-0 text-foreground" />
                      )}
                    </button>

                    {/* Expanded content */}
                    {openStep === step.id && (
                      <div className="mt-2 rounded-2xl bg-muted px-6 py-5">
                        <p className="leading-relaxed text-foreground/80">{step.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
