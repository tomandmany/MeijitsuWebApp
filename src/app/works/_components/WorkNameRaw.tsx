import WorkNameCell from "./WorkNameCell";

interface WorkNameRawProps {
  members: Member[];
}

const WorkNameRaw = ({ members }: WorkNameRawProps) => {
  return (
    <div>
      <div className="dark:text-gray-900 border-x border-b border-gray-600 dark:border-gray-400 dark:border-r-black px-4 min-w-28 h-[65px] flex justify-center items-center bg-sky-100 dark:bg-gray-300">
        名前
      </div>
      {members.map(member => (
        <WorkNameCell key={member.id} name={member.name} createdAt={member.createdAt} />
      ))}
    </div>
  );
}

export default WorkNameRaw;
