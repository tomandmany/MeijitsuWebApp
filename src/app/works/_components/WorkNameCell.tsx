interface WorkNameCellProps {
  name: string;
  createdAt: string;
}

const WorkNameCell = ({ name }: WorkNameCellProps) => {
  return (
    <div className="border-x border-b border-gray-600 dark:border-gray-400 px-4 w-28 h-[65px] flex justify-center items-center">
      {name}
    </div>
  );
};

export default WorkNameCell;
