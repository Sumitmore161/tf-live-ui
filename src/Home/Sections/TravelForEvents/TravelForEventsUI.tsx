"use client";
// Home/Sections/TravelForEvents/index.tsx
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UpcomingTravelCard } from "@/Home/components/";
import { TravelPackage } from "@/types/travelPackageType";
import { Button } from "@/components/ui/button";

interface TravelForEventsProps {
  events: TravelPackage[];
}

export default function TravelForEvents({ events }: TravelForEventsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'SPORTS', 'THEATRE', 'CONCERT', 'RACING'];

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // 1. Filter: Based on selected category
  // 2. Map: Convert Supabase fields to UI-friendly fields
  const displayPackages = events
    .filter((event) => {
      const allowedCategories = ['RACING', 'SPORTS', 'CONCERT', 'THEATRE'];
      if (selectedCategory === 'ALL') {
        return allowedCategories.includes(event.category);
      }
      return event.category === selectedCategory;
    })
    .map((event) => {
      // Calculate date range string (e.g., "Apr 10 – Apr 12")
      const start = new Date(event.start_date);
      const end = new Date(event.end_date);
      const dateRange = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

      return {
        ...event,
        // Map DB fields to UI Component names
        image: event.image_url || "/placeholder.svg", // Fallback for null images
        eventType: event.category.toLowerCase(), // "RACING" -> "racing"
        location: {
          city: event.city,
          country: event.country,
        },
        dateRange: dateRange,
        startingPrice: event.current_price || 0,
        duration: event.duration || "4D / 3N", // Default fallback
        status: event.status || "coming-soon", // Logic could be added to set based on dates
        // ctaTitle: event.current_price && event.current_price > 0 ? "Book Now" : "Notify Me",
        ctaTitle: "Book Now",
      };
    });

  if (displayPackages.length === 0) return null;

  return (
    <section className="min-h-[60vh] bg-background px-4 mx-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Travel For Events
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Exclusive travel packages for the world's most anticipated events.
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

        {/* Category Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className="rounded-full px-4 py-2 text-sm font-medium transition-all"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Horizontal Scroll Grid */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto py-8 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x snap-mandatory"
        >
          {displayPackages.map((pkg) => (
            <div key={pkg.id} className="snap-start">
              {/* Ensure the card gets the transformed pkg object */}
              <UpcomingTravelCard package={pkg as any} />
            </div>
          ))}
        </div>

        {/* Mobile Scroll Hint */}
        <p className="mt-4 text-center text-sm text-muted-foreground sm:hidden">
          Swipe to see more packages
        </p>
      </div>
    </section>
  );
}