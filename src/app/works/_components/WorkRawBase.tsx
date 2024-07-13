// パス: /components/WorkRawBase.tsx

import WorkSquare from "./WorkSquare";
import WorkSquarePair from "./WorkSquarePair";

type WorkRawBaseProps = {
    memberName: string;
};

const WorkRawBase = ({ memberName }: WorkRawBaseProps) => {
    return (
        <div className="flex">
            <WorkSquare />
            <WorkSquare isBold />
            {
                Array.from({ length: 60 }).map((_, index) => (
                    <WorkSquarePair key={index} isBold={(index + 1) % 2 === 0} memberName={memberName} timeIndex={index} />
                ))
            }
            <WorkSquare />
            <WorkSquare />
        </div>
    );
};

export default WorkRawBase;
