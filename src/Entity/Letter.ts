import iLetter from './interfaces/iLetter'

export default class Letter implements iLetter{
    public type:string = ""
    public isRelatedToPitch = false
    public isRelatedToLength = false

    constructor(private str:string){
        this.load()
    }
    private load(){
        switch (true){
        //長さ・リズム
            case /[0-9]/.test(this.str):
                this.type = 'NoteLength'
                this.isRelatedToLength = true
                break
            case this.str === '>':
                this.type = 'BrokenRhythm'
                this.isRelatedToLength = true
                break
            case this.str === '-':
                this.type = 'Tie'
                this.isRelatedToLength = true
                break
            case this.str === '(':
                this.type = 'Bracket'
                this.isRelatedToLength = true
                break
            case this.str === '|':
                this.type = 'BarLine'
                this.isRelatedToLength = true
                break
            case this.str === ' ':
                this.type = 'WhiteSpace'
                this.isRelatedToLength = true
                break
        //高さ
            case this.str === '^':
            case this.str === '=':
            case this.str === '_':
                this.type = 'Accidental'
                this.isRelatedToPitch = true
                break
            case this.str === '\'':
            case this.str === ',':
                this.type = 'Octave'
                this.isRelatedToPitch = true
                break
            case /\w/.test(this.str):
                this.type = 'Pitch'
                this.isRelatedToPitch = true
                break
            //その他
            default:
                this.type = 'Unknown'
                break
        }
    }
    public toString(){
        return this.str
    }
}