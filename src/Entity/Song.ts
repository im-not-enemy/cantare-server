export default class Song {
    private src:string = ""
    public title:string =""
    public meter:string = ""
    public unitNoteLength:string = ""
    public key:string = ""
    public melody:string = ""

    constructor(private abc:string){
        this.load(abc)
    }
    private load(abc:string){
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
                    this.key = row.substr(2,row.length)
                    break
                case /.*\|\|$/.test(row):
                    this.melody = row
                    break
            }
        })
    }
    public toString(){
        return this.src
    }
}