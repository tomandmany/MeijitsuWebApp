// パス: /actions/memberWorks/createMemberWork.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { TablesInsert } from '@/types/supabase.types';

interface Response {
  success: boolean;
  data?: TablesInsert<'memberWorks'> | null;
  error?: any;
}

export default async function createMemberWork(
  formData: FormData
): Promise<Response> {
  const newMemberWork: Omit<TablesInsert<'memberWorks'>, 'id' | 'createdAt'> = {
    workModelId: '',
    memberId: '',
    startTime: '',
    endTime: '',
  };

  formData.forEach((value, key) => {
    if (key !== 'name' && key !== 'color') {
      (newMemberWork as any)[key] = value as any;
    }
  });

  const { data, error } = await supabase
    .from('memberWorks')
    .insert([newMemberWork])
    .single();

  if (error) {
    console.error('Error creating MemberWork:', error);
    return { success: false, error, data: null };
  }

  return { success: true, data };
}