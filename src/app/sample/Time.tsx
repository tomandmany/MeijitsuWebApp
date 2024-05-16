'use client'

import { useEffect, useRef } from 'react';

const Time = () => {
    const timeList = [
        { beforeColon: '10', afterColon: '00' },
        { beforeColon: '10', afterColon: '30' },
        { beforeColon: '11', afterColon: '00' },
        { beforeColon: '11', afterColon: '30' },
        { beforeColon: '12', afterColon: '00' },
        { beforeColon: '12', afterColon: '30' },
    ];

    const refs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        refs.current.forEach((textElement, index) => {
            if (textElement) {
                const colonElement = textElement.querySelector('.colon');
                if (colonElement) {
                    const rect = colonElement.getBoundingClientRect();
                    console.log(`Time ${index + 1} Colon (:) の x 座標:`, rect.left);
                }
            }
        });
    }, []);

    return (
        <div className='flex gap-4'>
            {timeList.map((time, index) => (
                <span
                    key={index}
                    ref={el => {
                        refs.current[index] = el;
                    }}
                >
                    {time.beforeColon}
                    <span className="colon">:</span>
                    {time.afterColon}
                </span>
            ))}
        </div>
    );
}

export default Time;
