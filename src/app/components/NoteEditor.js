import 'draft-js/dist/Draft.css';
import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import RichTextOptions from './RichTextOptions';

const styleMap = {
    'TITLE': {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    'CONTENT': {
        fontSize: '14px',
        fontWeight: 'normal',
    },
};

function NoteEditor() {

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handleEditorChange = (state) => {
        setEditorState(state);
    };

    const [textType, setTextType] = useState("title");

    const updateText = (type) => {
        setTextType(type);
        const selection = editorState.getSelection();
        let nextContentState = Modifier.removeInlineStyle(
            editorState.getCurrentContent(),
            selection,
            'TITLE'
        );
        nextContentState = Modifier.removeInlineStyle(
            nextContentState,
            selection,
            'CONTENT'
        );
        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );
        const currentStyle = editorState.getCurrentInlineStyle();
        if (type === 'title') {
            nextEditorState = currentStyle.reduce((state, style) => {
                return RichUtils.toggleInlineStyle(state, style);
            }, nextEditorState);
            setEditorState(RichUtils.toggleInlineStyle(nextEditorState, 'TITLE'));
        } else {
            nextEditorState = currentStyle.reduce((state, style) => {
                return RichUtils.toggleInlineStyle(state, style);
            }, nextEditorState);
            setEditorState(RichUtils.toggleInlineStyle(nextEditorState, 'CONTENT'));
        }
    }

    return (
        <div className="h-full w-full">
            <div>
                <Editor
                    customStyleMap={styleMap}
                    editorState={editorState}
                    onChange={handleEditorChange}
                />
            </div>
            <div className="flex flex-row items-center justify-start gap-4 w-full px-5">
                <RichTextOptions currentType={textType} onClickTitle={() => updateText("title")} onClickBody={() => updateText("content")} />
            </div>
        </div>
    );
}

export default NoteEditor;
