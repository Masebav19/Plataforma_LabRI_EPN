import { getEstudiante, getAllProjects } from '../models/mysql/client.js'
import { ImageLength,getImage } from '../utils/image.js'

export class projectController {
  static async getEstudiante (req, res) {
    res.status(200).json(await getEstudiante())
  }

  static async getAllProjects (req, res) {
    res.status(200).json(await getAllProjects())
  }

  static async getImageLength (req, res) {
    const length = await ImageLength()
    res.status(200).json({ length })
  }

  static async getImage (req, res) {
    const { index } = req.params
    const image = await getImage(index)
    res.status(200).header('Content-Type', 'image/jpeg').send(image)
  }
}
