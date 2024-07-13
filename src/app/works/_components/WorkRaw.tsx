// パス: /components/WorkRaw.tsx

import { ReactNode } from 'react';
import WorkRawBase from "./WorkRawBase";

type WorkRawProps = {
    children: ReactNode;
    memberName: string;
}

const WorkRaw = ({ children, memberName }: WorkRawProps) => {
    return (
        <>
            <div className="relative flex w-[124rem] border-b border-b-gray-600 dark:border-b-gray-400">
                <WorkRawBase memberName={memberName} />
                {children}
            </div>
        </>
    );
};

export default WorkRaw;
