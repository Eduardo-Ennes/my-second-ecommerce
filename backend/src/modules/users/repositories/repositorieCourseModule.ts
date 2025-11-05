import redisClient from '../../../infrastructure/config/redisClient';
import Knex from '../../../infrastructure/config/postgres'
import fs from 'fs';
import path from 'path'

type updateModule = {
    id: number
    name: string
    position?: number
}


class repositorieModule {
    // Cria a aula no banco de dados
    async createModule(idCourse: number, name: string, position: number){
        try{
            await Knex.insert({
                name: name,
                course_id: idCourse,
                position: position
            }).from('course_modules')

            return{status: true, message: 'Módulo criado com sucesso.', code: 200}
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao criar o módulo no banco de dados.', code: 500}
        }
    }


    // Busca dados de um módulo no banco 
    async searchDetailModule(id: number){
        try{
            const data = await Knex.select('id', 'name', 'position')
            .where('id', id).from('course_modules')

            if(data.length < 1){
                return{status: false, error: 'Módulo não encontrado.', code: 404}
            }

            console.log(data)

            return{status: true, data: data[0], code: 200}
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao atualizar o módulo no banco de dados.', code: 500}
        }
    }


    // Atualiza as informações de um módulo
    async updateModule(form: updateModule){
        try{
            console.log(form)
            await Knex.update({
                name: form.name,
                position: form.position
            }).where({id: form.id}).from('course_modules')

            return{status: true, message: 'Módulo atualizado com sucesso.', code: 200}
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao atualizar o módulo no banco de dados.', code: 500}
        }
    }


    // Deleta um módulo
    async deleteModule(id: number){
        try{
            const leassons = await Knex.select('*').where('module_id', id).from('course_leassons')

            if(leassons.length > 0){
                for(const leasson of leassons){
                    const video = path.resolve(__dirname, `../videoLeassons/${leasson.url}`)
                    fs.unlinkSync(video)
                }
            }

            await Knex.delete().where({id: id}).from('course_modules')

            return{status: true, message: 'Módulo deletado com sucesso.', code: 200}
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao deletar o módulo no banco de dados.', code: 500}
        }
    }


    // Busca modulo e as aulas para exibição
    async searchAll(id: number){
        try{   
            const modules = await Knex('course_modules').where({course_id: id}).select('*').orderBy('position', 'asc')
            
            for (const module of modules){
                const leassons = await Knex('course_leassons').where({module_id: module.id}).select('*').orderBy('position', 'asc')

                module.leassons = leassons
            }

            return{status: true, data: modules, code: 200}
        }catch(error){
            return {status: false, error: 'Houve um error ao buscar as aulas do curso no banco de dados.', code: 500}
        }
    }
}


export default new repositorieModule()