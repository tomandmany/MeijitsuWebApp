interface ShiftNameCellProps {
  name: string;
}

const ShiftNameCell = ({ name }: ShiftNameCellProps) => {
  return (
    <div className="border-x border-b border-gray-600 dark:border-gray-400 px-4 w-28 h-[65px] flex justify-center items-center">
      {name}
    </div>
  );
};

export default ShiftNameCell;
