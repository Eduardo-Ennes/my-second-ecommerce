import { Request, Response } from 'express'
import Knex from '../../../infrastructure/config/postgres'
import redisClient from '../../../infrastructure/config/redisClient'


class listFavorite {   
    async create(req: Request, res: Response){
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

    async get(req: Request, res: Response){
        try{
            const cacheUser = await redisClient.get('user')
            const user = await JSON.parse(cacheUser?.toString())

            const data = await Knex('list_favorites as lt')
            .join('course', 'course.id', '=', 'lt.course_id')
            .join('users', 'users.id', '=', 'lt.id_user')
            .select('course.id', 'course.image', 'course.name', 'course.price', 'course.price_promotion', 'course.promotion', 'users.first_name', 'users.last_name')
            .where('lt.id_user', user.id)
            .where('course.status', true)
            .whereNot('course.image', null)

            res.status(200).json({status: true, data: data})
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um erro ao buscar a  lista de favoritos.'})
        }
    }

    async delete(req: Request, res: Response){
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