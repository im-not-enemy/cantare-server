//概要: ABC記譜法の文字列
//仕様: transpose(semitones:number): 
//      半音上げ下げしたABC文字を返す
//      元の音が調号なしの場合: 
//          priolityの指定なし: フラットを返す
//          priolityの指定あり: 指定された臨時記号で返す
//      元の音がシャープの場合: シャープを返す
//      元の音がフラットの場合: フラットを返す

import Note from '@tonaljs/note'
import {toMidi} from '@tonaljs/midi'
import abc from '@tonaljs/abc-notation'

export default class Sound {
    constructor(public src:string){}
    public transpose(seminotes:number,priolity?:string){
        const before = toMidi(abc.abcToScientificNotation(this.src))
        if (before !== null){
            let note
            if (RegExp(/^\^/).test(this.src)) note = Note.fromMidiSharps(before + seminotes)
            else if (RegExp(/^_/).test(this.src)) note = Note.fromMidi(before + seminotes)
            else if (priolity === 'sharp') note = Note.fromMidiSharps(before + seminotes)
            else note = Note.fromMidi(before + seminotes)
            this.src = abc.scientificToAbcNotation(note)
        }
        return this
    }
    public toString():string {
        return this.src
    }
}