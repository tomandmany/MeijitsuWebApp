import React, { ReactNode } from 'react';

interface MemberTableHeadProps {
  children: ReactNode;
  className?: string;
}

const MemberTableHead = ({ children, className }: MemberTableHeadProps) => {
  return <div className={`p-2 border-b dark:border-gray-600 text-center text-nowrap ${className}`}>{children}</div>;
};

export default MemberTableHead;