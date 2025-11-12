import { Request, Response } from 'express'
import Knex from '../../../infrastructure/config/postgres'
import fs from 'fs';
import path from 'path'


class getCourseAndTagTechnologies {
    // Busca todas as tags de tecnologia
    async searchAllTagTechnologies(req: Request, res: Response){
        try{
            const data = await Knex.select('id', 'tech').from('technologies')

            res.status(200).json({status: true, data: data})
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um error ao buscar as tags de tecnologia no banco de dados.'})
        }
    }

    // Busca todos os cursos
    async searchAllCourses(req: Request, res: Response){
        try{
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

            const data = await Knex('course')
            .join('users', 'course.owner', '=', 'users.id')
            .select('course.id as id_course', 'course.name', 'course.description', 'course.price', 'course.price_promotion', 'course.promotion', 'course.image', 'users.id as id_user', 'users.first_name', 'users.last_name').where('course.id', id).first()

            data.technologies = []
            data.requisits = []

            const technologies = await Knex('course_technologie as ct')
            .join('technologies as tech', 'ct.tech_id', '=', 'tech.id')
            .select('tech.id', 'tech.tech')
            .where('ct.course_id', id)

            const requisits = await Knex('course_requisits')
            .select('id', 'requisit').where('course_id', id)

            for (const r of requisits){
                data.requisits.push({id: r.id, requisit: r.requisit})
            }

            for (const techs of technologies){
                data.technologies.push({id: techs.id, tech: techs.tech})
            }

            res.status(200).json({status: true, data: data})
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
            console.log(name)

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