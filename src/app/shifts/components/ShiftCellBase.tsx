import ShiftSquare from "./ShiftSquare";
import ShiftSquarePair from "./ShiftSquarePair";

type ShiftCellBaseProps = {
    addShift: (startTime: string) => void;
};

const ShiftCellBase = ({ addShift }: ShiftCellBaseProps) => {
    const handleClick = (startTime: string) => {
        addShift(startTime);
    };

    return (
        <div className="flex">
            <ShiftSquare />
            <ShiftSquare isTime />
            {
                Array.from({ length: 60 }).map((_, index) => (
                    <ShiftSquarePair key={index} index={index} onClick={handleClick} isEven={(index + 1) % 2 === 0} />
                ))
            }
            <ShiftSquare />
            <ShiftSquare />
        </div>
    );
};

export default ShiftCellBase;
