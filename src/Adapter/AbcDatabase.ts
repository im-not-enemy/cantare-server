import nedb from 'nedb'
import bluebird from 'bluebird'
const db = new nedb({filename: './database/abc-database.db', autoload: true})
const Cursor = db.find({}).constructor
// https://github.com/louischatriot/nedb/issues/276#issuecomment-225511866
bluebird.promisifyAll(nedb.prototype)
bluebird.promisifyAll(Cursor.prototype)

export default class AbcDatabase{
    public insert(abc:string,remembered:boolean,bookmarked:boolean):void{
        db.insert({abc:abc, remembered:remembered, bookmarked:bookmarked})
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
    public async countRemembered():Promise<number>{
        return await db.count({remembered:true}).execAsync()
    }
    public async findRandom(query:{}):Promise<{[key:string]:any}>{
        const count = await db.count(query).execAsync()
        const random = Math.floor(Math.random()*count);
        return await db.find(query).skip(random).limit(1).execAsync()
    }
    public async updateAbc(_id:string,abc:string){
        db.update({_id:_id},{$set:{abc:abc}})
    }
    public async updateRemembered(_id:string,remembered:boolean){
        db.update({_id:_id},{$set:{remembered:remembered}})
    }
    public async updateBookmarked(_id:string,bookmarked:boolean){
        db.update({_id:_id},{$set:{bookmarked:bookmarked}})
    }
    public async remove(_id:string){
        db.remove({_id:_id})
    }
}