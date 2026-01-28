"use client"

import React from "react"

import {
  CalendarDays,
  Package,
  Globe,
  Headset,
  ShieldCheck,
  Heart,
} from "lucide-react"

const features = [
  {
    icon: CalendarDays,
    title: "Event-First Travel",
    description:
      "Trips designed around concert dates, match schedules, and race weekends.",
  },
  {
    icon: Package,
    title: "Curated Packages",
    description:
      "Flights, stays, and transfers handpicked and perfectly timed.",
  },
  {
    icon: Globe,
    title: "Global Events Access",
    description:
      "Travel to high-demand concerts, sports tournaments, and race events worldwide.",
  },
  {
    icon: Headset,
    title: "On-Ground Support",
    description: "Assistance before, during, and after your event journey.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    description: "Clear inclusions with no hidden costs or surprises.",
  },
  {
    icon: Heart,
    title: "Built for Fans",
    description:
      "Created for true fans who travel for moments, not just destinations.",
  },
]

export default function WhyTravelWithUs() {
  return (
    <section className="w-full bg-[#F9FAFB] py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12 lg:mb-14">
          <h2 className="text-balance text-[28px] font-bold leading-tight tracking-tight text-foreground md:text-[36px]">
            Why Travel With Us
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-base text-gray-600 md:text-lg">
            Travel experiences thoughtfully designed around the world's biggest
            events.
          </p>
        </div>

        {/* Desktop & Tablet Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:hidden">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="w-[85%] flex-shrink-0 snap-start"
            >
              <FeatureCard {...feature} isCarousel />
            </div>
          ))}
          {/* Spacer for last card peek */}
          <div className="w-4 flex-shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  isCarousel?: boolean
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  isCarousel = false,
}: FeatureCardProps) {
  return (
    <article
      className={`group rounded-2xl bg-white p-6 shadow-[0_10px_25px_rgba(0,0,0,0.06)] transition-all duration-[250ms] ease-out md:p-7 ${
        !isCarousel
          ? "hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)]"
          : ""
      } ${!isCarousel ? "h-full" : ""}`}
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-800"
        aria-hidden="true"
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-[15px] leading-relaxed text-gray-600">{description}</p>
    </article>
  )
}
