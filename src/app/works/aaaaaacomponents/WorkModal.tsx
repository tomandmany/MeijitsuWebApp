// パス: /components/WorkModal.tsx
'use client';

import { useState, useEffect } from 'react';
import Select, { StylesConfig, GroupBase, SingleValue } from 'react-select';
import { useTheme } from 'next-themes';
import createMemberWork from '@/actions/memberWorks/createMemberWork';
import { getWorkModels } from '@/data/workModels';

type WorkModalProps = {
    isOpen: boolean;
    onClose: () => void;
    data: WorkBlock & { memberId: string }; // memberIdを追加
    onSave: (data: WorkBlock) => void;
    isEditing: boolean;
};

const generateTimeOptions = (startHour: number, endHour: number, interval: number) => {
    const options = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
            if (hour !== 22) {
                const time = `${hour}:${minute.toString().padStart(2, '0')}`;
                options.push({ value: time, label: time });
            } else {
                const time = `${hour}:${minute.toString().padStart(2, '0')}`;
                options.push({ value: time, label: time });
                break;
            }
        }
    }
    return options;
};

const startOptions = generateTimeOptions(7, 21, 15); // 7:00〜21:45
const endOptions = generateTimeOptions(7, 22, 15); // 7:15〜22:00

const WorkModal = ({ isOpen, onClose, data, onSave, isEditing }: WorkModalProps) => {
    const { theme } = useTheme();
    const [name, setName] = useState<SingleValue<{ value: string, label: string, id: string, color: string }> | null>(null);
    const [startTime, setStartTime] = useState<SingleValue<{ value: string, label: string }> | null>(null);
    const [endTime, setEndTime] = useState<SingleValue<{ value: string, label: string }> | null>(null);
    const [workModels, setWorkModels] = useState<{ value: string, label: string, color: string, id: string }[]>([]);

    useEffect(() => {
        const fetchWorkModels = async () => {
            const workModelsData = await getWorkModels();
            const options = workModelsData.map((workModel: any) => ({
                value: workModel.name,
                label: workModel.name,
                color: workModel.color,
                id: workModel.id
            }));
            setWorkModels(options);
        };

        fetchWorkModels();
    }, []);

    useEffect(() => {
        const selectedWorkModel = workModels.find(option => option.value === data.name);
        setName(selectedWorkModel || null);
        setStartTime(isEditing ? { value: data.startTime, label: data.startTime } : { value: data.startTime, label: data.startTime });
        setEndTime(isEditing ? { value: data.endTime, label: data.endTime } : null);
    }, [data, isEditing, workModels]);

    const handleNameChange = (option: SingleValue<{ value: string, label: string, id: string, color: string }> | null) => {
        setName(option);
    };

    const handleSubmit = async () => {
        if (!name || !startTime || !endTime) return;

        const workModelId = name?.id || '';
        const memberId = data.memberId || '';

        console.log('workModelId:', workModelId);
        console.log('memberId:', memberId);

        if (!workModelId || !memberId) {
            console.error('Invalid workModelId or memberId');
            return;
        }

        const formData = new FormData();
        formData.append('startTime', startTime.value);
        formData.append('endTime', endTime.value);
        formData.append('workModelId', workModelId);
        formData.append('memberId', memberId);

        const response = await createMemberWork(formData);

        if (response.success && response.data) {
            onSave({
                name: name.value,
                startTime: startTime.value,
                endTime: endTime.value,
                color: name.color, // color を保持
                workModelId: workModelId,
                memberId: memberId
            });
            onClose();
        } else {
            console.error('Error saving member work:', response.error);
        }
    };

    const filteredEndOptions = endOptions.filter(option => {
        if (!startTime) return false;
        const [startHour, startMinute] = startTime.value.split(':').map(Number);
        const [endHour, endMinute] = option.value.split(':').map(Number);
        return endHour > startHour || (endHour === startHour && endMinute > startMinute);
    });

    if (!isOpen) return null;

    const customStyles: StylesConfig<any, false, GroupBase<any>> = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            borderColor: theme === 'dark' ? '#444' : '#ccc',
            boxShadow: state.isFocused ? (theme === 'dark' ? '0 0 0 1px #555' : '0 0 0 1px #aaa') : provided.boxShadow,
            '&:hover': {
                borderColor: state.isFocused ? (theme === 'dark' ? '#555' : '#aaa') : (theme === 'dark' ? '#444' : '#ccc'),
                cursor: 'pointer',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? '#333' : '#fff',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? (theme === 'dark' ? '#444' : '#ddd')
                : (theme === 'dark' ? '#333' : '#fff'),
            color: theme === 'dark' ? '#fff' : '#000',
            '&:hover': {
                backgroundColor: theme === 'dark' ? '#555' : '#eee',
                cursor: 'pointer',
            },
            opacity: !startTime ? 0.5 : 1, // Disabled state visual indication
        }),
        singleValue: (provided) => ({
            ...provided,
            color: theme === 'dark' ? '#fff' : '#000',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: theme === 'dark' ? '#aaa' : '#555',
            '&:hover': {
                color: theme === 'dark' ? '#ccc' : '#777',
                cursor: 'pointer',
            },
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? '#444' : '#ccc',
        }),
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-[9999]">
            <div className="fixed inset-0 bg-black/50 cursor-pointer z-[9998] modal-overlay" onClick={onClose}></div>
            <div className="bg-white dark:bg-gray-800 p-4 min-w-96 rounded shadow-lg z-[10000]" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl mb-4 text-center text-black dark:text-white">シフト詳細</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-black dark:text-white">シフト名</label>
                    <Select
                        styles={customStyles}
                        options={workModels}
                        value={name}
                        onChange={handleNameChange}
                        menuPlacement="auto"
                        placeholder="選択してください"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-black dark:text-white">開始時間</label>
                    <Select
                        styles={customStyles}
                        options={startOptions}
                        value={startTime}
                        onChange={(option) => {
                            setStartTime(option);
                            if (startTime && endTime) {
                                if (endTime.value <= option!.value) {
                                    setEndTime(null);
                                }
                            }
                        }}
                        menuPlacement="auto"
                        placeholder="選択してください"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-black dark:text-white">終了時間</label>
                    <Select
                        styles={customStyles}
                        options={filteredEndOptions}
                        value={endTime}
                        onChange={(option) => setEndTime(option)}
                        menuPlacement="auto"
                        isDisabled={!startTime}
                        placeholder="選択してください"
                    />
                </div>
                <div className="flex justify-end">
                    <button className="bg-gray-500 text-white px-4 py-2 mr-2" onClick={onClose}>戻る</button>
                    <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSubmit}>保存する</button>
                </div>
            </div>
        </div>
    );
};

export default WorkModal;
