"use client"

/**
 * Parent Integration Example:
 * In app/page.tsx:
 * 
 * import { getEvents } from "@/lib/data-service";
 * import UpcomingTravel from "@/Home/Sections/UpcomingPackages/UpcomingPackagesUI";
 * 
 * export default async function Home() {
 *   const events = await getEvents();
 *   return <UpcomingTravel events={events} />;
 * }
 */

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { UpcomingTravelCard, type TravelPackage } from "@/Home/components/"
import { Button } from "@/components/ui/button"

interface UpcomingTravelProps {
  events: TravelPackage[]
}

export default function UpcomingTravel({ events }: UpcomingTravelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Date filtering logic
  const today = new Date()
  const oneMonthFromNow = new Date(today)
  oneMonthFromNow.setDate(today.getDate() + 30)
  const twoMonthsFromNow = new Date(today)
  twoMonthsFromNow.setDate(today.getDate() + 60)

  // Filter and sort events within 1-2 month window (30-60 days from today)
  const filteredEvents = events
    .filter((event) => {
      const startDate = new Date(event.start_date)
      return startDate >= oneMonthFromNow && startDate <= twoMonthsFromNow
    })
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())

  // Map filtered events to display format
  const displayPackages = filteredEvents.map((event) => {
    const startDateObj = new Date(event.start_date);
const endDateObj = new Date(event.end_date);

const dateRange = `${startDateObj.toLocaleDateString('en-US', { 
  month: 'short', 
  day: 'numeric' 
})} - ${endDateObj.toLocaleDateString('en-US', { 
  month: 'long', 
  day: 'numeric', 
  year: 'numeric' 
})}`;
    // console.log('Mapping event to display package dateRange:', dateRange)
    return {
      id: event.id,
      title: event.title,
      image: event.image_url || "/placeholder.svg",
      location: {
        city: event.city,//for the next 60 days 
        country: event.country,
      },
      eventType: event.category.toLowerCase(),
      dateRange,
      startingPrice: event.current_price,
      duration: event.duration,
      status: "high-demand" as const,
      ctaTitle: "Book Now",
    }
  })

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 320
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section className="min-h-screen bg-background px-4 mx-4 py-12 sm:px-6 lg:px-8" aria-labelledby="upcoming-travel-heading">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="upcoming-travel-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
            >
              Upcoming Event Packages
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Be the first to know when these exclusive event-based travel packages open for booking.
            </p>
          </div>

          {/* Navigation Arrows (Desktop) */}
          <div className="hidden gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="h-10 w-10 rounded-full border-border hover:bg-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="h-10 w-10 rounded-full border-border hover:bg-secondary"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto py-8 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x snap-mandatory"
          role="region"
          aria-label="Upcoming travel packages carousel"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {displayPackages.map((pkg) => (
            <div key={pkg.id} style={{ scrollSnapAlign: "start" }}>
              <UpcomingTravelCard package={pkg} />
            </div>
          ))}
        </div>

        {/* Mobile Scroll Hint */}
        <p className="mt-4 text-center text-sm text-muted-foreground sm:hidden">
          Swipe to see more packages
        </p>
      </div>
    </section>
  )
}
