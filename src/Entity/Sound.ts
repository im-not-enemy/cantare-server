//概要: ABC記譜法の文字列
//仕様: transpose(semitones:number): 
//      半音上げ下げしたABC文字を返す
//      元の音が調号なしの場合: 調号なし or フラットの音を返す
//      元の音がシャープの場合: シャープを返す

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