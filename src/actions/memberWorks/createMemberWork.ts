// パス: /actions/memberWorks/createMemberWork.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { TablesInsert } from '@/types/supabase.types';
import { revalidatePath } from 'next/cache';

interface Response {
  success: boolean;
  data?: TablesInsert<'memberWorks'> | null;
  error?: any;
}

export default async function createMemberWork(
  formData: FormData
): Promise<Response> {
  const newMemberWork: Omit<TablesInsert<'memberWorks'>, 'id' | 'createdAt'> = {
    workModelId: formData.get('workModelId') as string,
    memberId: formData.get('memberId') as string,
    startTime: formData.get('startTime') as string,
    endTime: formData.get('endTime') as string,
  };

  const { data, error: insertError } = await supabase
    .from('memberWorks')
    .insert([newMemberWork])
    .select() // 追加: 挿入されたデータを返す
    .single();

  if (insertError) {
    console.error('Error creating MemberWork:', insertError);
    return { success: false, error: insertError, data: null };
  }

  revalidatePath('/works');

  console.log('Inserted data:', data);

  return { success: true, data };
}
