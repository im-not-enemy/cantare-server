import Letter from './Letter'
import Sound from './Sound'
import Key from './Key'
import Interval from '@tonaljs/interval'

export default class Melody {
    private melodyArray = new Array()
    private key:Key
    private melodyString:string

    constructor(melodyString:string,key:Key){
        this.key = key
        this.melodyString = melodyString
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
                            this.melodyArray.push(new Sound(temp))
                            type.splice(0)
                            temp = ""
                        }
                        type.push('Accidental')
                        temp = temp + letter.toString()
                        break
                    case 'Pitch':
                        if (tail === 'Pitch' || tail === 'Octave'){
                            // コミットして初期化
                            this.melodyArray.push(new Sound(temp))
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
                    this.melodyArray.push(new Sound(temp))
                    type.splice(0)
                    temp = ""
                }
                this.melodyArray.push(letter.toString())
            }
        })
    }

    public transpose(newKey:Key){
        const distance = Interval.distance(this.key.tonic,newKey.tonic)
        const semitones = Interval.get(distance).semitones
        if (!semitones) throw Error

        const transposed = this.melodyArray.map(el =>{
            if (el instanceof Sound){
                el.transpose(semitones)

                if (RegExp(/^\^/).test(el.toStringOrigin())) return el.toString('sharp')
                else if (RegExp(/^\_/).test(el.toStringOrigin())) return el.toString('flat')
                else {
                    if (newKey.signatureType === 'sharp'){
                        if (newKey.signatures.includes(el.toString('sharp').replace('^',''))) return el.transpose(-1)
                    }
                    else if(newKey.signatureType === 'flat'){
                        if (newKey.signatures.includes(el.toString('flat').replace('_',''))) return el.transpose(1)
                    }
                    return el.toString()
                }
            }
            else {
                return el
            }
        })
        this.melodyArray = transposed
        return this
    }

    public toString(){
        const array = new Array()
        this.melodyArray.forEach((el)=>{
            if (el instanceof Sound){
                array.push(el.toString())
            } else {
                array.push(el)
            }
        })
        return array.join('')
    }
}