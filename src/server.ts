import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

import Database from './Adapter/Database'
import Audiveris from './Adapter/Audiveris'
import Xml2abc from './Adapter/Xml2abc'

const app = express()
const port = "3000"

const db = new Database()
const audiveris = new Audiveris()
const xml2abc = new Xml2abc()

const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads/')
        },
        filename(req,file,cb){
            cb(null,file.originalname)
        }
    })
})

app.use(express.json())
app.use(cors())
app.listen(port,()=>{})

app.get('/api/v1',(req,res)=>{
    res.send('Hello world!')
    console.log('helllo world!')
})

app.post('/api/v1/menu',(req,res)=>{
    const abc = req.body.abc
    db.insert({abc:abc})
    console.log(`insert: {abc:${abc}}`)
    res.sendStatus(200)
})

app.delete('/api/v1/menu/:_id',(req,res)=>{
    db.remove(req.params._id)
    console.log(`remove: ${req.params._id}`)
    res.sendStatus(200)
})

app.put('/api/v1/menu/:_id/abc',(req,res)=>{
    const _id = req.params._id
    const abc = req.body.abc
    db.updateAbc(_id,abc)
    console.log(`update: ${_id},abc: ${abc}`)
    res.sendStatus(200)
})
app.put('/api/v1/menu/:_id/remembered',(req,res)=>{
    const _id = req.params._id
    const remembered = req.body.remembered
    db.updateRemembered(_id,remembered)
    console.log(`update: ${_id},remembered: ${remembered}`)
    res.sendStatus(200)
})

app.put('/api/v1/menu/:_id/bookmarked',(req,res)=>{
    const _id = req.params._id
    const bookmarked = req.body.bookmarked
    db.updateBookmarked(_id,bookmarked)
    console.log(`update: ${_id},bookmarked: ${bookmarked}`)
    res.sendStatus(200)
})

app.get('/api/v1/menu',async(req,res)=>{
    const page = parseInt(String(req.query.page)) || 1
    const menusPerPage = parseInt(String(req.query.menusPerPage)) || 10
    const skip = (page - 1)* menusPerPage
    const menu = await db.findPage(skip,menusPerPage)
    res.send(menu)
})

app.get('/api/v1/menu/count/all',async(req,res)=>{
    const count = await db.countAll()
    res.send(String(count))
})

app.get('/api/v1/menu/count/remembered',async(req,res)=>{
    const count = await db.countRemembered()
    res.send(String(count))
})

app.get('/api/v1/question/random/all',async(req,res)=>{
    const abc = await db.findRandom({})
    res.send(abc)
})

app.get('/api/v1/question/random/inprogress',async(req,res)=>{
    const abc = await db.findRandom({$not:{remembered:true}})
    res.send(abc)
})

app.post('/api/v1/scan/upload', upload.single('musicSheetImage'),(req,res,next)=>{
    const fullFilename = req.file.originalname
    const filename = path.parse(fullFilename).name
    console.log(`${fullFilename} is uploaded!`)

    let succeed = audiveris.execute('./output/audiveris',`./uploads/${fullFilename}`)

    if (succeed){
        console.log("succeed to convert to .mxl!")
        succeed = xml2abc.execute(`./output/xml2abc`,`./output/audiveris/${filename}/${filename}.mxl`)
        if (succeed){
            console.log("succeed to convert to .abc!")
            console.log(fs.readFileSync(`./output/xml2abc/${filename}.abc`).toString())
            res.send({
                status: "SUCCEED",
                text: fs.readFileSync(`./output/xml2abc/${filename}.abc`).toString()
            })
        }else{
            console.log("failed to convert to .abc!")
            res.send({
                status: "FAILED",
                text: "[xml2abc] failed to convert"
            })
        }
    }else{
        console.log("failed to convert to .mxl!")
        res.send({
            status: "FAILED",
            text: "[audiveris] failed to convert"
        })
    }

})