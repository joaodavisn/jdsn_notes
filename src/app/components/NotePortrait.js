import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function NotePortrait({ title, content, color, dateTime, onClick }) {

    const maxContentLength = 40;
    const truncatedContent = content.length > maxContentLength ? `${content.substring(0, maxContentLength)}...` : content;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className={`rounded-t-2xl w-56 items-center justify-end flex flex-row h-9 relative p-2`} style={{ backgroundColor: color }}>
                <button className="bg-transparent border-[2px] border-[#F1F1F1] rounded-full w-6 h-6 flex flex-col justify-center items-center content-center">
                    <FontAwesomeIcon icon={faEllipsis} className="text-[#F1F1F1] text-xl" />
                </button>
            </div>
            <div className="rounded-b-2xl bg-[#2B2B2B] w-56 h-40 relative px-3 py-4 flex flex-col justify-between cursor-pointer" onClick={onClick}>
                <div className="flex flex-col gap-2 max-h-full max-w-full">
                    <p className="title text-[#F1F1F1] text-left text-xl font-bold truncate">{title}</p>
                    <p className="content text-[#B9B9B9] text-left text-lg font-normal w-48 break-words">{truncatedContent}</p>
                </div>
                <p className="text-[#686868] text-left text-sm font-normal">{dateTime}</p>
            </div>
        </div>
    );
}
