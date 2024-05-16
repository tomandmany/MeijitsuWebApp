interface ShiftSquareProps {
    isBorder?: boolean;
}

const ShiftSquare = ({ isBorder }: ShiftSquareProps) => {
    return (
        <div className={`min-w-4 h-16 flex items-end border-r last:border-r-0 ${isBorder ? "border-r-gray-600 dark:border-r-gray-400" : "dark:border-r-gray-800"}`}>
        </div>
    );
};

export default ShiftSquare;
