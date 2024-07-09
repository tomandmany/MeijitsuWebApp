import { ReactNode } from 'react';
import WorkCellBase from "./WorkCellBase";

type WorkCellProps = {
    onAddWork: (startTime: string) => void;
    children: ReactNode;
};

const WorkCell = ({ onAddWork, children }: WorkCellProps) => (
    <div className="relative flex w-[124rem] border-b border-b-gray-600 dark:border-b-gray-400">
        <WorkCellBase addWork={onAddWork} />
        {children}
    </div>
);

export default WorkCell;
