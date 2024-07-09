const WorkTimeCell = () => {
  const timeList = [
    { beforeColon: '7', afterColon: '00' },
    { beforeColon: '7', afterColon: '30' },
    { beforeColon: '8', afterColon: '00' },
    { beforeColon: '8', afterColon: '30' },
    { beforeColon: '9', afterColon: '00' },
    { beforeColon: '9', afterColon: '30' },
    { beforeColon: '10', afterColon: '00' },
    { beforeColon: '10', afterColon: '30' },
    { beforeColon: '11', afterColon: '00' },
    { beforeColon: '11', afterColon: '30' },
    { beforeColon: '12', afterColon: '00' },
    { beforeColon: '12', afterColon: '30' },
    { beforeColon: '13', afterColon: '00' },
    { beforeColon: '13', afterColon: '30' },
    { beforeColon: '14', afterColon: '00' },
    { beforeColon: '14', afterColon: '30' },
    { beforeColon: '15', afterColon: '00' },
    { beforeColon: '15', afterColon: '30' },
    { beforeColon: '16', afterColon: '00' },
    { beforeColon: '16', afterColon: '30' },
    { beforeColon: '17', afterColon: '00' },
    { beforeColon: '17', afterColon: '30' },
    { beforeColon: '18', afterColon: '00' },
    { beforeColon: '18', afterColon: '30' },
    { beforeColon: '19', afterColon: '00' },
    { beforeColon: '19', afterColon: '30' },
    { beforeColon: '20', afterColon: '00' },
    { beforeColon: '20', afterColon: '30' },
    { beforeColon: '21', afterColon: '00' },
    { beforeColon: '21', afterColon: '30' },
    { beforeColon: '22', afterColon: '00' },
  ];

  return (
    <div className="flex border-b border-gray-600 dark:border-gray-400 w-[124rem] bg-sky-100 dark:bg-gray-300">
      {timeList.map((time, index) => (
        <div
          key={index}
          className="dark:text-gray-900 flex h-16 items-center justify-center relative min-w-[4rem]"
        >
          {time.beforeColon}:{time.afterColon}
        </div>
      ))}
    </div>
  );
};

export default WorkTimeCell;
