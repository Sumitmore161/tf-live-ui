// app/page.tsx
import { supabase } from '@/lib/supabase';
import HomeUI from '@/Home/HomeUI';

export default async function Page() {
  // Fetch events from Supabase
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
  }

  console.log('Fetched events:', events);
  // Pass the data to your UI component
  return <HomeUI events={events || []} />;
}