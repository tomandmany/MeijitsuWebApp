// パス: /components/WorkBlock.tsx
'use client';

import { useContext, useEffect, useState } from "react";
import WorkContext from "../context/WorkContext";

type WorkBlockProps = {
    width: number;
    left: number;
    startTime: string;
    endTime: string;
    workModelId: string;
    memberId: string;
    isTime?: boolean;
};

export default function WorkBlock({ width, left, startTime, endTime, workModelId, memberId }: WorkBlockProps) {
    const workContext = useContext(WorkContext);

    if (!workContext) {
        throw new Error('WorkBlock must be used within a WorkProvider');
    }

    const { workModels, handleOpenModal } = workContext;
    const [currentTheme, setCurrentTheme] = useState<string | null>(null);

    useEffect(() => {
        const htmlElement = document.querySelector('html');
        const updateTheme = () => {
            const htmlClass = htmlElement?.className || null;
            setCurrentTheme(htmlClass);
        };

        const observer = new MutationObserver(updateTheme);
        if (htmlElement) {
            observer.observe(htmlElement, { attributes: true, attributeFilter: ['class'] });
        }

        // 初回実行
        updateTheme();

        return () => {
            if (htmlElement) {
                observer.disconnect();
            }
        };
    }, []);

    const currentWorkModel = workModels.find((workModel) => workModel.id === workModelId);
    const name = currentWorkModel?.name || "";

    let bgColor;
    if (name === "役員会") {
        bgColor = currentTheme === "dark" ? "white" : "black";
    } else {
        bgColor = currentWorkModel?.color || "gray";
    }

    const nameTextColor = name === "役員会" ? (currentTheme === "dark" ? "text-black" : "text-white") : "text-white";

    return (
        <button
            type="button"
            className={`absolute h-16 flex justify-center items-center text-center cursor-pointer ${nameTextColor}`}
            style={{ width: `calc(${width}rem - 1px)`, left: `${left}rem`, backgroundColor: bgColor }}
            onClick={() => handleOpenModal()}
        >
            {name}
        </button>
    );
}
