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
}