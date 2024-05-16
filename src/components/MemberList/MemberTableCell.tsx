import React, { ReactNode } from 'react';

interface MemberTableCellProps {
  children: ReactNode;
  className?: string;
}

const MemberTableCell = ({ children, className }: MemberTableCellProps) => {
  return <div className={`p-2 border-b last:border-b-0 dark:border-gray-600 text-center text-nowrap ${className}`}>{children}</div>;
};

export default MemberTableCell;