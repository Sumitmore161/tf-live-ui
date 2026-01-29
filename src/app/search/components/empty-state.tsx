"use client"

import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onReset: () => void
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">No packages found</h3>
      <p className="mb-6 max-w-sm text-muted-foreground">
        We couldn&apos;t find any travel packages matching your criteria. Try adjusting your filters
        or search for something else.
      </p>
      <Button onClick={onReset} variant="outline" className="rounded-xl px-6 bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )
}
