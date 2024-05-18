import { useState, useEffect } from 'react';
import Select, { StylesConfig, GroupBase, SingleValue } from 'react-select';
import { useTheme } from 'next-themes';
import { ShiftColorBlockType } from '@/types/shiftColorBlockType';

type ShiftModalProps = {
    isOpen: boolean;
    onClose: () => void;
    data: ShiftColorBlockType;
    onSave: (data: ShiftColorBlockType) => void;
};

const generateTimeOptions = (startHour: number, endHour: number, interval: number) => {
    const options = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
            const time = `${hour}:${minute.toString().padStart(2, '0')}`;
            options.push({ value: time, label: time });
        }
    }
    return options;
};

const shiftNameOptions = [
    { value: '役員会', label: '役員会' },
    { value: '朝礼', label: '朝礼' },
    { value: '会議', label: '会議' },
    { value: '研修', label: '研修' }
];

const shiftColorMapping: { [key: string]: string } = {
    '役員会': 'bg-black dark:bg-white',
    '朝礼': 'bg-red-600',
    '会議': 'bg-blue-600',
    '研修': 'bg-green-600'
};

const startOptions = generateTimeOptions(7, 21, 15); // 7:00〜21:45
const endOptions = generateTimeOptions(7, 21, 15).slice(1); // 7:15〜22:00

const ShiftModal = ({ isOpen, onClose, data, onSave }: ShiftModalProps) => {
    const { theme } = useTheme();
    const [name, setName] = useState<SingleValue<{ value: string, label: string }> | null>(null);
    const [startTime, setStartTime] = useState<SingleValue<{ value: string, label: string }> | null>(null);
    const [endTime, setEndTime] = useState<SingleValue<{ value: string, label: string }> | null>(null);
    const [color, setColor] = useState(data.color);

    useEffect(() => {
        setName(shiftNameOptions.find(option => option.value === data.name) || null);
        setStartTime({ value: data.startTime, label: data.startTime });
        setEndTime({ value: data.endTime, label: data.endTime });
        setColor(data.color);
    }, [data]);

    const handleNameChange = (option: SingleValue<{ value: string, label: string }> | null) => {
        setName(option);
        if (option) {
            setColor(shiftColorMapping[option.value]);
        }
    };

    const handleSubmit = () => {
        if (!name || !startTime || !endTime) return;

        onSave({
            name: name.value,
            startTime: startTime.value,
            endTime: endTime.value,
            color
        });
        onClose();
    };

    const filteredEndOptions = endOptions.filter(option => {
        if (!startTime) return true;
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
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg z-[10000]" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl mb-4 text-center text-black dark:text-white">シフト詳細</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-black dark:text-white">シフト名</label>
                    <Select
                        styles={customStyles}
                        options={shiftNameOptions}
                        value={name}
                        onChange={handleNameChange}
                        menuPlacement="auto"
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
                            setEndTime(null);
                        }}
                        menuPlacement="auto"
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

export default ShiftModal;
