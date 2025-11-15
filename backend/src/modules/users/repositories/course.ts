import Knex from '../../../infrastructure/config/postgres'
import redisClient from '../../../infrastructure/config/redisClient'
import fs from 'fs'
import path from 'path'

type Course = {
  name: string
  price: number
  price_promotion?: number
  promotion: string
  description: string
}

type CourseUpdate = {
  name: string
  image: string
  price: number
  price_promotion?: number
  promotion: string
  status: string
  description: string
}

type Response = {
    status?: boolean
    error?: string
    message?: string
    code?: number
}

class RepositorieCourse {
    async createCourse(form: Course): Promise<Response> {
        try{        
            const cacheUser = await redisClient.get('user')
            if(!cacheUser) return {status: false, error: 'Usuário não autenticado.', code: 401}

            const user = JSON.parse(cacheUser?.toString())

            try{
                await Knex.insert({
                    name: form.name.toLowerCase(),
                    price: form.price,
                    price_promotion: form.price_promotion,
                    promotion: form.promotion,
                    description: form.description,
                    owner: user.id
                }).table('course')

                return {status: true, message: 'Curso criado com sucesso.', code: 201}
            }catch(error){
                return {status: false, error: 'Houve um error ao salvar as informações no banco de dados.', code: 500}
            }
        }catch(error){
            return {status: false, error: 'Houve um error ao buscar o cache do usuário.', code: 500}
        }
    }


    async UpdateCourse(id: number, form: CourseUpdate): Promise<Response> {
        try{
            console.log(form)
            const cacheUser = await redisClient.get('user')
            // Verificamos se o ujsuário está autenticado
            if(!cacheUser) return {status: false, error: 'Usuário não autenticado.', code: 401}
            const user = JSON.parse(cacheUser?.toString())

            if('image' in form){
                // Aqui buscamos a imagem para remove-la da pasta media
                const data = await Knex.select('image').from('course').where({id: id, owner: user.id}).first()

                const resolve = path.resolve(__dirname, `../media/${data.image}`)
                if(fs.existsSync(resolve)){
                    fs.unlinkSync(resolve)
                }
            }
           
            await Knex('course')
            .update(form)
            .where({id: id, owner: user.id})

            return {status: true, message: 'Curso atualizado com sucesso.', code: 200}
        }catch(error){
            console.log(error)
            return {status: false, error: `Houve um error ao atualizar o curso ${form.name}. Tente novamente mais tarde.`}
        }
    }
}

export default new RepositorieCourse()