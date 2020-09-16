import nedb from 'nedb'
import bluebird from 'bluebird'
const db = new nedb({filename: './database/database.db', autoload: true})
const Cursor = db.find({}).constructor
// https://github.com/louischatriot/nedb/issues/276#issuecomment-225511866
bluebird.promisifyAll(nedb.prototype)
bluebird.promisifyAll(Cursor.prototype)

export default class Database{
    public insert(newDoc:{[key:string]:any}):void{
        db.insert(newDoc)
    }
    public async findAll():Promise<{[key:string]:any}>{
        return await db.find({}).execAsync()
    }
    public async findRandom():Promise<{[key:string]:any}>{
        const count = await db.count({}).execAsync()
        const random = Math.floor(Math.random()*count);
        return await db.find({}).skip(random).limit(1).execAsync()
    }
    public async update(_id:string,timestamp:string,result:string){
        db.update({_id:_id},{$push:{history:{timestamp:timestamp,result:result}}})
    }
}