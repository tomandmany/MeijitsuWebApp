// パス: /components/WorkRawBase.tsx

import WorkSquare from "./WorkSquare";
import WorkSquarePair from "./WorkSquarePair";

type WorkRawBaseProps = {
    memberId: string;
};

const WorkRawBase = ({ memberId }: WorkRawBaseProps) => {
    return (
        <div className="flex">
            <WorkSquare />
            <WorkSquare isBold />
            {
                Array.from({ length: 60 }).map((_, index) => (
                    <WorkSquarePair key={index} isBold={(index + 1) % 2 === 0} memberId={memberId} timeIndex={index} />
                ))
            }
            <WorkSquare />
            <WorkSquare />
        </div>
    );
};

export default WorkRawBase;
