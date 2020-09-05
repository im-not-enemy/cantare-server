import express from 'express'
import cors from 'cors'
import Database from './Adapter/Database'

const app = express()
const port = "3000"

const db = new Database()

app.use(express.json())
app.use(cors())
app.listen(port, () => {})

app.get('/',(req,res)=>{
    res.send('Hello world!')
    console.log('helllo world!')
})

app.post('/menu',(req,res)=>{
    const abc = req.body.abc
    db.insert({abc:abc})
    console.log(`insert: {abc:${abc}}`)
})