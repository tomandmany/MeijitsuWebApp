// パス: /components/WorkBlock.tsx
'use client';

import { useContext } from "react";
import WorkContext from "../contexts/WorkContext";
import { useTheme } from "next-themes";

type WorkBlockProps = {
    width: number;
    left: number;
    startTime: string;
    endTime: string;
    memberId: string;
    workModelId: string;
    isTime?: boolean;
};

export default function WorkBlock({ width, left, startTime, endTime, workModelId, memberId }: WorkBlockProps) {
    const { theme } = useTheme();

    const workContext = useContext(WorkContext);
    if (!workContext) {
        throw new Error('WorkBlock must be used within a WorkProvider');
    }
    const { workModels, handleOpenModal, setCurrentMemberId, setCurrentWorkModelId, setCurrentStartTime, setCurrentEndTime } = workContext;

    const currentWorkModel = workModels.find((workModel) => workModel.id === workModelId);

    const workName = currentWorkModel?.name || "シフト名";

    const workNameColor = workName === '役員会'
        ? theme === 'light'
            ? 'white'
            : 'black'
        : 'white';

    const bgColor = workName === '役員会'
        ? theme === 'light'
            ? 'black'
            : 'white'
        : currentWorkModel?.color;
    
    const handleClick = () => {
        setCurrentMemberId(memberId);
        setCurrentWorkModelId(workModelId);
        setCurrentStartTime(startTime);
        setCurrentEndTime(endTime);
        handleOpenModal();
    }

    return (
        <button
            type="button"
            className={`absolute h-16 flex justify-center items-center text-center cursor-pointer`}
            style={{ width: `calc(${width}rem - 1px)`, left: `${left}rem`, backgroundColor: `${bgColor}`, color: `${workNameColor}` }}
            onClick={handleClick}
        >
            {workName}
        </button>
    );
}
