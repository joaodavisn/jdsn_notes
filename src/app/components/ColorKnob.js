import React, { useState, useEffect } from 'react';

export default function ColorKnob({ color, onClick, selected }) {
    const [showTooltip, setShowTooltip] = useState(false);
    let timeout;

    const handleMouseEnter = () => {
        timeout = setTimeout(() => {
            setShowTooltip(true);
        }, 1000);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeout);
        setShowTooltip(false);
    };

    const handleClick = () => {
        onClick();
        handleMouseLeave();
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative">
            <div
                style={{
                    backgroundColor: color.color,
                }}
                className={`rounded-full hover:translate-y-[-3px] translate-y-0 ease-in-out duration-[50ms] w-8 h-8 cursor-pointer 
            ${selected ? 'border-2 border-[#F1F1F1]' : ''}`}
                onClick={handleClick}
            >
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 ring-1 ring-[#F1F1F1] bg-[#2B2B2B] rounded-full px-2 text-[#F1F1F1] text-xs opacity-0 transition-opacity duration-100 ease-in-out"
                    style={{ opacity: showTooltip ? 1 : 0 }}
                >
                    {color.name}
                    <svg className="absolute top-[12px] right-[40%]" width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4 8L7 5" stroke="#F1F1F1" strokeLinecap="square" />
                        <circle cx="4" cy="3" r="3" fill="#2A2A2A" />
                    </svg>
                </div>
            </div>
        </div>
    );
}