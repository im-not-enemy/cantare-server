import tonalKey from '@tonaljs/key'

export default class Key {
    public signatures = new Array
    public type:string
    public tonic:string
    private scale = new Array
    private tonalObj:any

    constructor(keyString:string){
        this.tonalObj = RegExp(/.*m$/).test(keyString)
            ? tonalKey.minorKey(keyString.replace('m',''))
            : tonalKey.majorKey(keyString)

        this.type = this.tonalObj.type
        this.tonic = this.tonalObj.tonic
        this.scale = this.tonalObj.scale

        if (this.type === 'major'){
            this.scale.forEach((el:string)=>{
                if (RegExp(/.*#$/).test(el)) this.signatures.push(el.replace('#',''))
            })
        }
        else if (this.type === 'minor'){
            this.tonalObj.natural.scale.forEach((el:string)=>{
                if (RegExp(/.*b$/).test(el)) this.signatures.push(el.replace('b',''))
            })
        }
    }
}