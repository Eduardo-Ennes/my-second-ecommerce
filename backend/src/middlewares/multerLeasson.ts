import multer, { Options, diskStorage } from 'multer'
import { resolve } from 'path'
import redisClient from '../infrastructure/config/redisClient'


export const multerConfigLeasson: Options = {
    storage: diskStorage({
        destination: (request, file, callback) => {
            callback(null, resolve(__dirname, '..', 'modules', 'users', 'videoLeassons'))
        },
        filename: async (request, file, callback) => {
            try{
                // Gera nome único com timestamp + número aleatório
                const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.mp4`
                callback(null, uniqueName)

                await redisClient.set('cacheLeasson', uniqueName)
                await redisClient.del('cacheErrorLeasson')
            }catch(error){
                console.log(error)
                await redisClient.set('cacheErrorLeasson', 'Houve um error ao salvar o video da aula, tente novamente.')
                await redisClient.del('cacheLeasson')
                return;
            }
        }
    }),

    limits: {
        fileSize: 1.5 * 1024 * 1024 * 1024, // 1.5 GB
    },

    fileFilter: async (req, file, cb) => {
        if (!file.mimetype.startsWith("video/")) {
            await redisClient.set('cacheErrorLeasson', 'Apenas vídeos são permitidos.')
            await redisClient.del('cacheLeasson')
            return;
        }

        cb(null, true);
    },
}