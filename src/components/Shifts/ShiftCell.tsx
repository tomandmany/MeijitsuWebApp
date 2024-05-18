import { ReactNode } from 'react';
import ShiftCellBase from "./ShiftCellBase";

type ShiftCellProps = {
    onAddShift: (startTime: string) => void;
    children: ReactNode;
};

const ShiftCell = ({ onAddShift, children }: ShiftCellProps) => (
    <div className="relative flex w-[124rem] border-b border-b-gray-600 dark:border-b-gray-400">
        <ShiftCellBase addShift={onAddShift} />
        {children}
    </div>
);

export default ShiftCell;
