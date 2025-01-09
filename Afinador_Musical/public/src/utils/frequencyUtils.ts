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
