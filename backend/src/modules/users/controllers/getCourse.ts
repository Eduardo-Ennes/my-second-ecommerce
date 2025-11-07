import { Request, Response } from 'express'
import Knex from '../../../infrastructure/config/postgres'
import redisClient from '../../../infrastructure/config/redisClient'
import fs from 'fs';
import path from 'path'


class getCourse {
    async searchAllCourses(req: Request, res: Response){
        try{
            const data = await Knex('course as c')
            .join('users as u', 'u.id', '=', 'c.owner')
            .select('c.id as id_course', 'c.name', 'c.price', 'c.price_promotion', 'c.promotion', 'c.image', 'u.id as id_user', 'u.first_name', 'u.last_name')
            .where('c.status', true)
            .where('u.status', true)
            .whereNotNull('c.image')

            console.log(data)
            res.status(200).json({status: true, data: data})
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um error ao buscar os cursos. '})
        }
    }


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


    async searchAllCoursesTag(req: Request, res: Response){
        try{
            const id = Number(req.params.id)

            const data = Knex('course_technologie as tech')
            .join('course', 'course.id', 'tech.course_id')
            .select('*').where('tech.id', id)

            console.log(data)
        }catch(error){
            res.status(500).json({status: false, error: 'Houve um error ao buscar os cursos.'})
        }
    }
}


export default new getCourse()