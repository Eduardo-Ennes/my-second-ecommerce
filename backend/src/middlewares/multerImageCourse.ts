import multer, { Options, diskStorage } from 'multer'
import { resolve } from 'path'
import redisClient from '../infrastructure/config/redisClient'

// Neste exemplo com o multer, estou usando redis para guardar o nome da imagem de forma temporária, para que eu possa acessar na função da rota o nome e salvar no banco de dados. Essa abordagem foi adotada devido a problemas com tipagem do req.file.


export const multerConfig: Options = {
  storage: diskStorage({
    destination: (request, file, callback) => {
      callback(null, resolve(__dirname, '..', 'modules', 'users', 'media'))
    },
    filename: async (request, file, callback) => {
      try {
        // Gera nome único com timestamp + número aleatório
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`
        callback(null, uniqueName)

        const cacheImage = await redisClient.set('imageCache', uniqueName) // <-- Aqui o cache com redis
      } catch (error) {
        callback(error as Error, file.originalname)
      }
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite: 5 MB
  },
  fileFilter: (request, file, callback) => { 
    const formats = [
      'image/jpeg',
      'image/jpg',
      'image/png',
    ]

    if (formats.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('Formato de imagem não aceito.'))
    }
  },
}
