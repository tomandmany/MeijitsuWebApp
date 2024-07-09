// /data/memberWorks.ts
// @filename: /data/memberWorks.ts

import { supabase } from '@/lib/supabaseClient';

export async function getMemberWorks() {
  const { data, error } = await supabase.from('memberWorks').select('*');
  if (error) {
    console.error('Error fetching memberWorks:', error);
    return [];
  }
  return data;
}