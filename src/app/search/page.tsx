// app/search/page.tsx
import { Suspense } from "react"
import SearchResultsPage from "./search"
import { getEvents } from "@/lib/data-service" // Assuming you fetch events here

export default async function Page() {
  const events = await getEvents()

  return (
    // The Suspense boundary catches the "reading from URL" logic
    <Suspense fallback={<SearchLoader />}>
      <SearchResultsPage events={events} />
    </Suspense>
  )
}

function SearchLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#F17235]"></div>
    </div>
  )
}