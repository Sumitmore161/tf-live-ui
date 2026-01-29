// app/page.tsx
import { supabase } from '@/lib/supabase';
import HomeUI from '@/Home/HomeUI';
import {getEvents} from '@/lib/data-service';

export default async function Page() {
  // Fetch events from Supabase
  const events = await getEvents();
  // Pass the data to your UI component
  return <HomeUI events={events || []} />;
}