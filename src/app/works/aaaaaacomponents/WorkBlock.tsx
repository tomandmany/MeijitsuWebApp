// パス: /components/WorkBlock.tsx
'use client';

type WorkBlockProps = {
    width: number;
    left: number;
    color: string;
    name: string;
    startTime: string;
    endTime: string;
    workModelId: string;
    memberId: string;
    isTime?: boolean;
    onOpenModal: (blockData: WorkBlock) => void;
};

const WorkBlock = ({ width, left, color, name, startTime, endTime, workModelId, memberId, onOpenModal }: WorkBlockProps) => {
    const nameColor = name === "役員会" ? "text-white dark:text-black" : "text-black";

    const handleClick = () => {
        onOpenModal({ name, startTime, endTime, color, workModelId, memberId });
    };

    return (
        <div
            onClick={handleClick}
            className={`absolute h-16 ${color} flex justify-center items-center text-center cursor-pointer ${nameColor}`}
            style={{ width: `calc(${width}rem - 1px)`, left: `${left}rem` }}
        >
            {name}
        </div>
    );
};

export default WorkBlock;
