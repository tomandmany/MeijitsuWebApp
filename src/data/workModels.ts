import { createClient } from '@supabase/supabase-js';

export async function getWorkModels() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase
    .from('workModels')
    .select('*')
    .order('createdAt', { ascending: false });
  if (error) {
    console.error('Error fetching workModels:', error);
    return [];
  }
  return data;
}
