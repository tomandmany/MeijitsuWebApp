import { ShiftColorBlockType } from '@/types/shiftColorBlockType';

type ShiftColorBlockProps = {
    width: number;
    left: number;
    color: string;
    name: string;
    onOpenModal: (data: ShiftColorBlockType) => void;
};

const ShiftColorBlock = ({ width, left, color, name, onOpenModal }: ShiftColorBlockProps) => {
    const blockData = { name, startTime: '', endTime: '', color };

    const nameColor = name === "役員会" ? "text-white dark:text-black" : "text-black";

    return (
        <div
            onClick={() => onOpenModal(blockData)}
            className={`absolute h-16 ${color} flex justify-center items-center text-center cursor-pointer ${nameColor}`}
            style={{ width: `calc(${width}rem - 1px)`, left: `${left}rem` }}
        >
            {name}
        </div>
    );
};

export default ShiftColorBlock;
