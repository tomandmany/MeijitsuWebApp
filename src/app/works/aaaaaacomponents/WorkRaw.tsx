'use client';

import { useState } from 'react';
import WorkCell from "./WorkCell";
import WorkTimeCell from "./WorkTimeCell";
import WorkModal from "./WorkModal";
import WorkBlock from "./WorkBlock";

type WorkRawProps = {
  members: Member[];
  workModels: WorkModel[];
  memberWorks: MemberWork[];
};

const calculateWidthAndLeft = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const left = ((startHour - 7) * 8) + (startMinute / 15 * 2) + 2;
  const width = ((endHour - startHour) * 8) + ((endMinute - startMinute) / 15 * 2);

  return { left, width };
};

const WorkRaw = ({ members, memberWorks, workModels }: WorkRawProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlock, setCurrentBlock] = useState<WorkBlock>({ name: '', startTime: '', endTime: '', color: '' });
  const [currentBlockIndex, setCurrentBlockIndex] = useState<{ memberIndex: number; WorkIndex: number } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [combinedData, setCombinedData] = useState(() => {
    return members.map((member) => {
      const memberWorksFilteredByMemberId = memberWorks.filter((memberWork) => memberWork.memberId === member.id);
      const works = memberWorksFilteredByMemberId.map((memberWorkFilteredByMemberId) => {
        const workModel = workModels.find((workModel) => workModel.id === memberWorkFilteredByMemberId.workModelId);
        return {
          name: workModel?.name || '',
          startTime: memberWorkFilteredByMemberId?.startTime || '',
          endTime: memberWorkFilteredByMemberId?.endTime || '',
          color: workModel?.color || ''
        };
      });
      return {
        memberId: member.id,
        memberName: member.name,
        works
      };
    });
  });

  const handleOpenModal = (blockData: WorkBlock, memberIndex: number, WorkIndex: number, editing: boolean) => {
    setCurrentBlock(blockData);
    setCurrentBlockIndex({ memberIndex, WorkIndex });
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const handleSave = (data: WorkBlock) => {
    if (currentBlockIndex !== null) {
      const newBlocks = [...combinedData];
      newBlocks[currentBlockIndex.memberIndex].works[currentBlockIndex.WorkIndex] = data;
      setCombinedData(newBlocks);
    }
    setIsModalOpen(false);
  };

  const handleAddWork = (startTime: string, memberIndex: number) => {
    const newWork: WorkBlock = {
      name: '',
      startTime,
      endTime: '',
      color: ''
    };
    setCurrentBlock(newWork);
    setCurrentBlockIndex({ memberIndex, WorkIndex: -1 }); // 新しいシフトの場合は WorkIndex を -1 に設定
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleAddWorkSave = (data: WorkBlock) => {
    if (currentBlockIndex !== null) {
      const newBlocks = [...combinedData];
      if (currentBlockIndex.WorkIndex === -1) {
        newBlocks[currentBlockIndex.memberIndex].works.push(data);
      } else {
        newBlocks[currentBlockIndex.memberIndex].works[currentBlockIndex.WorkIndex] = data;
      }
      setCombinedData(newBlocks);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentBlockIndex(null);
    setIsEditing(false);
  };

  return (
    <div className="overflow-x-auto relative">
      <WorkTimeCell />
      {combinedData.map((member, memberIndex) => (
        <div key={member.memberId} className="flex items-center">
          <WorkCell onAddWork={(startTime) => handleAddWork(startTime, memberIndex)}>
            {member.works.map((block, WorkIndex) => {
              const { left, width } = calculateWidthAndLeft(block.startTime, block.endTime);
              return (
                <WorkBlock
                  key={WorkIndex}
                  width={width}
                  left={left}
                  color={block.color}
                  name={block.name}
                  startTime={block.startTime}
                  endTime={block.endTime}
                  onOpenModal={(blockData: WorkBlock) => handleOpenModal(blockData, memberIndex, WorkIndex, true)}
                />
              );
            })}
          </WorkCell>
        </div>
      ))}
      {isModalOpen && (
        <WorkModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={currentBlock}
          onSave={isEditing ? handleSave : handleAddWorkSave}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default WorkRaw;
