import multer, { Options, diskStorage } from 'multer'
import { resolve } from 'path'
import redisClient from '../infrastructure/config/redisClient'


export const multerConfigFile: Options = {
    storage: diskStorage({
        destination: (req, file, callback) => {
            callback(null, resolve(__dirname, '../', 'modules', 'users', 'files'))
        },
        filename: async (req, file, callback) => {
             try{
                // Gera nome único com timestamp + número aleatório
                const uniqueName = `${Date.now()}-${file.originalname}`;
                callback(null, uniqueName)

                await redisClient.set('cacheFile', uniqueName)
                await redisClient.del('cacheErrorFile')
            }catch(error){
                console.log(error)
                await redisClient.set('cacheErrorFile', 'Multer: houve um error ao salvar o arquivo da aula.')
                await redisClient.del('cacheFile')
                return;
            }
        },
    })
}