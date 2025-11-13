import { Request, Response } from 'express'
import Knex from '../../../infrastructure/config/postgres'
import redisClient from '../../../infrastructure/config/redisClient'


class listFavorite {    
    async createRef(req: Request, res: Response){
        try{
            const id = Number(req.params.id)
            const cacheUser = await redisClient.get('user')
            const user = await JSON.parse(cacheUser?.toString() || '{}')

            await Knex.insert({
                course_id: id,
                id_user: user.id
            }).from('list_favorites')

            res.status(200).json({status: true})
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um erro ao adicionar o curso na lista de favoritos.'})
        }
    }

    async deleteRef(req: Request, res: Response){
        try{
            const id = Number(req.params.id)

            await Knex.delete().where({
                id: id
            }).from('list_favorites')

            res.status(200).json({status: true})
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um erro ao deletar o curso da lista de favoritos.'})
        }
    }
}


export default new listFavorite()