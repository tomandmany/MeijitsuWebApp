// パス: /components/WorkSquarePair.tsx

import { useContext } from "react";
import WorkContext from "../contexts/WorkContext";
import WorkSquare from "./WorkSquare";

const generateTimeOptions = (startHour: number, endHour: number, interval: number) => {
    const options = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
            if (hour !== 22 || minute === 0) {
                const time = `${hour}:${minute.toString().padStart(2, '0')}`;
                options.push({ value: time, label: time });
            }
        }
    }
    return options;
};

const timeList = generateTimeOptions(7, 22, 15);

type WorkSquarePairProps = {
    isBold: boolean;
    memberName: string;
    timeIndex: number; // 追加：時間リストのインデックス
};

const WorkSquarePair = ({ isBold, memberName, timeIndex }: WorkSquarePairProps) => {
    const context = useContext(WorkContext);

    if (!context) {
        throw new Error('WorkSquarePair must be used within a WorkProvider');
    }

    const { handleOpenModal, setCurrentMemberName, setCurrentWorkName, setCurrentStartTime, setCurrentEndTime } = context;

    const handleClick = () => {
        if (timeIndex >= 0 && timeIndex < timeList.length) {
            const startTime = timeList[timeIndex].value;
            const endTimeIndex = timeIndex + 1; // 15分単位なので1つ進める
            const endTime = endTimeIndex < timeList.length
                ? timeList[endTimeIndex].value
                : timeList[timeIndex].value;

            setCurrentWorkName('');
            setCurrentStartTime(startTime);
            setCurrentEndTime(endTime);
            setCurrentMemberName(memberName); // 現在のメンバー名を設定
            handleOpenModal();
        } else {
            console.error("Invalid timeIndex:", timeIndex);
        }
    };

    return (
        <button type="button" className="flex cursor-cell hover:bg-black/10 dark:hover:bg-gray-500/60" onClick={handleClick}>
            <WorkSquare />
            <WorkSquare isBold={isBold} />
        </button>
    );
};

export default WorkSquarePair;
