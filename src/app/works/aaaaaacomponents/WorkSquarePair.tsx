import WorkSquare from "./WorkSquare";

type WorkSquarePairProps = {
    index: number;
    onClick: (startTime: string) => void;
    isEven: boolean;
};

const WorkSquarePair = ({ index, onClick, isEven }: WorkSquarePairProps) => {
    const handleClick = () => {
        const totalMinutes = index * 15;
        const startHour = Math.floor(totalMinutes / 60) + 7;
        const startMinute = totalMinutes % 60;
        const startTime = `${startHour}:${startMinute.toString().padStart(2, '0')}`;
        onClick(startTime);
    };

    return (
        <div className="flex cursor-cell hover:bg-black/10 dark:hover:bg-gray-500/60" onClick={handleClick}>
            <WorkSquare />
            <WorkSquare isTime={isEven} />
        </div>
    );
};

export default WorkSquarePair;
