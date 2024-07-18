// // パス: /components/WorkModal.tsx
// 'use client'

// import { useContext, useState, useEffect } from "react";
// import WorkContext from "../contexts/WorkContext";
// import { Button } from "@/components/ui/button";
// import createMemberWork from '@/actions/memberWorks/createMemberWork';
// import updateMemberWork from '@/actions/memberWorks/updateMemberWork';
// import { X } from "lucide-react";
// import deleteMemberWork from "@/actions/memberWorks/deleteMemberWork";

// const generateTimeOptions = (startHour: number, endHour: number, interval: number) => {
//     const options = [];
//     for (let hour = startHour; hour <= endHour; hour++) {
//         for (let minute = 0; minute < 60; minute += interval) {
//             if (hour !== 22 || minute === 0) {
//                 const time = `${hour}:${minute.toString().padStart(2, '0')}`;
//                 options.push(time);
//             }
//         }
//     }
//     return options;
// };

// const startOptions = generateTimeOptions(7, 21, 15); // 7:00〜21:45
// const endOptions = generateTimeOptions(7, 22, 15); // 7:15〜22:00

// const WorkModal = () => {
//     const context = useContext(WorkContext);
//     if (!context) {
//         throw new Error('WorkModal must be used within a WorkProvider');
//     }
//     const { workModels, handleCloseModal, currentMemberName, currentWorkName, currentStartTime, currentEndTime } = context;

//     const [formData, setFormData] = useState({
//         workName: "",
//         startTime: "",
//         endTime: ""
//     });

//     useEffect(() => {
//         setFormData(prevState => ({
//             ...prevState,
//             workName: currentWorkName || "",
//             startTime: currentStartTime || "",
//             endTime: currentEndTime || ""
//         }));
//     }, [currentWorkName, currentStartTime, currentEndTime]);

//     const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({ ...prevState, [name]: value }));
//     };

//     const handleInsert = async () => {
//         const form = new FormData();
//         form.append('workName', formData.workName);
//         console.log('Inserting workName:', formData.workName);  // デバッグ用
//         form.append('startTime', formData.startTime);
//         form.append('endTime', formData.endTime);
//         form.append('memberName', currentMemberName); // メンバー名を追加

//         const response = await createMemberWork(form);
//         console.log('Server response:', response); // デバッグ用
//         if (response.success) {
//             // 成功した場合の処理
//         } else {
//             // 失敗した場合の処理
//         }

//         handleCloseModal();
//     };

//     const handleUpdate = async () => {
//         const form = new FormData();
//         form.append('workName', formData.workName);
//         console.log('Updating workName:', formData.workName);  // デバッグ用
//         form.append('startTime', formData.startTime);
//         form.append('endTime', formData.endTime);
//         form.append('memberName', currentMemberName); // メンバー名を追加

//         const response = await updateMemberWork(form);
//         console.log('Server response:', response); // デバッグ用
//         if (response.success) {
//             // 成功した場合の処理
//         } else {
//             // 失敗した場合の処理
//         }

//         handleCloseModal();
//     }

//     const handleDelete = async () => {
//         const form = new FormData();
//         form.append('memberName', currentMemberName);
//         form.append('workName', formData.workName);
//         form.append('startTime', formData.startTime);
//         form.append('endTime', formData.endTime);

//         console.log('Deleting workName:', formData.workName);  // デバッグ用

//         const response = await deleteMemberWork(form);
//         console.log('Server response:', response); // デバッグ用
//         if (response.success) {
//             // 成功した場合の処理
//         } else {
//             // 失敗した場合の処理
//         }

//         handleCloseModal();
//     }

//     return (
//         <div className="fixed inset-0 flex justify-center items-center z-[9999]">
//             <div className="fixed inset-0 bg-black/50 z-[9998] modal-overlay" onClick={handleCloseModal} />
//             <div
//                 className="bg-white dark:bg-gray-800 p-4 min-w-96 rounded shadow-lg z-[10000] flex flex-col gap-8 relative"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <h2 className="text-xl text-center text-black dark:text-white">シフト詳細</h2>
//                 <Button
//                     type="button"
//                     variant='ghost'
//                     className="absolute right-[10px] top-[10px] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 p-2"
//                     onClick={handleCloseModal}
//                 >
//                     <X />
//                 </Button>
//                 <div className="flex flex-col gap-4">
//                     <div>
//                         <label htmlFor="workName" className="block mb-1 text-black dark:text-white">シフト名</label>
//                         <select id="workName" name="workName" className="min-w-full" onChange={handleChange} value={formData.workName}>
//                             <option value="">選択してください</option>
//                             {workModels.map((workModel) => (
//                                 <option key={workModel.name} value={workModel.name}>{workModel.name}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div>
//                         <label htmlFor="startTime" className="block mb-1 text-black dark:text-white">開始時間</label>
//                         <select id="startTime" name="startTime" className="min-w-full" onChange={handleChange} value={formData.startTime}>
//                             {startOptions.map((startOption) => (
//                                 <option key={startOption} value={startOption}>{startOption}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div>
//                         <label htmlFor="endTime" className="block mb-1 text-black dark:text-white">終了時間</label>
//                         <select id="endTime" name="endTime" className="min-w-full" onChange={handleChange} value={formData.endTime}>
//                             {endOptions.map((endOption) => (
//                                 <option key={endOption} value={endOption}>{endOption}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//                 <div className="flex justify-between gap-2">
//                     <Button
//                         type="button"
//                         variant='destructive'
//                         className="bg-red-600 hover:bg-red-700"
//                         onClick={handleDelete}
//                     >
//                         削除する
//                     </Button>
//                     {
//                         currentWorkName
//                             ?
//                             (
//                                 <Button
//                                     type="button"
//                                     className="bg-blue-500 hover:bg-blue-500/80 text-white px-4 py-2"
//                                     onClick={handleUpdate}
//                                 >
//                                     更新する
//                                 </Button>
//                             )
//                             :
//                             (
//                                 <Button
//                                     type="button"
//                                     className="bg-blue-500 hover:bg-blue-500/80 text-white px-4 py-2"
//                                     onClick={handleInsert}
//                                 >
//                                     保存する
//                                 </Button>
//                             )
//                     }
//                 </div>
//             </div>
//         </div >
//     );
// };

// export default WorkModal;