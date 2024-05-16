import ShiftNameRaw from "@/components/Shifts/ShiftNameRaw";
import ShiftRaw from "@/components/Shifts/ShiftRaw";
import { fetchUsers, fetchUserShifts, fetchShiftsModel } from '@/lib/api';

export default async function ShiftTable() {
    const users = await fetchUsers();
    const userShifts = await fetchUserShifts();
    const shiftsModel = await fetchShiftsModel();

    return (
        <div className="flex border-t border-r border-gray-600 dark:border-gray-400 overflow-hidden bg-white dark:bg-inherit">
            <ShiftNameRaw users={users} />
            <ShiftRaw users={users} userShifts={userShifts} shiftsModel={shiftsModel} />
        </div>
    );
}
