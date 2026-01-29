// lib/data-service.ts
import { cache } from 'react'
import { supabase } from './supabase'
import { TravelPackage } from '@/types/travelPackageType'

export const getEvents = cache(async (): Promise<TravelPackage[]> => {
  console.log("🔥 This log will only appear ONCE per page load");
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Supabase Error:', error);
    return [];
  }

  return data as TravelPackage[];
})