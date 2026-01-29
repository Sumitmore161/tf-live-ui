export type EventType = "CONCERT" | "RACING" | "SPORTS";
export type StatusType = "coming-soon" | "opening-soon" | "high-demand";

export interface TravelPackage {
  // Mandatory fields
  id: string;
  title: string;
  category: EventType;
  city: string;
  country: string;
  start_date: string;
  end_date: string;

  // Optional fields
  created_at?: string;
  updated_at?: string;
  currency?: string;
  current_price?: number;
  original_price?: number | null;
  description?: string | null;
  image_url?: string | null;
  external_id?: string;
  source?: string;
  league_name?: string | null;
  season?: string | null;
  venue?: string | null;
  view_count?: number;
  
  // Legacy/UI fields (optional)
  status?: StatusType;
  duration?: string;
  ctaTitle?: string;
}