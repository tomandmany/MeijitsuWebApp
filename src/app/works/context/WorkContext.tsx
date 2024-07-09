// src/context/WorkContext.tsx

import { createContext } from 'react';

interface WorkContextType {
    members: Member[];
    workModels: WorkModel[];
    handleOpenModal: () => void;
    handleCloseModal: () => void;
}

const WorkContext = createContext<WorkContextType | undefined>(undefined);

export default WorkContext;
