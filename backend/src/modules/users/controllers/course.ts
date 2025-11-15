import { Request, Response } from 'express'
import Knex from '../../../infrastructure/config/postgres'
import validationCourse from '../validations/validationFieldsCourse'
import repositorieCourse from '../repositories/course'
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


// busca um curso específico pelo id para edição na dashboard
export async function searchUserCourseById(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        const course = await Knex.select('name', 'price', 'price_promotion', 'promotion', 'description', 'status').from('course').where('id', id).first()

        // Aqui nos apagamos o cache da imagem para que o campo sempre esteja vazio quando for atualizado, não causará problemas com arquivos enviados anteriormente. Logo abaixo na próxima função há mais explicações
        await redisClient.del('imageCache')

        const data = await {...course, promotion: String(course.promotion), status: String(course.status)}

        res.status(200).json({status: true, data: data})
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um erro ao buscar o curso no banco de dados. Recarregue a página.'})
    }
}


export async function updateCourse(req: Request, res: Response){
    try{
        const id = Number(req.params.id)

        var form = {...req.body, 
        price: parseFloat(req.body.price), 
        price_promotion: parseFloat(req.body.price_promotion),
        promotion: req.body.promotion === 'true' ? true : false, 
        status: req.body.status === 'true' ? true : false}

        // Aqui buscamos a imagem salva em cache pelo multer, é muito importante este cache ser deletado quando buscarmos para edição, se não sempre a imagem que foi salva anteriormente será removida da pasta, até por que a condição abaixo sempre será verdadeira e não será possível atualizar os dados sem enviar uma nova imagem
        const imageCache = await redisClient.get('imageCache')
        if(imageCache && imageCache.length > 0){
            form = {...form, image: imageCache.toString()}
        }

        const validations = await validationCourse.Fields(form)
        if(!validations.status){
            // Caso haja algum erro de validação, a imagem salva pelo multer será excluida. Até por que ela não será salva no banco de dados
            const imagePath = path.resolve(__dirname, `../media/${imageCache}`)
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath)
            }
            res.status(400).json({status: validations.status, error: validations.error})
            return;
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
