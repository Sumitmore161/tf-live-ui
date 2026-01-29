import { Suspense } from 'react';
import ItineraryPage from './ItineraryPage';

function ItineraryLoadingFallback() {
  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto mb-4"></div>
        <div className="flex justify-center gap-4 mb-10">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              <div className="h-20 bg-gray-100 rounded"></div>
              <div className="h-20 bg-gray-100 rounded"></div>
              <div className="h-20 bg-gray-100 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<ItineraryLoadingFallback />}>
      <ItineraryPage searchParams={searchParams} />
    </Suspense>
  );
}
