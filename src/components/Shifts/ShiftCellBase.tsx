import ShiftSquare from "./ShiftSquare";
import ShiftSquareGroup from "./ShiftSquareGroup";

const ShiftCellBase = () => {
    return (
        <div className="flex cursor-cell hover:bg-gray-500/30">
            <ShiftSquare />
            <ShiftSquare isBorder />
            {
                Array.from({ length: 30 }).map((_, index) => (
                    <ShiftSquareGroup key={index} />
                ))
            }
            <ShiftSquare />
            <ShiftSquare />
        </div>
    )
}

export default ShiftCellBase;
