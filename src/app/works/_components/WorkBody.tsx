// パス: /components/WorkBody.tsx

'use client';

import WorkRaw from "./WorkRaw";
import WorkBlock from './WorkBlock';
import WorkContext from "../contexts/WorkContext";
import { useContext } from "react";
import WorkModal from "./WorkModal";

const calculateWidthAndLeft = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const left = ((startHour - 7) * 8) + (startMinute / 15 * 2) + 2;
  const width = ((endHour - startHour) * 8) + ((endMinute - startMinute) / 15 * 2);

  return { left, width };
};

const WorkBody = () => {
  const context = useContext(WorkContext);
  if (!context) {
    throw new Error('WorkModal must be used within a WorkProvider');
  }
  const { members, memberWorks, isModalOpen } = context;

  return (
    <>
      {members.map((member) => (
        <WorkRaw key={member.id} memberId={member.id}>
          {memberWorks
            .filter((memberWork) => memberWork.memberId === member.id)
            .map((memberWork) => {
              const { left, width } = calculateWidthAndLeft(memberWork.startTime, memberWork.endTime);
              return (
                <WorkBlock
                  key={memberWork.id}
                  width={width}
                  left={left}
                  memberId={member.id}
                  workModelId={memberWork.workModelId}
                  startTime={memberWork.startTime}
                  endTime={memberWork.endTime}
                />
              );
            })}
        </WorkRaw>
      ))}
      {isModalOpen && <WorkModal />}
    </>
  );
};

export default WorkBody;
