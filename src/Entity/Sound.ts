import {Note,midi} from 'tonal'
const abc = require('tonal-abc-notation')

export default class Sound {
    constructor(public src:string){}
    public transpose(seminotes:number):string|void{
        const before = midi(abc.toNote(this.src))
        if (before !== null){
            const note = Note.fromMidi(before + seminotes)
            return abc.toAbc(note)
        }
    }
}