// src/context/WorkProvider.tsx

'use client';

import { useState } from 'react';
import WorkContext from './WorkContext';

interface WorkProviderProps {
    members: Member[];
    workModels: WorkModel[];
    memberWorks: MemberWork[];
    children: React.ReactNode;
}

const WorkProvider = ({ members, memberWorks, workModels, children }: WorkProviderProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMemberId, setCurrentMemberId] = useState('');
    const [currentWorkModelId, setCurrentWorkModelId] = useState('');
    const [currentStartTime, setCurrentStartTime] = useState('');
    const [currentEndTime, setCurrentEndTime] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <WorkContext.Provider value={{ members, workModels, memberWorks, isModalOpen, handleOpenModal, handleCloseModal, currentMemberId, setCurrentMemberId, currentWorkModelId, setCurrentWorkModelId, currentStartTime, setCurrentStartTime, currentEndTime, setCurrentEndTime }}>
            {children}
        </WorkContext.Provider>
    );
};

export default WorkProvider;
