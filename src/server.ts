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
})

app.put('/api/v1/menu/:_id/result',(req,res)=>{
    const timestamp = req.body.timestamp
    const result = req.body.result
    db.update(req.params._id,timestamp,result)
    console.log(`update: ${req.params._id},${timestamp},${result}`)
})

app.get('/api/v1/menu',async(req,res)=>{
    const menu = await db.findAll()
    console.log(`send: ${JSON.stringify(menu)}`)
    res.send(menu)
})

app.get('/api/v1/question/random',async(req,res)=>{
    const abc = await db.findRandom()
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