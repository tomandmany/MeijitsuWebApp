// パス: /actions/memberWorks/deleteMemberWork.ts
'use server';

import { supabase } from '@/lib/supabaseClient';
import { revalidatePath } from 'next/cache';

interface Response {
  success: boolean;
  error?: any;
  data?: any;
}

export default async function deleteMemberWork(
  formData: FormData
): Promise<Response> {const { error: deleteError } = await supabase
    .from('memberWorks')
    .delete()
    .eq('id', formData.get('memberWorkId') as string)

  if (deleteError) {
    console.error('Error deleting MemberWork:', deleteError);
    return { success: false, error: deleteError };
  }

  revalidatePath('/works');

  return { success: true };
}
