'use client';

import { useState } from 'react';
import ShiftCell from "./ShiftCell";
import ShiftTimeCell from "./ShiftTimeCell";
import ShiftModal from "./ShiftModal";
import ShiftColorBlock from "./ShiftColorBlock";
import { ShiftColorBlockType } from '@/types/shiftColorBlockType';

type ShiftRawProps = {
  users: { id: string, name: string }[];
  userShifts: { user_id: string, shift_id: string, startTime: string, endTime: string }[];
  shiftsModel: { id: string, name: string, color: string }[];
};

const calculateWidthAndLeft = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const left = ((startHour - 7) * 8) + (startMinute / 15 * 2) + 2;
  const width = ((endHour - startHour) * 8) + ((endMinute - startMinute) / 15 * 2);

  return { left, width };
};

const ShiftRaw = ({ users, userShifts, shiftsModel }: ShiftRawProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlock, setCurrentBlock] = useState<ShiftColorBlockType>({ name: '', startTime: '', endTime: '', color: '' });
  const [currentBlockIndex, setCurrentBlockIndex] = useState<{ userIndex: number; shiftIndex: number } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [combinedData, setCombinedData] = useState(() => {
    return users.map((user) => {
      const userShift = userShifts.filter((shift) => shift.user_id === user.id);
      const shifts = userShift.map((shift) => {
        const shiftModel = shiftsModel.find((model) => model.id === shift.shift_id);
        return {
          name: shiftModel?.name || '',
          startTime: shift.startTime,
          endTime: shift.endTime,
          color: shiftModel?.color || ''
        };
      });
      return {
        userId: user.id,
        userName: user.name,
        shifts
      };
    });
  });

  const handleOpenModal = (blockData: ShiftColorBlockType, userIndex: number, shiftIndex: number, editing: boolean) => {
    setCurrentBlock(blockData);
    setCurrentBlockIndex({ userIndex, shiftIndex });
    setIsEditing(editing);
    setIsModalOpen(true);
  };

  const handleSave = (data: ShiftColorBlockType) => {
    if (currentBlockIndex !== null) {
      const newBlocks = [...combinedData];
      newBlocks[currentBlockIndex.userIndex].shifts[currentBlockIndex.shiftIndex] = data;
      setCombinedData(newBlocks);
    }
    setIsModalOpen(false);
  };

  const handleAddShift = (startTime: string, userIndex: number) => {
    const newShift: ShiftColorBlockType = {
      name: '',
      startTime,
      endTime: '',
      color: ''
    };
    setCurrentBlock(newShift);
    setCurrentBlockIndex({ userIndex, shiftIndex: -1 }); // 新しいシフトの場合は shiftIndex を -1 に設定
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleAddShiftSave = (data: ShiftColorBlockType) => {
    if (currentBlockIndex !== null) {
      const newBlocks = [...combinedData];
      if (currentBlockIndex.shiftIndex === -1) {
        newBlocks[currentBlockIndex.userIndex].shifts.push(data);
      } else {
        newBlocks[currentBlockIndex.userIndex].shifts[currentBlockIndex.shiftIndex] = data;
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
      <ShiftTimeCell />
      {combinedData.map((user, userIndex) => (
        <div key={user.userId} className="flex items-center">
          <ShiftCell onAddShift={(startTime) => handleAddShift(startTime, userIndex)}>
            {user.shifts.map((block, shiftIndex) => {
              const { left, width } = calculateWidthAndLeft(block.startTime, block.endTime);
              return (
                <ShiftColorBlock
                  key={shiftIndex}
                  width={width}
                  left={left}
                  color={block.color}
                  name={block.name}
                  startTime={block.startTime}
                  endTime={block.endTime}
                  onOpenModal={(blockData) => handleOpenModal(blockData, userIndex, shiftIndex, true)}
                />
              );
            })}
          </ShiftCell>
        </div>
      ))}
      {isModalOpen && (
        <>
          <ShiftModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            data={currentBlock}
            onSave={isEditing ? handleSave : handleAddShiftSave}
            isEditing={isEditing}
          />
        </>
      )}
    </div>
  );
};

export default ShiftRaw;
