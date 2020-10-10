import Note from '@tonaljs/note'
import {toMidi} from '@tonaljs/midi'
import Abc from '@tonaljs/abc-notation'

export default class Sound {
    private sharp:string = ""
    private flat:string = ""
    private none:string = ""
    private origin:string = ""

    constructor(src:string){
        this.origin = src
        if (RegExp(/^\^/).test(src)) this.sharp = src
        else if (RegExp(/^_/).test(src)) this.flat = src
        else this.none = src
    }
    private reset() {
        this.sharp = ""
        this.none = ""
        this.flat = ""
    }

    public transpose(seminotes:number):Sound{
        const before:{[key:string]:any} = {abc:"",midi:0}

        before.abc = this.none ?this.none :this.sharp ?this.sharp :this.flat
        before.midi = toMidi(Abc.abcToScientificNotation(before.abc))

        this.reset()
        const sharp = Note.fromMidiSharps(before.midi + seminotes)
        const flat = Note.fromMidi(before.midi + seminotes)

        if (sharp === flat){
            this.none = Abc.scientificToAbcNotation(sharp)
        }
        else {
            this.sharp = Abc.scientificToAbcNotation(sharp)
            this.flat = Abc.scientificToAbcNotation(flat)
        }
        return this
    }

    public toString(accidental?:string){
        let str:string = ""

        if (accidental === "sharp"){
            if (this.sharp !== "") str = this.sharp
            else if (this.flat !== "") str = this.flat
            else str = this.none
        } 
        else if (accidental === "flat"){
            if (this.flat !== "") str = this.flat
            else if (this.sharp !== "") str = this.sharp
            else str = this.none
        }
        else {
            if (this.flat !== "") str = this.flat
            else if (this.sharp !== "") str = this.sharp
            else str = this.none
        }
        return str
    }
    public toStringOrigin(){
        return this.origin
    }
}