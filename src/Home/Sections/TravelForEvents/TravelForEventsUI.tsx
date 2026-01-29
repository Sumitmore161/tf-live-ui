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

  // Date filtering logic
  const today = new Date();
  const oneMonthFromNow = new Date(today);
  oneMonthFromNow.setDate(today.getDate() + 30);

  // 1. Filter: Based on date range (today to 30 days) and selected category
  // 2. Map: Convert Supabase fields to UI-friendly fields
  const displayPackages = events
    .filter((event) => {
      // Date range filter: start_date must be between today and 30 days from now
      const startDate = new Date(event.start_date);
      const isInDateRange = startDate >= today && startDate <= oneMonthFromNow;
      
      // Category filter
      const allowedCategories = ['RACING', 'SPORTS', 'CONCERT', 'THEATRE'];
      const matchesCategory = selectedCategory === 'ALL' 
        ? allowedCategories.includes(event.category)
        : event.category === selectedCategory;
      
      return isInDateRange && matchesCategory;
    })
    .map((event) => {
      // Calculate date range string (e.g., "Apr 10 – Apr 12")
      const start = new Date(event.start_date);
      const end = new Date(event.end_date);
      const dateRange = `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

      return {
        ...event,
        status: event.status || "coming-soon",
        ctaTitle: event.ctaTitle || "Book Now",
        duration: event.duration || "4D / 3N",
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
  );
}