// // パス: /actions/memberWorks/deleteMemberWork.ts
// 'use server';

// import { supabase } from '@/lib/supabaseClient';
// import { revalidatePath, revalidateTag } from 'next/cache';

// interface Response {
//   success: boolean;
//   error?: any;
//   data?: any;
// }

// export default async function deleteMemberWork(
//   formData: FormData
// ): Promise<Response> {
//   const memberName = formData.get('memberName') as string;
//   const { data: memberData, error: memberError } = await supabase
//     .from('members')
//     .select('id')
//     .eq('name', memberName)
//     .single();

//   if (memberError || !memberData) {
//     console.error('Error finding member:', memberError);
//     return { success: false, error: 'Error finding member' };
//   }
//   const memberId = memberData.id;

//   const workName = formData.get('workName') as string;
//   const { data: workModelData, error: workModelError } = await supabase
//     .from('workModels')
//     .select('id')
//     .eq('name', workName)
//     .single();

//   if (workModelError || !workModelData) {
//     console.error('Error finding workModel:', workModelError);
//     return { success: false, error: 'Error finding workModel' };
//   }
//   const workModelId = workModelData.id;

//   const { error: deleteError } = await supabase
//     .from('memberWorks')
//     .delete()
//     .eq('workModelId', workModelId)
//     .eq('memberId', memberId)
//     .eq('startTime', formData.get('startTime') as string)
//     .eq('endTime', formData.get('endTime') as string);

//   if (deleteError) {
//     console.error('Error deleting MemberWork:', deleteError);
//     return { success: false, error: deleteError };
//   }

//   // revalidatePath('/works');
//   revalidateTag('memberWorks');

//   return { success: true };
// }
