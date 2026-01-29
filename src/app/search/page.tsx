"use client"

import { useMemo, useState } from "react"
import { EmptyState, PackageCard, SearchHeader, FilterSidebar } from "@/app/search/components/"

// Sample data - in production this would come from an API
const packages = [
  {
    id: "1",
    title: "FIFA World Cup 2026 - Final Match Experience",
    category: "Sports",
    city: "New York", 
    country: "USA",
    start_date: "2026-07-19",
    image_url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    price: 4999,
  },
  {
    id: "2",
    title: "Coachella Music Festival VIP Package",
    category: "Music",
    city: "Palm Springs",
    country: "USA",
    start_date: "2026-04-10",
    image_url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
    price: 2499,
  },
  {
    id: "3",
    title: "Monaco Grand Prix Luxury Experience",
    category: "Racing",
    city: "Monaco",
    country: "Monaco",
    start_date: "2026-05-24",
    image_url: "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=800&q=80",
    price: 8999,
  },
  {
    id: "4",
    title: "Wimbledon Championships - Centre Court",
    category: "Sports",
    city: "London",
    country: "UK",
    start_date: "2026-07-06",
    image_url: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
    price: 3499,
  },
  {
    id: "5",
    title: "Tomorrowland Electronic Music Festival",
    category: "Music",
    city: "Boom",
    country: "Belgium",
    start_date: "2026-07-17",
    image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    price: 1999,
  },
  {
    id: "6",
    title: "Le Mans 24 Hours Race Package",
    category: "Racing",
    city: "Le Mans",
    country: "France",
    start_date: "2026-06-13",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    price: 3999,
  },
  {
    id: "7",
    title: "Super Bowl LX Premium Experience",
    category: "Sports",
    city: "Los Angeles",
    country: "USA",
    start_date: "2026-02-08",
    image_url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
    price: 6999,
  },
  {
    id: "8",
    title: "Glastonbury Festival All Access",
    category: "Music",
    city: "Somerset",
    country: "UK",
    start_date: "2026-06-24",
    image_url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    price: 1799,
  },
  {
    id: "9",
    title: "Italian Grand Prix - Monza Circuit",
    category: "Racing",
    city: "Monza",
    country: "Italy",
    start_date: "2026-09-06",
    image_url: "https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?w=800&q=80",
    price: 2999,
  },
  {
    id: "10",
    title: "Tokyo Summer Festival Experience",
    category: "Festival",
    city: "Tokyo",
    country: "Japan",
    start_date: "2026-08-15",
    image_url: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80",
    price: 4299,
  },
  {
    id: "11",
    title: "Champions League Final - Madrid",
    category: "Sports",
    city: "Madrid",
    country: "Spain",
    start_date: "2026-05-30",
    image_url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    price: 5499,
  },
  {
    id: "12",
    title: "Austin City Limits Music Festival",
    category: "Music",
    city: "Austin",
    country: "USA",
    start_date: "2026-10-02",
    image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    price: 1599,
  },
]

// Helper to format date for display (travel dates are 1-2 days before event)
function getTravelDates(startDate: string): string[] {
  const eventDate = new Date(startDate)
  const dates: string[] = []

  // 2 days before
  const twoDaysBefore = new Date(eventDate)
  twoDaysBefore.setDate(eventDate.getDate() - 2)
  dates.push(
    twoDaysBefore.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  )

  // 1 day before
  const oneDayBefore = new Date(eventDate)
  oneDayBefore.setDate(eventDate.getDate() - 1)
  dates.push(
    oneDayBefore.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  )

  return dates
}

export default function SearchResultsPage() {
  // Search header state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Filter sidebar state
  const [destinationFilter, setDestinationFilter] = useState<string | null>(null)
  const [sortByDateAsc, setSortByDateAsc] = useState(true)

  // Get all unique categories
  const allCategories = useMemo(() => {
    return [...new Set(packages.map((p) => p.category))]
  }, [])

  // Get destinations based on selected category
  const availableDestinations = useMemo(() => {
    const filtered = selectedCategory
      ? packages.filter((p) => p.category === selectedCategory)
      : packages

    return [...new Set(filtered.map((p) => `${p.city}, ${p.country}`))]
  }, [selectedCategory])

  // Get travel dates based on selected destination
  const availableDates = useMemo(() => {
    if (!selectedDestination) return []

    const filtered = packages.filter(
      (p) => `${p.city}, ${p.country}` === selectedDestination
    )

    const allDates = filtered.flatMap((p) => getTravelDates(p.start_date))
    return [...new Set(allDates)].sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
  }, [selectedDestination])

  // Handle category change - reset downstream selections
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    setSelectedDestination(null)
    setSelectedDate(null)
  }

  // Handle destination change - reset date selection
  const handleDestinationChange = (destination: string | null) => {
    setSelectedDestination(destination)
    setSelectedDate(null)
  }

  // Filter and sort packages
  const filteredPackages = useMemo(() => {
    let result = [...packages]

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Filter by destination (from header)
    if (selectedDestination) {
      result = result.filter(
        (p) => `${p.city}, ${p.country}` === selectedDestination
      )
    }

    // Filter by date (travel date matches 1-2 days before event)
    if (selectedDate) {
      result = result.filter((p) => {
        const travelDates = getTravelDates(p.start_date)
        return travelDates.includes(selectedDate)
      })
    }

    // Apply sidebar destination filter
    if (destinationFilter) {
      result = result.filter(
        (p) => `${p.city}, ${p.country}` === destinationFilter
      )
    }

    // Sort by date
    result.sort((a, b) => {
      const dateA = new Date(a.start_date).getTime()
      const dateB = new Date(b.start_date).getTime()
      return sortByDateAsc ? dateA - dateB : dateB - dateA
    })

    return result
  }, [selectedCategory, selectedDestination, selectedDate, destinationFilter, sortByDateAsc])

  // Get unique destinations for sidebar filter
  const sidebarDestinations = useMemo(() => {
    const basePackages = selectedCategory
      ? packages.filter((p) => p.category === selectedCategory)
      : packages

    return [...new Set(basePackages.map((p) => `${p.city}, ${p.country}`))]
  }, [selectedCategory])

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory(null)
    setSelectedDestination(null)
    setSelectedDate(null)
    setDestinationFilter(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader
        categories={allCategories}
        destinations={availableDestinations}
        dates={availableDates}
        selectedCategory={selectedCategory}
        selectedDestination={selectedDestination}
        selectedDate={selectedDate}
        onCategoryChange={handleCategoryChange}
        onDestinationChange={handleDestinationChange}
        onDateChange={setSelectedDate}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <FilterSidebar
            destinations={sidebarDestinations}
            selectedDestinationFilter={destinationFilter}
            onDestinationFilterChange={setDestinationFilter}
            sortByDateAsc={sortByDateAsc}
            onSortToggle={() => setSortByDateAsc(!sortByDateAsc)}
            totalResults={filteredPackages.length}
          />

          {/* Package Listings */}
          <div className="flex-1">
            {filteredPackages.length > 0 ? (
              <div className="space-y-4">
                {filteredPackages.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            ) : (
              <EmptyState onReset={handleResetFilters} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
