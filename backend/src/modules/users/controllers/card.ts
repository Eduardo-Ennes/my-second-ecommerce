import { Request, Response } from 'express'
import operationsCard from '../utils/operationsCard'
import redisClient from '../../../infrastructure/config/redisClient'

// Apenas as operações do carrinho de compras 
class card {
    async add(req: Request, res: Response){
        try{
            const id = Number(req.params.id)
            const result = await operationsCard.add(id)
            res.status(result.code).json(result)
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um erro na operação de adicionar um curso ao carrinho.'})
        }
    }


    async get(req: Request, res: Response){
        try{
            const cacheCard = await redisClient.get('card')
            if(!cacheCard){
                res.status(500).json({status: false, error: 'Houve um erro inesperado no servidor, a sessão do carrinho não foi criada.'})
                return;
            }

            const card = await JSON.parse(cacheCard?.toString())
            res.status(200).json({status: true, card: card})
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um error as informações no carrinho.'})
        }
    }


    async del(req: Request, res: Response){
        try{
            const id = Number(req.params.id)

            const result = await operationsCard.del(id)
            res.status(result.code).json(result)
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um erro na operação de remover um curso do carrinho.'})
        }
    }
}


export default new card()