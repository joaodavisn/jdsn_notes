export default function RichTextOptions({ onClickTitle, onClickBody, currentType }) {
    return (
        <div className="flex flex-row items-center justify-start gap-2">
            <button
                onClick={onClickTitle}
                className={`font-bold text-xl text-[#F1F1F1] bg-transparent ring-1 ring-[#00A3FF] rounded-full h-8 px-6`}
                style={{
                    backgroundColor: currentType === "title" ? "#00A3FF" : "transparent",
                    hover: { backgroundColor: "#0082CB" }
                }}
            >
                Título
            </button>
            <button
                onClick={onClickBody}
                className={`font-normal text-md text-[#F1F1F1] bg-transparent ring-1 ring-[#00A3FF] rounded-full h-8 px-6`}
                style={{
                    backgroundColor: currentType === "content" ? "#00A3FF" : "transparent",
                    hover: { backgroundColor: "#0082CB" }
                }}
            >
                Corpo
            </button>
        </div>
    )
}