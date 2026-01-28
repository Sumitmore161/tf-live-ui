"use client"

import { Ticket, Package, PartyPopper, ChevronRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Choose Your Event",
    description: "Concerts, sports tournaments, or race weekends you love",
    icon: Ticket,
  },
  {
    number: "02",
    title: "We Bundle Everything",
    description: "Tickets, travel, and stay — perfectly planned for the event",
    icon: Package,
  },
  {
    number: "03",
    title: "You Just Show Up",
    description: "Enjoy the event while we handle the rest",
    icon: PartyPopper,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-[#F9FAFB]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[26px] md:text-[36px] font-bold text-foreground tracking-tight text-balance">
            How It Works
          </h2>
          <p className="mt-3 text-base md:text-lg text-muted-foreground">
            Book your event trip in just three simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-stretch">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              {/* Step Card */}
              <div className="relative flex-1 bg-card rounded-2xl p-7 shadow-[0_10px_25px_rgba(0,0,0,0.06)] border border-black/[0.04] transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.08)] group">
                {/* Background Number */}
                <span className="absolute top-4 right-4 text-6xl font-bold text-muted-foreground/10 select-none pointer-events-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 mb-5">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/5">
                    <step.icon
                      className="w-8 h-8 text-primary"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Step Number Pill */}
                <div className="relative z-10 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Step {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="relative z-10 text-lg font-semibold text-card-foreground mb-2">
                  {step.title}
                </h3>
                <p className="relative z-10 text-sm md:text-[15px] leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Arrow Divider (Desktop Only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-12 shrink-0 transition-opacity duration-200 group-hover:opacity-60">
                  <ChevronRight
                    className="w-6 h-6 text-muted-foreground/40"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
