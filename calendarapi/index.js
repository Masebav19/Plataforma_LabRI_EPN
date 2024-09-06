import express from 'express'
import envVariables from './env/env.js'
import { router } from './routes/calendar.js'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

app.use('/time',router)
app.options('/time', cors())

app.listen(envVariables.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${envVariables.PORT}`)
})