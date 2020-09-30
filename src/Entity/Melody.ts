import Letter from './Letter'

export default class Melody {
    private melodyArray = new Array()
    constructor(private melodyString:string){
        this.separate()
    }

    private separate(){
        const type = new Array()
        let temp = ""

        this.melodyString.split('').forEach((str)=>{
            const letter = new Letter(str)
            const tail = type[type.length-1]
            if (letter.isRelatedToPitch){
                switch (letter.type){
                    case 'Accidental':
                        if (tail === 'Pitch' || tail === 'Octave'){
                            // コミットして初期化
                            this.melodyArray.push(temp)
                            type.splice(0)
                            temp = ""
                        }
                        type.push('Accidental')
                        temp = temp + letter.toString()
                        break
                    case 'Pitch':
                        if (tail === 'Pitch' || tail === 'Octave'){
                            // コミットして初期化
                            this.melodyArray.push(temp)
                            type.splice(0)
                            temp = ""
                        }
                        type.push('Pitch')
                        temp = temp + letter.toString()
                        break
                    case 'Octave':
                        type.push('Octave')
                        temp = temp + letter.toString()
                        break
                }
            }
            else {
                // コミットして初期化
                if (temp.length > 0){
                    this.melodyArray.push(temp)
                    type.splice(0)
                    temp = ""
                }
                this.melodyArray.push(letter.toString())
            }
        })
    }
    public toArray(){
        return this.melodyArray
    }
    public toString(){
        return this.melodyString
    }
}
