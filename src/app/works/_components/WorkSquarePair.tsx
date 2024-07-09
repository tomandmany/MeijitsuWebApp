import { useContext } from "react";
import WorkContext from "../context/WorkContext";
import WorkSquare from "./WorkSquare";

type WorkSquarePairProps = {
    isBold: boolean;
};
// type WorkSquarePairProps = {
//     index: number;
//     onClick: (startTime: string) => void;
//     isBold: boolean;
// };

const WorkSquarePair = ({ isBold }: WorkSquarePairProps) => {
    const context = useContext(WorkContext);

    if (!context) {
        throw new Error('MyComponent must be used within a MyProvider');
    }

    const { handleOpenModal } = context;

    return (
        <button type="button" className="flex cursor-cell hover:bg-black/10 dark:hover:bg-gray-500/60" onClick={handleOpenModal}>
            <WorkSquare />
            <WorkSquare isBold={isBold} />
        </button>
    );
};
// const WorkSquarePair = ({ index, onClick, isBold }: WorkSquarePairProps) => {
    // const handleClick = () => {
    //     const totalMinutes = index * 15;
    //     const startHour = Math.floor(totalMinutes / 60) + 7;
    //     const startMinute = totalMinutes % 60;
    //     const startTime = `${startHour}:${startMinute.toString().padStart(2, '0')}`;
    //     onClick(startTime);
    // };

//     return (
//         <div className="flex cursor-cell hover:bg-black/10 dark:hover:bg-gray-500/60" onClick={handleClick}>
//             <WorkSquare />
//             <WorkSquare isTime={isBold} />
//         </div>
//     );
// };

export default WorkSquarePair;
