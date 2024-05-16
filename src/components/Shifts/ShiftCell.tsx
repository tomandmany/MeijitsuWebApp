import ShiftCellBase from "./ShiftCellBase";
import { ReactNode } from 'react';

type ShiftCellProps = {
    children: ReactNode;
};

const ShiftCell = ({ children }: ShiftCellProps) => (
    <div className="relative flex w-[124rem] border-b border-b-gray-600 dark:border-b-gray-400">
        <ShiftCellBase />
        {children}
    </div>
);

export default ShiftCell;
