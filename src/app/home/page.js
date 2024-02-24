'use client'

import { set } from "draft-js/lib/DefaultDraftBlockRenderMap";
import ColorSelector from "../components/ColorSelector"
import NotePortrait from "../components/NotePortrait"
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const colors = [
        {
            id: 0,
            color: "#E1BC3B",
            name: "Ouro"
        },
        {
            id: 1,
            color: "#92C821",
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

    const [notes, setNotes] = useState(null);

    const [selectedColor, setSelectedColor] = useState(colors[0].color);

    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [userId, setUserId] = useState("1");
    const [apiKey, setApiKey] = useState("sk_ds1tq81ibzsyffr8lx6h3e");

    const openNote = (id) => {

        if (notes[id]) {
            setNoteTitle(notes[id].title || "");
            setNoteContent(notes[id].content || "");
            setSelectedColor(colors[notes[id].color]?.color || colors[0].color);
            setIsEditing(true);
        } else {
            console.error(`Note with ID ${id} not found in the notes array.`);
        }
    }

    const createNote = () => {
        let newNote = {
            title: noteTitle,
            content: noteContent,
            color: selectedColor,
            creation: new Date().toLocaleString(),
            lastModified: new Date().toLocaleString()
        };
    
        fetch("https://api.joaodavisn.com/api.php/createNote/" + apiKey + "/" + userId + "/" + noteTitle + "/" + noteContent + "/" + selectedColor + "/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let newNotes = [...notes, newNote];
                setNotes(newNotes);
            } else {
                console.error("API Error:", data.message);
            }
        })
        .catch(error => {
            console.error("API Error:", error);
        });
    }
    

    const updateNote = (noteId, content, color) => {
        let newNotes = notes;
        newNotes[noteId].content = content;
        newNotes[noteId].color = color;
        newNotes[noteId].lastModified = new Date().toLocaleString();
        setNotes(newNotes);
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
        setSelectedColor(colors[0].color);
    }

    const deleteNote = (noteId) => {
        let newNotes = notes;
        newNotes.splice(noteId, 1);
        setNotes(newNotes);
    }

    const getNotes = () => {
        fetch("https://api.joaodavisn.com/api.php/getNotes/" + apiKey + "/" + userId, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setNotes(data);
            })
            .catch(error => {
                console.error("API Error:", error);
            });
    }

    const formatCreation = (date) => {
        const creation = parseISO(date);
        const distance = formatDistanceToNow(creation, { locale: ptBR });
        return distance;
    }

    useEffect(() => {
        getNotes();
    }, []);

    if (!notes) {
        return (
            <p>loading</p>
        )
    }

    return (
        <main className="flex w-screen h-screen min-h-screen flex-row items-center justify-center content-center px-36 py-12 gap-4 bg-[#1C1C1C]">
            <section className="flex flex-col items-center justify-start h-full gap-4 px-12">
                <p className="text-[#F1F1F1] text-left text-3xl font-bold">Suas notas</p>
                <div className="flex flex-col items-center justify-center overflow-y-auto h-fit w-full overflow-x-hidden">
                    <div className="h-full flex flex-col gap-4 px-3">
                        {notes?.map((note, index) => (
                            <NotePortrait
                                key={note.id}
                                title={note.title}
                                content={note.content}
                                color={colors[note.color]?.color || colors[0].color}
                                dateTime={formatCreation(note.creation)}
                                onClick={() => openNote(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full px-3">
                <button className="justify-center bg-[#00A3FF] hover:bg-[#0082CB] text-[#F1F1F1] text-sm font-bold rounded-full w-full py-2 items-center flex flex-row gap-2" onClick={() => { newNote() }}>
                    Nova nota
                    <span className="ring-[1.5px] w-4 h-4 rounded-full ring-[#F1F1F1] flex justify-center items-center content-center"><FontAwesomeIcon icon={faPlus} className="text-[#F1F1F1] text-xs" /></span>
                </button>
                </div>
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
                    <ColorSelector colors={colors} selectedColor={selectedColor} onColorSelect={setSelectedColor} />
                        {noteContent.length > 0 || noteTitle.length > 0 ? (
                            <button className="bg-[#00A3FF] hover:bg-[#0082CB] text-[#F1F1F1] text-sm font-bold rounded-full px-6 py-2 flex items-center justify-center content-center gap-2"
                            onClick={() => { saveNote() }}>Salvar<FontAwesomeIcon icon={faFloppyDisk} /></button>
                        ) : <span className="h-9"/>}
                    </div>
                </div>
            </section>
        </main>
    )
}