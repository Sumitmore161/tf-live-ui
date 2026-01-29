// app/itinerary/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, CalendarDays, Wallet } from "lucide-react";
// import { useSearchParams } from 'next/navigation' 

async function fetchItinerary(searchParams: any) {
    
  const response = await fetch("http://localhost:8080/api/ai/itinerary/json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fromCity: searchParams.fromCity,
      toCity: searchParams.toCity,
      days: Number(searchParams.days),
      travelers: Number(searchParams.travelers),
      eventType: searchParams.eventType,
    }),
  });
//   console.log("Fetch Itinerary Response Status:", searchParams.fromCity, searchParams.toCity, response.status);
  if (!response.ok) throw new Error("Failed to fetch itinerary");
  return response.json();
}

export default async function ItineraryPage({ searchParams }: { searchParams: any }) {
    console.log("Itinerary Page Search Params:", searchParams);
    const data = await fetchItinerary(searchParams);
    console.log("Itinerary Data:", data);
  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Your Custom Trip</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {data.summary.destination}</div>
          <div className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {data.summary.totalDays} Days</div>
          <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {data.summary.travelers} Travelers</div>
          <Badge variant="secondary" className="text-primary">
            Total Est: ₹{data.summary.grandTotal.toLocaleString()}
          </Badge>
        </div>
      </header>

      <div className="space-y-12">
        {data.days.map((day: any) => (
          <section key={day.day} className="relative pl-8 border-l-2 border-primary/20">
            <div className="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-primary border-4 border-background" />
            <h2 className="text-2xl font-bold mb-6">Day {day.day}</h2>
            
            <div className="grid gap-4">
              {day.activities.map((activity: any, idx: number) => (
                <Card key={idx} className="overflow-hidden border-l-4 border-l-primary">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">{activity.title}</h4>
                      <Badge variant="outline" className="capitalize text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {activity.cost > 0 ? `₹${activity.cost.toLocaleString()}` : "Free"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-4 text-right font-semibold text-muted-foreground">
              Day {day.day} Total: ₹{day.dayTotal.toLocaleString()}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}