import tonalKey from '@tonaljs/key'

export default class Key {
    public sharps = new Array
    public flats = new Array
    public key:any
    constructor(public keyString:string){
        this.key = RegExp(/.*m$/).test(keyString)
            ? tonalKey.minorKey(keyString.replace('m',''))
            : tonalKey.majorKey(keyString)

        if (this.key.type === 'major'){
            this.key.scale.forEach((el:string)=>{
                if (RegExp(/.*#$/).test(el)) this.sharps.push(el.replace('#',''))
            })
        }
        else if (this.key.type === 'minor'){
            this.key.natural.scale.forEach((el:string)=>{
                if (RegExp(/.*b$/).test(el)) this.flats.push(el.replace('b',''))
            })
        }
    }
}