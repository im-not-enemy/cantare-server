import Note from '@tonaljs/note'
import {toMidi} from '@tonaljs/midi'
import abc from '@tonaljs/abc-notation'

export default class Sound {
    constructor(public src:string){}
    public transpose(seminotes:number):string|void{
        const before = toMidi(abc.abcToScientificNotation(this.src))
        if (before !== null){
            const note = RegExp(/^\^/).test(this.src)
            ? Note.fromMidiSharps(before + seminotes)
            : Note.fromMidi(before + seminotes)

            return abc.scientificToAbcNotation(note)
        }
    }
}