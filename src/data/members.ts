import { createClient } from '@supabase/supabase-js';

export async function getMembers() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('createdAt', { ascending: false });
  if (error) {
    console.error('Error fetching members:', error);
    return [];
  }
  return data;
}
