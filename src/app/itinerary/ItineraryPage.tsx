"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, CalendarDays, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

async function fetchItinerary(params: any) {
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_NAME
  try {
    const value = typeof params.value === 'string' ? JSON.parse(params.value) : params.value;
    const response = await fetch(`${BASE_URL}/api/ai/itinerary/json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromCity: value.fromCity,
        toCity: value.toCity,
        days: Number(value.days),
        travelers: Number(value.travelers),
        eventType: value.eventType,
      }),
    });
    if (!response.ok) throw new Error("Failed to fetch itinerary");
    return response.json();
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    throw error;
  }
}

interface ItineraryPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ItineraryPage({ searchParams }: ItineraryPageProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItinerary(searchParams)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [searchParams]);300

  if (loading) return <div className="text-center py-10">Loading your itinerary...</div>;
  if (error || !data) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  const value = typeof searchParams.value === 'string' ? JSON.parse(searchParams.value) : searchParams.value;
  const total = data.days.reduce((sum: number, day: any) => sum + day.dayTotal, 0);
  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Your Custom Trip to {value.toCity} from {value.fromCity}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-2xl text-muted-foreground">
          <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {data.summary.destination}</div>
          <div className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {data.summary.totalDays} Days</div>
          <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {data.summary.travelers} Travelers</div>
          <Badge variant="secondary" className="text-primary text-2xl font-bold">
            Total Est: ₹{total.toLocaleString()}
          </Badge>
        </div>
      </header>

      <div className="space-y-4">
        {data.days.map((day: any) => (
          <details key={day.day} className="group border rounded-xl bg-card transition-all duration-300 open:shadow-md">
            {/* The Clickable Header */}
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {day.day}
                </div>
                <div>
                  <h2 className="text-xl font-bold">Day {day.day}</h2>
                  <p className="text-sm text-muted-foreground">{day.activities.length} activities planned</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-primary">₹{day.dayTotal.toLocaleString()}</span>
                <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180 text-muted-foreground" />
              </div>
            </summary>

            {/* The Collapsible Content */}
            <div className="px-6 pb-6 pt-2 border-t border-muted/50">
              <div className="grid gap-4">
                {day.activities.map((activity: any, idx: number) => (
                  <Card key={idx} className="border-l-4 border-l-primary shadow-sm">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{activity.title}</h4>
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="font-bold text-green-600 whitespace-nowrap">
                        {activity.cost > 0 ? `₹${activity.cost.toLocaleString()}` : "Free"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}