import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/supabaseClient';

export const getMemberWorks = unstable_cache(
  async () => {
    const { data, error } = await supabase.from('memberWorks').select('*');
    if (error) {
      console.error('Error fetching memberWorks:', error);
      return [];
    }
    return data;
  },
  ['memberWorks'],
  { tags: ['memberWorks'], revalidate: 60 } // キャッシュを60秒間保持
);
