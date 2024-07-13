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
    const [currentMemberName, setCurrentMemberName] = useState('');
    const [currentWorkName, setCurrentWorkName] = useState('');
    const [currentStartTime, setCurrentStartTime] = useState('');
    const [currentEndTime, setCurrentEndTime] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <WorkContext.Provider value={{ members, workModels, memberWorks, isModalOpen, handleOpenModal, handleCloseModal, currentMemberName, setCurrentMemberName, currentWorkName, setCurrentWorkName, currentStartTime, setCurrentStartTime, currentEndTime, setCurrentEndTime }}>
            {children}
        </WorkContext.Provider>
    );
};

export default WorkProvider;