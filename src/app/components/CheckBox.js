export default function CheckBox({ onCheck, checked, label }) {
    return (
        <label className="flex items-center gap-3 justify-start" htmlFor="checkbox">
            <div className="round">
                <input type="checkbox" id="checkbox" onChange={onCheck} checked={checked} />
                <label htmlFor="checkbox"></label>
            </div>
            <p className="text-[#F1F1F1] text-left text-md font-normal cursor-pointer">{label}</p>
        </label>
    );
}
