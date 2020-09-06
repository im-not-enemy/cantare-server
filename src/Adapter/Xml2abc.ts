import fs from 'fs'
import path from 'path'

export default class xml2abc {
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
        cmd.execSync(`python ./bin/xml2abc/xml2abc.py ${input} -o ${output}`)
        return this.isExist(`${output}/${path.parse(input).name}.abc`)
    }
}