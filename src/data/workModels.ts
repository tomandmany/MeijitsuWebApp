// /data/workModels.ts
// @filename: /data/workModels.ts

import { supabase } from '@/lib/supabaseClient';
import { unstable_cache } from 'next/cache';

export const getWorkModels = unstable_cache(
  async () => {
    const { data, error } = await supabase.from('workModels').select('*');
    if (error) {
      console.error('Error fetching workModels:', error);
      return [];
    }
    return data;
  },
  ['workModels'],
  { tags: ['workModels'], revalidate: 60 }
);
