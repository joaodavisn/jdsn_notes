'use client'

import React, { useState } from "react";

export default function GenerateKey() {
    const [key, setKey] = useState("");

    const generateKey = () => {
        const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        setKey("sk_" + key);
    }

    return (
        <div>
            <button className="bg-black text-white p-4" onClick={()=>{generateKey()}}>Generate key</button>
            <input type="text" placeholder="Your key" value={key} />
        </div>
    );
}