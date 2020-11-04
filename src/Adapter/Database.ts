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
        return await db.find({}).sort({abc:1}).execAsync()
    }
    public async findPage(skip:number,limit:number):Promise<{[key:string]:any}>{
        return await db.find({}).sort({abc:1}).skip(skip).limit(limit).execAsync()
    }
    public async countAll():Promise<number>{
        return await db.count({}).execAsync()
    }
    public async findRandom():Promise<{[key:string]:any}>{
        const count = await db.count({}).execAsync()
        const random = Math.floor(Math.random()*count);
        return await db.find({}).skip(random).limit(1).execAsync()
    }
    public async updateAbc(_id:string,abc:string){
        db.update({_id:_id},{$set:{abc:abc}})
    }
    public async updateRemembered(_id:string,remembered:boolean){
        db.update({_id:_id},{$set:{remembered:remembered}})
    }
    public async remove(_id:string){
        db.remove({_id:_id})
    }
}