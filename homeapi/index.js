import express from 'express'
import cors from 'cors'
import { project } from './routes/projects.js'
import { env } from './env/env.js'
const server = express()
server.use(cors())

server.use('/home', project)

server.listen(env.PORT, () => {
  console.log(`Servidor escuchando en http://172.31.36.30:${env.PORT}`)
})
