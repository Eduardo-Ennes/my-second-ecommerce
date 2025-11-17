import { Request, Response } from 'express'
import Knex from '../../../infrastructure/config/postgres'
import path from 'path'
import dotenv from 'dotenv'
import redisClient from '../../../infrastructure/config/redisClient';
import repositorieDetailCourse from '../repositories/deatilCourse'

dotenv.config()


class getCourseAndTagTechnologies {
    // Funças que busca todas as tags de tecnologia para filtrar os cursos 
    async searchAllTagTechnologies(req: Request, res: Response){
        try{
            const data = await Knex.select('id', 'tech').from('technologies')

            res.status(200).json({status: true, data: data})
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um error ao buscar as tags de tecnologia no banco de dados.'})
        }
    }


    // Rota que envia a password para autenticação das requisições da api
    async sendPasswordApis(req: Request, res: Response){
        try{
            const passwordApi = await redisClient.get('autheticationApis')
            res.status(200).json({status: true, passwordApi: passwordApi})
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um error na segurança da api.'})
        }
    }


    // Esta seria a função home, busca todos os cursos para exibir na tela inicial, com ela se cria também o carrinho de compras.
    async searchAllCourses(req: Request, res: Response){
        try{
            const card = await redisClient.get('card')
            if(!card) await redisClient.set('card', JSON.stringify([[], {total: '0'}]))

            const data = await Knex('course as c')
            .join('users as u', 'u.id', '=', 'c.owner')
            .select('c.id as id_course', 'c.name', 'c.price', 'c.price_promotion', 'c.promotion', 'c.image', 'u.id as id_user', 'u.first_name', 'u.last_name')
            .where('c.status', true)
            .where('u.status', true)
            .whereNotNull('c.image')

            res.status(200).json({status: true, data: data})
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um error ao buscar os cursos. '})
        }
    }


    async searchDetailCourse(req: Request, res: Response){
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


    // Busca cursos relacionados a uma determinada tag
    async searchCoursesFilterTag(req: Request, res: Response){
        try{
            const id = Number(req.params.id)

            const data = await Knex('course_technologie as tech')
            .join('course', 'course.id', '=', 'tech.course_id')
            .join('users', 'users.id', '=', 'course.owner')
            .select('course.id as id_course', 'course.name', 'course.price', 'course.price_promotion', 'course.promotion', 'course.image', 'users.id as id_user', 'users.first_name', 'users.last_name').where('tech.tech_id', id)

            res.status(200).json({status: true, data: data})
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um error ao buscar os cursos.'})
        }
    }


    async searchCourseFilterName(req: Request, res: Response){
        try{    
            const name = String(req.params.name)

            const data = await Knex('course')
            .select('course.id', 'course.name', 'course.price', 'course.price_promotion', 'course.promotion', 'course.image')
            .whereRaw("LOWER(name) LIKE ?", [`%${name}%`]);

            res.status(200).json({status: true, data: data})
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um error ao buscar os cursos pelo nome digitado.'})
        }
    }


    // Fornece a imagem para ser exibida
    async getImageCourse(req: Request, res: Response){
        try{
            const name = req.params.name

            const basePath = path.resolve(__dirname, '../media/')
            const filePath = path.join(basePath, name);

            const normalizedPath = path.normalize(filePath);
            if (!normalizedPath.startsWith(basePath)) {
                return res.status(400).json({status: false, message: "Caminho da imagem inválido."});
            }

            res.sendFile(filePath)
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um error ao buscar a imagem do curso. '})
        }
    }
}


export default new getCourseAndTagTechnologies()