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


    async searchUserCourseById(id: number){
        try{  
            const cacheUser = await redisClient.get('user')
            const user = JSON.parse(cacheUser?.toString())

            const course = await Knex.select('name', 'price', 'price_promotion', 'promotion', 'description', 'status').from('course').where({id: id, owner: user.id}).first()

            const data = await {...course, promotion: String(course.promotion), status: String(course.status)}

            return{status: true, data: data, code: 200}
        }catch(error){
            console.log(error)
            return {status: false, error: `Houve um error ao buscar os dados do curso no banco de dados.`, code: 500}
        }
    }


    async UpdateCourse(id: number, form: CourseUpdate): Promise<Response> {
        try{
            const cacheUser = await redisClient.get('user')
            const user = JSON.parse(cacheUser?.toString()) 

            // Neste caso eu atualizo o curso primeiro por um motivo, se algum usuário malicioso tentar atualizar um curso que não é dele, ele não conseguirá devido a verificação do owner no banco de dados, dará um erro, a função irá parar e não removerá a imagem da pasta media.
            await Knex('course')
            .update(form)
            .where({id: id, owner: user.id})

            if('image' in form){
                // Aqui buscamos a imagem para remove-la da pasta media
                const data = await Knex.select('image').from('course').where({id: id, owner: user.id}).first()

                const resolve = path.resolve(__dirname, `../media/${data.image}`)
                if(fs.existsSync(resolve)){
                    fs.unlinkSync(resolve)
                }
            }

            return {status: true, message: 'Curso atualizado com sucesso.', code: 200}
        }catch(error){
            console.log(error)
            return {status: false, error: `Houve um error ao atualizar o curso ${form.name}. Tente novamente mais tarde.`}
        }
    }
}

export default new RepositorieCourse()