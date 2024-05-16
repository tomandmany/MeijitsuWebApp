import ShiftSquare from "./ShiftSquare";
import ShiftSquareGroup from "./ShiftSquareGroup";

const ShiftCellBase = () => {
    return (
        <>
            <ShiftSquare />
            <ShiftSquare isBorder />
            {
                Array.from({ length: 30 }).map((_, index) => (
                    <ShiftSquareGroup key={index} />
                ))
            }
            <ShiftSquare />
            <ShiftSquare />
        </>
    )
}

export default ShiftCellBase;
