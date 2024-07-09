// src/context/WorkProvider.tsx

'use client';

import { useState } from 'react';
import WorkContext from './WorkContext';
import WorkModal from '../_components/WorkModal';

interface WorkProviderProps {
    members: Member[];
    workModels: WorkModel[];
    children: React.ReactNode;
}

const WorkProvider = ({ members, workModels, children }: WorkProviderProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <WorkContext.Provider value={{ members, workModels, handleOpenModal, handleCloseModal }}>
            {children}
            {isModalOpen && <WorkModal />}
        </WorkContext.Provider>
    );
};

export default WorkProvider;
