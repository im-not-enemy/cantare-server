export default class Letter {
    constructor(private str:string){}
    public type(){
        switch (true){
        //長さ・リズム
            case /[0-9]/.test(this.str):
                return 'NoteLength'
                break
            case this.str === '>':
                return 'BrokenRhythm'
                break
            case this.str === '-':
                return 'Tie'
                break
            case this.str === '(':
                return 'Bracket'
                break
        //高さ
            case this.str === '^':
            case this.str === '_':
                return 'Accidental'
                break
            case this.str === '\'':
            case this.str === ',':
                return 'Octave'
                break
            case /\w/.test(this.str):
                return 'Pitch'
                break
            //その他
            default:
                return 'Unknown'
                break
        }
    }
}