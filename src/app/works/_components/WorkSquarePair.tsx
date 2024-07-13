// パス: /components/WorkSquarePair.tsx

import { useContext } from "react";
import WorkContext from "../contexts/WorkContext";
import WorkSquare from "./WorkSquare";

type WorkSquarePairProps = {
    isBold: boolean;
    memberName: string;
};

const WorkSquarePair = ({ isBold, memberName }: WorkSquarePairProps) => {
    const context = useContext(WorkContext);

    if (!context) {
        throw new Error('WorkSquarePair must be used within a WorkProvider');
    }

    const { handleOpenModal, setCurrentMemberName, setCurrentWorkName, setCurrentStartTime, setCurrentEndTime } = context;

    const handleClick = () => {
        setCurrentWorkName('');
        setCurrentStartTime('');
        setCurrentEndTime('');
        setCurrentMemberName(memberName); // 現在のメンバー名を設定
        handleOpenModal();
    };

    return (
        <button type="button" className="flex cursor-cell hover:bg-black/10 dark:hover:bg-gray-500/60" onClick={handleClick}>
            <WorkSquare />
            <WorkSquare isBold={isBold} />
        </button>
    );
};

export default WorkSquarePair;
