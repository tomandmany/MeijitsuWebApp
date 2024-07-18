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
  const memberName = formData.get('memberName') as string;
  if (!memberName) {
    console.error('memberName is missing');
    return { success: false, error: 'memberName is missing', data: null };
  }

  const { data: memberData, error: memberError } = await supabase
    .from('members')
    .select('id')
    .eq('name', memberName)
    .single();
  if (memberError || !memberData) {
    console.error('Error finding member:', memberError);
    return { success: false, error: 'Error finding member', data: null };
  }
  const memberId = memberData.id;

  const workName = formData.get('workName') as string;
  if (!workName) {
    console.error('workName is missing');
    return { success: false, error: 'workName is missing', data: null };
  }

  const { data: workModelData, error: workModelError } = await supabase
    .from('workModels')
    .select('id')
    .eq('name', workName)
    .single();
  if (workModelError || !workModelData) {
    console.error('Error finding workModel:', workModelError);
    return { success: false, error: 'Error finding workModel', data: null };
  }
  const workModelId = workModelData.id;

  const startTime = formData.get('startTime') as string;
  const endTime = formData.get('endTime') as string;
  if (!startTime || !endTime) {
    console.error('startTime or endTime is missing');
    return {
      success: false,
      error: 'startTime or endTime is missing',
      data: null,
    };
  }

  const newMemberWork: Omit<TablesInsert<'memberWorks'>, 'id' | 'createdAt'> = {
    workModelId: workModelId,
    memberId: memberId,
    startTime: startTime,
    endTime: endTime,
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
