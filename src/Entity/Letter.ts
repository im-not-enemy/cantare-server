export default class Letter {
    public type:string = ""
    constructor(private str:string){
        this.load()
    }
    private load(){
        switch (true){
        //長さ・リズム
            case /[0-9]/.test(this.str):
                this.type = 'NoteLength'
                break
            case this.str === '>':
                this.type = 'BrokenRhythm'
                break
            case this.str === '-':
                this.type = 'Tie'
                break
            case this.str === '(':
                this.type = 'Bracket'
                break
        //高さ
            case this.str === '^':
            case this.str === '_':
                this.type = 'Accidental'
                break
            case this.str === '\'':
            case this.str === ',':
                this.type = 'Octave'
                break
            case /\w/.test(this.str):
                this.type = 'Pitch'
                break
            //その他
            default:
                this.type = 'Unknown'
                break
        }
    }
}