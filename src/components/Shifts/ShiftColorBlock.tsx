import { ShiftBlockData } from '@/types/shiftBlockData';  // 型定義のインポーネート

type ShiftColorBlockProps = {
    width: number;
    left: number;
    color: string;
    name: string;
    onOpenModal: (data: ShiftBlockData) => void;
};

const ShiftColorBlock = ({ width, left, color, name, onOpenModal }: ShiftColorBlockProps) => {
    const blockData = { name, width, left, color };
    const nameColor = name === "役員会" ? "text-white dark:text-black" : "text-black";

    return (
        <div
            onClick={() => onOpenModal(blockData)}
            className={`absolute h-16 ${color} flex justify-center items-center px-2 text-center cursor-pointer ${nameColor}`}
            style={{ width: `${width}rem`, left: `${left}rem` }}
        >
            {name}
        </div>
    );
};

export default ShiftColorBlock;
