import Knex from '../../../infrastructure/config/connection'
import bcrypt from 'bcrypt'

type FormUser = {
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
    cpf?: string
    image?: string
    password?: string
    confirm_password?: string
}

class RegisterUser {
    async CreateUser (form: FormUser): Promise<{status: boolean, error?: string, message?: string, code: number}> {
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
                console.log('LISTA DE ERRORS: ', errors)
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
}


export default new RegisterUser()