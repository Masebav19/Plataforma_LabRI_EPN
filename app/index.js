import express from 'express'
import path from 'node:path'
import venv from './controllers/env.js';
import cors from 'cors'

const dirname = process.cwd()
const { PORT } = venv;
const server = express()
//server.use(express.static('static/devices'));
server.use(express.static(path.join(dirname,'home')));
server.use(express.static(path.join(dirname,'devices')));
server.use(express.static(path.join(dirname,'calendar')));
server.use(cors())

server.get('/',(req,res)=>{
    res.sendFile(path.join(dirname,'home','index.html'))
})
server.get('/devices',(req,res)=>{
    res.sendFile(path.join(dirname,'devices','index.html'))
})
server.get('/calendar',(req,res)=>{
    res.sendFile(path.join(dirname,'calendar','index.html'))
})
server.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})