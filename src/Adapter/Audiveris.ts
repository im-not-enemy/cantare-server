import fs from 'fs'
import path from 'path'

export default class Audiveris {
    constructor(){}
    private isExist(file:string) {
        try {
            fs.statSync(file);
            return true
        } catch(err) {
            if(err.code === 'ENOENT') return false
        }
    }
    public execute(output:string,input:string){
        const cmd = require('child_process')
        const options = ['-batch','-export','-output',output,input]
        cmd.execFileSync('./bin/audiveris/bin/Audiveris',options)
        return this.isExist(`${output}/${path.parse(input).name}/${path.parse(input).name}.mxl`)
    }
}