'use client'

import { set } from "draft-js/lib/DefaultDraftBlockRenderMap";
import ColorSelector from "../components/ColorSelector"
import NotePortrait from "../components/NotePortrait"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const placeholderColors = [
        {
            id: 0,
            color: "#E1BC3B",
            name: "Ouro"
        },
        {
            id: 1,
            color: "#A9E42A",
            name: "Oliva"
        },
        {
            id: 2,
            color: "#E1773B",
            name: "Laranja"
        },
        {
            id: 3,
            color: "#DE5072",
            name: "Flamingo"
        },
        {
            id: 4,
            color: "#59A0F3",
            name: "Céu"
        },
    ];

    const [placeholderNotes, setPlaceholderNotes] = useState([
        {
            id: 0,
            title: "Nota 1",
            content: "Conteúdo da nota 1, por enqanto",
            color: 1,
            dateTime: "01/01/2021 11:32:00",
            lastModified: "01/01/2021 11:32:00"
        },
        {
            id: 1,
            title: "Nota 2 tem um titulo maior",
            content: "Conteúdo da nota 1 vai alem dos limites da nota? eh o que veremos. Realmente n sei.",
            color: 2,
            dateTime: "01/01/2021 11:32:00",
            lastModified: "01/01/2021 11:32:00"

        }
    ])

    const [selectedColor, setSelectedColor] = useState(placeholderColors[0].color);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        console.log(color);
    };


    // const [textType, setTextType] = useState("title");

    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);


    const openNote = (noteId) => {
        setNoteTitle(placeholderNotes[noteId].title);
        setNoteContent(placeholderNotes[noteId].content);
        setSelectedColor(placeholderColors[placeholderNotes[noteId].color].color);
        setIsEditing(true);
    }

    const createNote = () => {
        let newNotes = placeholderNotes;
        newNotes.push({
            id: newNotes.length,
            title: noteTitle,
            content: noteContent,
            color: selectedColor,
            dateTime: new Date().toLocaleString(),
            lastModified: new Date().toLocaleString()
        });
        setPlaceholderNotes(newNotes);
    }

    const updateNote = (noteId, content, color) => {
        let newNotes = placeholderNotes;
        newNotes[noteId].content = content;
        newNotes[noteId].color = color;
        newNotes[noteId].lastModified = new Date().toLocaleString();
        setPlaceholderNotes(newNotes);
    }

    const saveNote = () => {
        if (isEditing) {
            updateNote();
        } else {
            createNote();
        }
    }

    const newNote = () => {
        setNoteTitle("");
        setNoteContent("");
        setSelectedColor(placeholderColors[0].color);
    }

    const deleteNote = (noteId) => {
        let newNotes = placeholderNotes;
        newNotes.splice(noteId, 1);
        setPlaceholderNotes(newNotes);
    }

    return (
        <main className="flex w-screen h-screen min-h-screen flex-row items-center justify-center content-center px-36 py-12 gap-4 bg-[#1C1C1C]">
            <section className="flex flex-col items-center justify-start h-full gap-4 px-12">
                <p className="text-[#F1F1F1] text-left text-3xl font-bold">Suas notas</p>
                <div className="flex flex-col items-center justify-center gap-4">
                    {placeholderNotes.map((note) => {
                        return (
                            <NotePortrait key={note.id} title={note.title} content={note.content} color={placeholderColors[note.color].color} dateTime={note.dateTime} onClick={() => openNote(note.id)} />
                        )
                    }
                    )}
                </div>
                <button className="justify-center bg-[#00A3FF] hover:bg-[#0082CB] text-[#F1F1F1] text-sm font-bold rounded-full w-full py-2 items-center flex flex-row gap-2" onClick={()=>{newNote()}}>
                    Nova nota
                    <span className="ring-[1.5px] w-4 h-4 rounded-full ring-[#F1F1F1] flex justify-center items-center content-center"><FontAwesomeIcon icon={faPlus} className="text-[#F1F1F1] text-xs" /></span>
                </button>
            </section>
            <div className="h-[90vh] w-1 verticalBorder"></div>
            <section className="flex flex-col items-start justify-start gap-4 px-12 h-full w-full">
                <p className="text-[#F1F1F1] text-left text-3xl font-bold">Editor</p>
                <div className="flex flex-col items-start bg-[#2B2B2B] rounded-2xl gap-4 h-full w-full">
                    <div className="px-3 py-3 h-full w-full">
                        <input className="w-full h-12 bg-transparent text-[#F1F1F1] text-left rounded-2xl text-3xl font-bold p-4" onChange={(e) => setNoteTitle(e.target.value)} value={noteTitle} placeholder="Título da nota" />
                        <textarea className="w-full h-full resize-none bg-transparent text-[#F1F1F1] text-left rounded-2xl text-xl font-normal p-4"
                            placeholder="Digite sua nota aqui..." value={noteContent} onChange={(e) => setNoteContent(e.target.value)}>
                            {noteContent}
                        </textarea>
                    </div>
                    <hr className="w-full border-[#313131] border-1" />
                    <div className="flex flex-row items-center justify-between w-full px-5 pb-5">
                        <ColorSelector colors={placeholderColors} selectedColor={selectedColor} onColorSelect={handleColorSelect} />
                        <button className="bg-[#00A3FF] hover:bg-[#0082CB] text-[#F1F1F1] text-sm font-bold rounded-full px-6 py-2 flex items-center justify-center content-center gap-2"
                            onclick={() => { saveNote(noteContent, selectedColor) }}>Salvar<FontAwesomeIcon icon={faFloppyDisk} /></button>
                    </div>
                </div>
            </section>
        </main>
    )
}