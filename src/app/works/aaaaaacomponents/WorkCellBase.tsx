import WorkSquare from "./WorkSquare";
import WorkSquarePair from "./WorkSquarePair";

type WorkCellBaseProps = {
    addWork: (startTime: string) => void;
};

const WorkCellBase = ({ addWork }: WorkCellBaseProps) => {
    const handleClick = (startTime: string) => {
        addWork(startTime);
    };

    return (
        <div className="flex">
            <WorkSquare />
            <WorkSquare isTime />
            {
                Array.from({ length: 60 }).map((_, index) => (
                    <WorkSquarePair key={index} index={index} onClick={handleClick} isEven={(index + 1) % 2 === 0} />
                ))
            }
            <WorkSquare />
            <WorkSquare />
        </div>
    );
};

export default WorkCellBase;
