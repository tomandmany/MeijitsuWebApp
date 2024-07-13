// src/context/WorkContext.tsx

import { createContext } from 'react';

interface WorkContextType {
    members: Member[];
    memberWorks: MemberWork[];
    workModels: WorkModel[];
    isModalOpen: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    currentMemberName: string;
    setCurrentMemberName: (name: string) => void;
    currentWorkName: string;
    setCurrentWorkName: (name: string) => void;
    currentStartTime: string;
    setCurrentStartTime: (startTime: string) => void;
    currentEndTime: string;
    setCurrentEndTime: (endTime: string) => void;
}

const WorkContext = createContext<WorkContextType | undefined>(undefined);

export default WorkContext;
