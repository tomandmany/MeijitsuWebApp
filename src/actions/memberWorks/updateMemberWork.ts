// パス: /actions/memberWorks/updateMemberWork.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { TablesUpdate } from '@/types/supabase.types';
import { revalidatePath } from 'next/cache';

interface Response {
  success: boolean;
  data?: TablesUpdate<'memberWorks'> | null;
  error?: any;
}

export default async function updateMemberWork(
  formData: FormData
): Promise<Response> {
  const updatedMemberWork: Omit<TablesUpdate<'memberWorks'>, 'createdAt'> = {
    workModelId: formData.get('workModelId') as string,
    memberId: formData.get('memberId') as string,
    startTime: formData.get('startTime') as string,
    endTime: formData.get('endTime') as string,
  };

  const { data: memberWorkData, error: memberWorkError } = await supabase
    .from('memberWorks')
    .select('id')
    .eq('id', formData.get('memberWorkId') as string);

  if (memberWorkError || !memberWorkData || memberWorkData.length === 0) {
    console.error('Error finding memberWork:', memberWorkError);
    return {
      success: false,
      error: 'Error finding memberWork',
      data: null,
    };
  }

  const memberWorkId = memberWorkData[0].id; // 最初の行のIDを使用

  const { data, error: updateError } = await supabase
    .from('memberWorks')
    .update(updatedMemberWork)
    .eq('id', memberWorkId)
    .select()
    .maybeSingle();

  if (updateError) {
    console.error('Error updating MemberWork:', updateError);
    return { success: false, error: updateError, data: null };
  }

  revalidatePath('/works');

  return { success: true, data };
}
