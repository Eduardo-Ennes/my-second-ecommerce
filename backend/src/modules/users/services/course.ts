import { Request, Response } from 'express'
import Knex from '../../../infrastructure/config/postgres'
import validationCourse from '../validations/validationFieldsCourse'
import repositorieCourse from '../repositories/repositorieCourse'
import redisClient from '../../../infrastructure/config/redisClient'
import fs from 'fs';
import path from 'path'


// cria um novo curso
export async function createCourse(req: Request, res: Response){
    const form = {...req.body, price: parseFloat(req.body.price), price_promotion: parseFloat(req.body.price_promotion), promotion: Boolean(req.body.promotion)}
    try{
        const validations = await validationCourse.Fields(form)
        if(!validations.status){
            res.status(400).json({status: validations.status, error: validations.error})
            return 
        }

        const result = await repositorieCourse.createCourse(form)
        res.status(result.code).json(result)
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Houve um erro no servidor, tente novamente mais tarde.'})
    }
}


// busca todos os cursos do usuário para edição 
export async function searchUserAllCouses(req: Request, res: Response){
    try{
        const cacheUser = await redisClient.get('user')
        const user = await JSON.parse(cacheUser?.toString() || '{}')

        if(!user.login){
            res.status(401).json({error: 'Usuário não autenticado.'})
        }

        const data = await Knex.select('id', 'name', 'description', 'price', 'price_promotion', 'promotion', 'status', 'sold', 'create_at', 'update_at').from('course').where('owner', user.id)

        if(data.length === 0){
            res.status(404).json({status: false, error: `${user.first_name}, você ainda não possui cursos cadastrados.`})
        }

        res.status(200).json({status: true, data: data})
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um erro ao buscar os cursos no banco de dados. Recarregue a página.'})
    }
}


// busca um curso específico pelo id para edição
export async function searchUserCourseById(req: Request, res: Response){
    const id = Number(req.params.id)
    try{
        const course = await Knex.select('name', 'price', 'price_promotion', 'promotion', 'description', 'status', 'image').from('course').where('id', id).first()

        const cover = await {...course, promotion: String(course.promotion), status: String(course.status)}

        res.status(200).json({status: true, data: cover})
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um erro ao buscar o curso no banco de dados. Recarregue a página.'})
    }
}


export async function updateCourse(req: Request, res: Response){
    try{
        const id = Number(req.params.id)

        const imageCache = await redisClient.get('imageCache')

        var form = {...req.body, 
        price: parseFloat(req.body.price), 
        price_promotion: parseFloat(req.body.price_promotion),
        image: imageCache,
        promotion: req.body.promotion === 'true' ? true : false, 
        status: req.body.status === 'true' ? true : false}

        const validations = await validationCourse.Fields(form)
        if(!validations.status){
            const imagePath = path.resolve(__dirname, `../media/${imageCache}`)
            fs.unlinkSync(imagePath) // Caso haja algum erro de validação, a imagem salva pelo multer será excluida.
            res.status(400).json({status: validations.status, error: validations.error})
            return
        }

        const result = await repositorieCourse.UpdateCourse(id, form)
        console.log(result)
        res.status(result.code).json(result)
        
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um erro ao atualizar o curso. Tente novamente mais tarde.'})
    }
}


// Busca todas as tags de tecnologias para o cadastro do curso
export async function searchTagstechnologies(req: Request, res: Response){
    try{
        const technologies = await Knex.select('id', 'tech').from('technologies')
        res.status(200).json({data: technologies})
    }catch(error){
        res.status(500).json({error: 'Houve um erro ao tentar buscar as tags de tecnologias.Recarregue a página.'})
    }
}
