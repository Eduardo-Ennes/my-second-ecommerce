import { Request, Response } from 'express'
import repositorieDetailCourse from '../repositories/deatilCourse'

// Busca todas as informações de um curso para detalhes 
export async function searchDetailCourse(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        const response = await repositorieDetailCourse.searchDetail(id)

        if(!response.status){
            res.status(500).json(response)
            return;
        }

        res.status(200).json(response)
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um error ao buscar os detalhes do curso. '})
    }
}