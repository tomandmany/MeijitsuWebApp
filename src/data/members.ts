// /data/members.ts
// @filename: /data/members.ts

import { supabase } from '@/lib/supabaseClient';

export async function getMembers() {
  const { data, error } = await supabase.from('members').select('id, name');
  if (error) {
    console.error('Error fetching members:', error);
    return [];
  }
  return data;
}