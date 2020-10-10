import Key from './Key'
import Melody from './Melody'

export default class Song {
    private src:string = ""
    public title:string =""
    public meter:string = ""
    public unitNoteLength:string = ""
    public key:Key = new Key('')
    public melody:Melody = new Melody('',this.key)

    constructor(private abc:string){
        this.src = abc
        this.src.split('\n').forEach((row)=>{
            switch (true) {
                case /^T:.*/.test(row):
                    this.title = row.substr(2,row.length)
                    break
                case /^M:.*/.test(row):
                    this.meter = row.substr(2,row.length)
                    break
                case /^L:.*/.test(row):
                    this.unitNoteLength = row.substr(2,row.length)
                    break
                case /^K:.*/.test(row):
                    this.key = new Key(row.substr(2,row.length))
                    break
                case /.*\|\|$/.test(row):
                    this.melody = new Melody(row,this.key)
                    break
            }
        })
    }
    public transpose(keyString:string){
        this.key = new Key(keyString)
        this.melody.transpose(this.key)
        return this
    }
    public toString(){
        return `T:${this.title}\nM:${this.meter}\nL:${this.unitNoteLength}\nK:${this.key.keyString}\n${this.melody.toString()}`
    }
}