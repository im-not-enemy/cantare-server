import tonalKey from '@tonaljs/key'

export default class Key {
    public signatures = new Array
    public signatureType:string = ""
    public type:string
    public tonic:string
    public keyString:string
    private scale = new Array
    private tonalObj:any

    constructor(keyString:string){
        this.keyString = keyString
        this.tonalObj = RegExp(/.*m$/).test(keyString)
            ? tonalKey.minorKey(keyString.replace('m',''))
            : tonalKey.majorKey(keyString)

        this.type = this.tonalObj.type
        this.tonic = this.tonalObj.tonic
        this.scale = this.tonalObj.scale

        if (this.type === 'major'){
            this.scale.forEach((el:string)=>{
                if (RegExp(/.*#$/).test(el)){
                    this.signatures.push(el.replace('#',''))
                    this.signatureType = "sharp"
                }
                else if (RegExp(/.*b$/).test(el)){
                    this.signatures.push(el.replace('b',''))
                    this.signatureType = "flat"
                }
            })
        }
        else if (this.type === 'minor'){
            this.tonalObj.natural.scale.forEach((el:string)=>{
                if (RegExp(/.*b$/).test(el)){
                    this.signatures.push(el.replace('b',''))
                    this.signatureType = "flat"
                }
                else if (RegExp(/.*#$/).test(el)){
                    this.signatures.push(el.replace('#',''))
                    this.signatureType = "sharp"
                }
            })
        }
    }
}