import redisClient from '../../../infrastructure/config/redisClient';
import Knex from '../../../infrastructure/config/postgres'
import fs from 'fs';
import path from 'path'

type updateModule = {
    id: number
    name: string
    position?: number
}

class repositorieCourseLeasson {
    // Cria uma aula 
    async createLeasson(idModule: number, name: string, video: string){
        try{
            const consult = await Knex('course_leassons')
            .where('module_id', idModule)
            .count({total: '*'})
            .first()

            await Knex.insert({
                name: name,
                module_id: idModule,
                url: video,
                position: Number(consult.total) + 1
            }).from('course_leassons')

            await redisClient.del('cacheLeasson') 

            return {status: true, message: 'Aula criada com sucesso.', code: 200}
        }catch(error){
            return {status: false, error: `Houve um erro ao criar a aula ${name} no banco de dados.`, code: 500}
        }
    }

    // Busca uma aula para atualização
    async searchDetailLeasson(id: number){
        try{
            const data = await Knex.select('id', 'name', 'position')
            .where({id: id}).from('course_leassons')

            if(data.length < 1){
                return{status: false, error: 'Aula não encontrado no banco de dados.', code: 404}
            }

            return{status: true, data: data[0], code: 200}
        }catch(error){
            return {status: false, error: 'Houve um erro ao buscar a aula no banco de dados.', code: 500}
        }
    }

    // Atualiza uma aula 
    async updateLeasson(id: number, form: {name: string, file?: string | File, position: number}){
        try{
            if('file' in form){
                const leasson = await Knex.select('url').where({id: id}).from('course_leassons').first()

                const videoPath = path.resolve(__dirname, `../videoLeassons/${leasson.url}`)
                if(!fs.existsSync(videoPath)){
                    return{status: false, error: 'Houve um erro, arquivo da aula não encontrado.', code: 500}
                }

                fs.unlinkSync(videoPath)
                const cacheLeasson = await redisClient.get('cacheLeasson')

                await Knex.update({
                name: form.name,
                url: cacheLeasson,
                position: form.position
                }).where({id: id}).from('course_leassons')

                return{status: true, message: 'Aula atualizada com sucesso.', code: 200}
            }

            await Knex.update({
                name: form.name,
                position: form.position
            }).where({id: id}).from('course_leassons')

            return{status: true, message: 'Aula atualizada com sucesso.', code: 200}
        }catch(error){
            return {status: false, error: 'Houve um erro ao atualizar a aula no banco de dados.', code: 500}
        }
    }

    // Deleta uma aula 
    async deleteLeasson(id: number){
        try{
            const leasson = await Knex.select('*')
            .where({id: id})
            .from('course_leassons')
            .first()

            const leassonVideo = path.resolve(__dirname, `../videoLeassons/${leasson.url}`)
            fs.unlinkSync(leassonVideo)

            await Knex.delete()
            .where('id', id)
            .from('course_leassons')

            return{status: true, message: 'Aula deletada com sucesso', code: 200}
        }catch(error){
            return {status: false, error: 'Houve um erro ao deletar a aula no banco de dados.', code: 500}
        }
    }
}


export default new repositorieCourseLeasson()