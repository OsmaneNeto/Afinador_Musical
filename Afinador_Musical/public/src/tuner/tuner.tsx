// tuner.tsx
import '../tuner/tuner.css';
import React from "react";

const NOTE_FREQUENCIES: { [note: string]: number } = {
    C: 261.63, "C#": 277.18, D: 293.66, "D#": 311.13,
    E: 329.63, F: 349.23, "F#": 369.99, G: 392.00,
    "G#": 415.30, A: 440.00, "A#": 466.16, B: 493.88,
};

const getClosestNote = (frequency: number): string => {
    let closestNote = "";
    let closestDifference = Infinity;

    for (const [note, freq] of Object.entries(NOTE_FREQUENCIES)) {
        const diff = Math.abs(freq - frequency);
        if (diff < closestDifference) {
            closestDifference = diff;
            closestNote = note;
        }
    }

    return closestNote;
};

interface TunerProps {
    frequencia: number;
    title: string;
}

export function Tuner({ frequencia, title }: TunerProps) {
    const note = frequencia > 0 ? getClosestNote(frequencia) : "Nenhuma nota detectada";

    return (
        <div className="tuner">
            <h2>{frequencia > 0 ? `${frequencia.toFixed(2)} Hz` : "Aguardando microfone..."}</h2>
            <h2>{title}</h2>
            <h3>Nota: {note}</h3>
        </div>
    );
}
