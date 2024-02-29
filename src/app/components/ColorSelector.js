import React from 'react';
import ColorKnob from './ColorKnob';

export default function ColorSelector({ colors, selectedColor, onColorSelect }) {

    return (
        <div className="flex flex-row items-center justify-start gap-2">
            {colors.map((color) => {
                return (
                    <ColorKnob color={color} key={color.id} selected={selectedColor === color.color} onClick={() => onColorSelect(color)} />
                )
            })}
        </div>
    )
}
