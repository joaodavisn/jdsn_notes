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

    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteId, setNoteId] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    
    const [userId, setUserId] = useState("1");
    const [apiKey, setApiKey] = useState("sk_ds1tq81ibzsyffr8lx6h3e");

    const openNote = (id, noteId) => {
        if (notes[id]) {
            console.log("Opening note with ID", noteId);
            setNoteTitle(notes[id].title || "");
            setNoteContent(notes[id].content || "");
            setNoteId(noteId);
            setSelectedColor(colors[notes[id].color]);
            setIsEditing(true);
        } else {
            console.error(`Note with ID ${id} not found in the notes array.`);
        }
    }

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    }

    const updateNote = async () => {
        try {
            const colorId = selectedColor.id; 
            const colorValue = selectedColor.color;
    
            const response = await fetch(`https://api.joaodavisn.com/api.php/updateNote?apikey=${apiKey}&user=${userId}&id=${noteId}&title=${encodeURIComponent(noteTitle)}&content=${encodeURIComponent(noteContent)}&color=${encodeURIComponent(colorId)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: noteTitle, content: noteContent, color: colorValue }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                // Do not update state directly, use a callback function to get the latest state
                setNotes(prevNotes => {
                    const newNotes = [...prevNotes];
                    newNotes[noteId] = {
                        ...newNotes[noteId],
                        content: noteContent,
                        color: colorValue,
                        lastModified: new Date().toLocaleString(),
                    };
                    return newNotes;
                });
            } else {
                console.error("API Error:", data.message);
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };


    const saveNote = () => {
        if (isEditing) {
            updateNote();
            setIsEditing(false);
            setNoteContent("");
            setNoteTitle("");
            setSelectedColor(colors[0]);
        } else {
            createNote();
            setIsEditing(false);
            setNoteContent("");
            setNoteTitle("");
            setSelectedColor(colors[0]);
        }
    }

    const newNote = () => {
        setNoteTitle("");
        setNoteContent("");
        setSelectedColor(colors[0]);
    }

    const deleteNote = (noteId) => {
        let newNotes = notes;
        newNotes.splice(noteId, 1);
        setNotes(newNotes);
    }


    const formatCreation = (date) => {
        const dateObj = new Date(date);
        if (dateObj && !isNaN(dateObj.getTime())) {
            const distance = formatDistanceToNow(dateObj, { locale: ptBR });
            return distance;
        } else {
            return "Date not available";
        }
    }
    
    const createNote = async () => {
        let newNote = {
            title: noteTitle,
            content: noteContent,
            color: selectedColor.id,
            creation: new Date(),
            lastModified: new Date()
        };
    
        try {
            const response = await fetch(`https://api.joaodavisn.com/api.php/createNote?apikey=${apiKey}&user=${userId}&title=${encodeURIComponent(noteTitle)}&content=${encodeURIComponent(noteContent)}&color=${encodeURIComponent(selectedColor.id)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: noteTitle, content: noteContent, color: selectedColor.id }),
            });
            console.log("Raw response:", response);
            const data = await response.json();
    
            if (data.success) {
                setNotes(prevNotes => prevNotes ? [newNote, ...prevNotes] : [newNote]);
                setShouldRenderNotes(true);
            } else {
                console.error("API Error:", data.message);
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    }

    const [shouldFetchNotes, setShouldFetchNotes] = useState(true);
    const [shouldRenderNotes, setShouldRenderNotes] = useState(true);

    const getNotes = () => {
        fetch("https://api.joaodavisn.com/api.php/getNotes?apikey=" + apiKey + "&user=" + userId, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setNotes(data);
                setShouldFetchNotes(false);
            })
            .catch(error => {
                console.error("API Error:", error);
            });
    }

    const noteListRender = () => {
        if (notes) {
            return notes.map((note, index) => (
                <NotePortrait
                    key={index}
                    title={note.title}
                    content={note.content}
                    color={colors[note.color]?.color}
                    dateTime={formatCreation(note.creation)}
                    onClick={() => openNote(index, note.id)}
                />
            ));

        } else {
            return (
                <div className="h-full w-56 p-2">
                    <div className="h-full w-full ring-1 ring-[#313131] rounded-2xl flex flex-col items-center justify-center gap-2 p-2">

                        <p className="text-[#F1F1F1] text-md text-center font-bold">Você ainda não tem nenhuma nota!</p>
                        <hr className="w-full border-[#313131] border-1" />
                        <p className="text-[#F1F1F1] text-sm text-center">Clique abaixo em "Nova nota" para criar uma nova nota!</p>
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        if (shouldFetchNotes) {
            getNotes();
        }
        if (shouldRenderNotes) {
            setShouldRenderNotes(false);
        }
    }, [shouldFetchNotes, shouldRenderNotes]);


    return (
        <main className="flex w-screen h-screen min-h-screen flex-row items-center justify-center content-center px-36 py-12 gap-4 bg-[#1C1C1C]">
            <section className="flex flex-col items-center justify-start h-full gap-4 px-12">
                <p className="text-[#F1F1F1] text-left text-3xl font-bold">Suas notas</p>
                <div className="flex flex-col items-center justify-center overflow-y-auto h-fit w-full overflow-x-hidden">
                    <div className="h-full flex flex-col gap-4 px-3">
                        {noteListRender()}
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
                        <textarea className="w-full h-full max-h-[95%] resize-none bg-transparent text-[#F1F1F1] text-left rounded-2xl text-xl font-normal p-4"
                            placeholder="Digite sua nota aqui..." value={noteContent} onChange={(e) => setNoteContent(e.target.value)}>
                            {noteContent}
                        </textarea>
                    </div>
                    <div className="flex flex-col h-fit w-full">
                        <hr className="w-full border-[#313131] border-1 mb-4" />
                        <div className="flex flex-row items-center justify-between w-full px-5 pb-5">
                            <ColorSelector colors={colors} selectedColor={selectedColor.color} onColorSelect={handleColorSelect} />
                            {noteContent.length > 0 || noteTitle.length > 0 ? (
                                <button className="bg-[#00A3FF] hover:bg-[#0082CB] text-[#F1F1F1] text-sm font-bold rounded-full px-6 py-2 flex items-center justify-center content-center gap-2"
                                    onClick={saveNote}>Salvar<FontAwesomeIcon icon={faFloppyDisk} /></button>
                            ) : <span className="h-9" />}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}