interface WorkSquareProps {
    isTime?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

const WorkSquare = ({ isTime, onClick }: WorkSquareProps) => {
    const borderColor = isTime ? "border-r-gray-800 dark:border-r-gray-400" : "border-r-gray-300 dark:border-r-gray-700";

    return (
        <div
            className={`min-w-4 h-16 flex items-end border-r ${borderColor}`}
            onClick={onClick}
        >
        </div>
    );
};

export default WorkSquare;
