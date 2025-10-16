import { Request, Response } from 'express'
import Knex from '../../../infrastructure/config/postgres'
import validationCourse from '../validations/validationFieldsCourse'
import repositorieCourse from '../repositories/repositorieCourse'


export async function createCourse(req: Request, res: Response){
    const form = {...req.body, price: parseFloat(req.body.price), price_promotion: parseFloat(req.body.price_promotion), promotion: Boolean(req.body.promotion)}
    try{
        const validations = await validationCourse.Fields(form)
        if(!validations.status){
            res.status(400).json({status: validations.status, error: validations.error})
        }

        const result = await repositorieCourse.createCourse(form)
        res.status(result.code).json(result)
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Houve um erro no servidor, tente novamente mais tarde.'})
    }
}


export async function searchtechnologies(req: Request, res: Response){
    try{
        const technologies = await Knex.select('id', 'tech').from('technologies')
        res.status(200).json({data: technologies})
    }catch(error){
        res.status(500).json({error: 'Houve um erro ao tentar buscar as tags de tecnologias.Recarregue a página.'})
    }
}
