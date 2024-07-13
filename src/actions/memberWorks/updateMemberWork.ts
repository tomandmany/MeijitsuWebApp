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
  const memberName = formData.get('memberName') as string;
  // console.log('memberName:', memberName); // デバッグ用
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
  // console.log('workName:', workName); // デバッグ用
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
  // console.log('startTime:', startTime); // デバッグ用
  // console.log('endTime:', endTime); // デバッグ用

  // // ゼロパディング解除
  // const formatTime = (time: string) => {
  //   return time.startsWith('0') ? time.slice(1) : time;
  // };
  // const formattedStartTime = formatTime(startTime);
  // const formattedEndTime = formatTime(endTime);
  // console.log('formatted startTime:', formattedStartTime); // デバッグ用
  // console.log('formatted endTime:', formattedEndTime); // デバッグ用

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
    // startTime: formattedStartTime,
    // endTime: formattedEndTime,
    startTime: startTime,
    endTime: endTime,
  };

  const { data, error: updateError } = await supabase
    .from('memberWorks')
    .update(updatedMemberWork)
    .eq('id', memberWorkData.id) // 更新対象のidを指定
    .select() // 更新後のデータを取得
    .maybeSingle();

  if (updateError) {
    console.error('Error updating MemberWork:', updateError);
    return { success: false, error: updateError, data: null };
  }

  revalidatePath('/');

  return { success: true, data };
}
