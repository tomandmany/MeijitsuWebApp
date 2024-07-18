import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabaseClient';

export const getMembers = unstable_cache(
  async () => {
    const { data, error } = await supabase.from('members').select('*');
    if (error) {
      console.error('Error fetching members:', error);
      return [];
    }
    return data;
  },
  ['members'],
  { tags: ['members'], revalidate: 60 } // キャッシュを60秒間保持
);
