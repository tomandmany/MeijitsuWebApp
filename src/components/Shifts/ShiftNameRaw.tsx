import ShiftNameCell from "./ShiftNameCell";

interface ShiftNameRawProps {
  users: { id: string; name: string }[];
}

const ShiftNameRaw = ({ users }: ShiftNameRawProps) => {
  return (
    <div>
      <div className="dark:text-gray-900 border-x border-b border-gray-600 dark:border-gray-400 dark:border-r-black px-4 min-w-28 h-[65px] flex justify-center items-center bg-sky-100 dark:bg-gray-300">
        名前
      </div>
      {users.map(user => (
        <ShiftNameCell key={user.id} name={user.name} />
      ))}
    </div>
  );
}

export default ShiftNameRaw;
