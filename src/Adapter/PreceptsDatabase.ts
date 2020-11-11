import nedb from 'nedb'
import bluebird from 'bluebird'
import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Tokyo')

const db = new nedb({filename: './database/precepts-database.db', autoload: true})
const Cursor = db.find({}).constructor
// https://github.com/louischatriot/nedb/issues/276#issuecomment-225511866
bluebird.promisifyAll(nedb.prototype)
bluebird.promisifyAll(Cursor.prototype)

export default class PreceptsDatabase{
    public add(word:string):void{
        const created = moment().format()
        db.insert({word:word,created:created})
    }
    public async findAll():Promise<{[key:string]:any}>{
        return await db.find({}).sort({created:1}).execAsync()
    }
}