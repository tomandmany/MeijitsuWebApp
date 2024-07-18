// パス: /actions/memberWorks/updateMemberWork.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { TablesUpdate } from '@/types/supabase.types';
import { revalidatePath, revalidateTag } from 'next/cache';

interface Response {
  success: boolean;
  data?: TablesUpdate<'memberWorks'> | null;
  error?: any;
}

export default async function updateMemberWork(
  formData: FormData
): Promise<Response> {
  const memberName = formData.get('memberName') as string;
  const { data: memberData, error: memberError } = await supabase
    .from('members')
    .select('id')
    .eq('name', memberName)
    .maybeSingle();

  if (memberError || !memberData) {
    console.error('Error finding member:', memberError);
    return { success: false, error: 'Error finding member', data: null };
  }

  const memberId = memberData.id;

  const workName = formData.get('workName') as string;
  const { data: workModelData, error: workModelError } = await supabase
    .from('workModels')
    .select('id')
    .eq('name', workName)
    .maybeSingle();

  if (workModelError || !workModelData) {
    console.error('Error finding workModel:', workModelError);
    return { success: false, error: 'Error finding workModel', data: null };
  }
  const workModelId = workModelData.id;

  const startTime = formData.get('startTime') as string;
  const endTime = formData.get('endTime') as string;

  const { data: memberWorkData, error: memberWorkError } = await supabase
    .from('memberWorks')
    .select('id')
    .eq('workModelId', workModelId)
    .eq('memberId', memberId)
    .single();

  if (memberWorkError || !memberWorkData) {
    console.error('Error finding memberWork:', memberWorkError);
    return {
      success: false,
      error: 'Error finding memberWork',
      data: null,
    };
  }

  const updatedMemberWork: Omit<TablesUpdate<'memberWorks'>, 'createdAt'> = {
    workModelId: workModelId,
    memberId: memberId,
    startTime: startTime,
    endTime: endTime,
  };

  const { data, error: updateError } = await supabase
    .from('memberWorks')
    .update(updatedMemberWork)
    .eq('id', memberWorkData.id)
    .select()
    .maybeSingle();

  if (updateError) {
    console.error('Error updating MemberWork:', updateError);
    return { success: false, error: updateError, data: null };
  }

  // revalidatePath('/works');
  revalidateTag('memberWorks');

  return { success: true, data };
}
