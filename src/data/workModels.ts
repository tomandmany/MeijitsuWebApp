// /data/workModels.ts
// @filename: /data/workModels.ts

import { supabase } from '@/lib/supabaseClient';

export async function getWorkModels() {
  const { data, error } = await supabase.from('workModels').select('*');
  if (error) {
    console.error('Error fetching workModels:', error);
    return [];
  }
  return data;
}