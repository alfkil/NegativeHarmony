import { Chord } from "tonal"

class Note {
    index: number;
    alt: number;
    constructor(index: number, alt: number) {
        this.index = index;
        this.alt = alt;
    }
}

function NegateN(note: Note, key: Note) : Note {
    let neg: Note = new Note(0, 0);

    neg.index = 2*key.index + 1 - note.index;
    neg.index += 7;
    neg.index = (neg.index - 1) % 7 + 1;

    neg.alt = 2*key.alt - note.alt;

    if(note.index > 2*key.index)
        neg.alt--;
    if(note.index < 2*key.index - 6)
        neg.alt++;

    return neg;
}

const Notes = ["", "F", "C", "G", "D", "A", "E", "B"];

function NameToNote(name: string) : Note {
    let index = Notes.indexOf(name[0]);
    let alt = 0;
    for(let i = 1; i < name.length; i++) {
        if(name[i] == 'b')
            alt--;
        if(name[i] == '#')
            alt++;
    }
    return new Note(index, alt);
}

function NoteToName(tone: Note) : string {
    let result : string = Notes[tone.index];
    for (let i = 0; i < Math.abs(tone.alt); i++) {
        if(tone.alt < 0)
            result += "b";
        if(tone.alt > 0)
            result += "#";
    }
    return result;
}

function NegateC(name: string, key: string) : string {
    let keyNote = NameToNote(key);
    return NoteToName(NegateN(NameToNote(name), keyNote));
}

function NegateChord(chord: string, key: string) : string[] {
    let tones : string[] = Chord.notes(chord);
    let neg : string[] = [];

    for (let i = 0; i < tones.length; i++) {
        neg.push(NegateC(tones[i], key));
    }

    return neg;
}

////

NegateN(new Note(3, 1), new Note(6, 1));
console.log(NameToNote("F"));
console.log(NameToNote("Ab"));
console.log(NameToNote("Cb"));
console.log(NameToNote("Eb"));
console.log(NegateChord("Fm7b5", "Abb"));
