import tonalKey from '@tonaljs/key'

export default class Key {
    public sharps = new Array
    public flats = new Array
    public obj:any
    constructor(public keyString:string){
        this.obj = RegExp(/.*m$/).test(keyString)
            ? tonalKey.minorKey(keyString.replace('m',''))
            : tonalKey.majorKey(keyString)

        if (this.obj.type === 'major'){
            this.obj.scale.forEach((el:string)=>{
                if (RegExp(/.*#$/).test(el)) this.sharps.push(el.replace('#',''))
            })
        }
        else if (this.obj.type === 'minor'){
            this.obj.natural.scale.forEach((el:string)=>{
                if (RegExp(/.*b$/).test(el)) this.flats.push(el.replace('b',''))
            })
        }
    }
}