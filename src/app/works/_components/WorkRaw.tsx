// パス: /components/WorkRaw.tsx

import { ReactNode } from 'react';
import WorkRawBase from "./WorkRawBase";

type WorkRawProps = {
    children: ReactNode;
    memberId: string;
}

const WorkRaw = ({ children, memberId }: WorkRawProps) => {
    return (
        <>
            <div className="relative flex w-[124rem] border-b border-b-gray-600 dark:border-b-gray-400">
                <WorkRawBase memberId={memberId} />
                {children}
            </div>
        </>
    );
};

export default WorkRaw;
