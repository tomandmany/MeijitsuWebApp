import React, { ReactNode } from 'react';

interface MemberTableRawProps {
    children: ReactNode;
}

const MemberTableRaw = ({ children }: MemberTableRawProps) => {
    return <div className={`border-r last:border-r-0 dark:border-gray-600`}>{children}</div>;
};

export default MemberTableRaw;