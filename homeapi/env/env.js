import dotenv from 'dotenv'
dotenv.config()
export const env = {
  PORT: process.env.PORT ?? 4002,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  TABLE_ESTUDIANTE: process.env.TABLE_ESTUDIANTE,
  TABLE_PROYECTOS: process.env.TABLE_PROYECTOS,
  TABLE_ESTUDIANTE_PROYECTO: process.env.TABLE_ESTUDIANTE_PROYECTO
}