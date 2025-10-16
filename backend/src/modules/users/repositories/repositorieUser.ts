import Knex from '../../../infrastructure/config/postgres'
import redisClient from '../../../infrastructure/config/redisClient'
import bcrypt from 'bcrypt'

type FormUser = {
    id?: number 
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
    cpf?: string
    image?: string
    password?: string
    confirm_password?: string
}

type Response = {
    status?: boolean
    error?: string
    message?: string
    code?: number
}

class MethodsUser {
    async CreateUser (form: FormUser): Promise<Response> {
        try{
            const existing = await Knex('users')
            .select('cpf', 'email', 'phone')
            .where('cpf', form.cpf)
            .orWhere('email', form.email)
            .orWhere('phone', form.phone);
            
            let errors = [];

            existing.forEach(user => {
                if(user.cpf === form.cpf) errors.push(`${form.cpf} já existe!`) 
                
                if(user.email === form.email) errors.push(`${form.email} já existe!`)

                if(user.phone == form.phone) errors.push(`${form.phone} já existe!`)
            })

            if(errors.length > 0){
                return {status: false, error: errors[0], code: 409}
            }

            try{
                const passHash = await bcrypt.hash(form.password, 10)

                await Knex.insert({
                    first_name: form.first_name,
                    last_name: form.last_name,
                    email: form.email,
                    phone: form.phone,
                    cpf: form.cpf,
                    password: passHash
                }).table('users')
                return {status: true, message: 'Cadastro realizado com sucesso.', code: 200}
            }catch(error){
                console.log('Error: ', error)
                return {status: false, error: 'Houve um erro no servidor. Tente novamente.', code: 500}
            }

        }catch(error){
            return {status: false, error: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }


    async LoginUser(form: FormUser): Promise<Response> { 
        try{
            const user = await Knex('users')
            .select('id', 'first_name', 'last_name', 'phone', 'email', 'password')
            .where('email', form.email).first()

            if(!user){
                return {status: false, error: 'Usuário não encontrado.', code: 401}
            }

            const isMatch = await bcrypt.compare(form.password, user.password)
            if(!isMatch){
                return {status: false, error: 'Senha incorreta!', code: 401}
            }

            const cache = await this.CreateChacheUser(user)
            if(!cache){
                return {status: cache.status, error: cache.error, code: cache.code}
            }

            return {status: true, message: 'Login realizado com sucesso!', code: 200}
        }catch(error){
            return {status: false, error: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }

    async CreateChacheUser(object: FormUser): Promise<Response> {
        try{
            await redisClient.del('user')

            await redisClient.set('user', JSON.stringify({
                id: object.id,
                first_name: object.first_name,
                last_name: object.last_name,
                email: object.email,
                phone: object.phone,
                login: true
            }))

            const userRedis = await redisClient.get('user')
            console.log('USER REDIS: ', userRedis)
            return {status: true}
        }catch(error){
            console.log('ERROR NA CRIAÇÃO DO CACHE DO USUÁRIO: ', error)
            return {status: false, error: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }
}


export default new MethodsUser()