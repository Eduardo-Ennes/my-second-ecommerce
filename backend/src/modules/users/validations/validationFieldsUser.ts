import validationCpf from '../utils/isInvalidCpf'

type User = {
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
    cpf?: string
    image?: string
    password?: string
    confirm_password?: string
}

class ValidationFieldsUser {
    async Fields(form: User, cond: boolean): Promise<{ status: boolean; error?: string }> {
        if('first_name' in form){
            if(form.first_name.length > 75){
                return {status: false, error: 'O campo nome deve ter no máximo 75 caracteres.'}
            }
            else if(form.first_name.length < 1){
                return {status: false, error: 'O campo nome não pode ser vazio.'}
            }
        }


        if('last_name' in form){
            if(form.last_name.length > 75){
                return {status: false, error: 'O campo sobrenome deve ter no máximo 75 caracteres.'}
            }
            else if(form.last_name.length < 1){
                return {status: false, error: 'O campo sobrenome não pode ser vazio.'}
            }
        }


        if('email' in form){
            if(form.email.length > 100){
                return {status: false, error: 'O campo email deve ter no máximo 100 caracteres.'}
            }
            else if(form.email.length < 1){
                return {status: false, error: 'O campo email não pode ser vazio.'}
            }
            else if(!form.email.includes("@") || !form.email.includes(".com")){
                return {status: false, error: 'Email inválido!'}
            }
        }


        if('phone' in form){
            if(form.phone.length > 11 || form.phone.length < 11){
                return {status: false, error: 'Número inválido.'}
            }
            else if (/[a-zA-Z]/.test(form.phone)) {
                return { status: false, error: 'O campo número não pode conter letras.'};
            }
        }

        
        if('cpf' in form){
            if(form.cpf.length > 11) {
                return {status: false, error: 'Cpf deve conter exatamente 11 dígitos!'}
            }
            else if(form.cpf.length < 11) {
                return {status: false, error: 'Cpf deve conter exatamente 11 dígitos!'}
            }
            else{
                const validationFieldCpf = validationCpf(form.cpf)
                if(!validationFieldCpf) {
                    return {status: false, error: 'Cpf inválido!'}
                }
            }
        }


        if('image' in form){
            if(form.image.length > 500){
                return {status: false, error: "O caminho da imagem é muito longo. Máximo permitido: 500 caracteres."}
            }
        }

        
        if('password' in form){
            if(cond) {
                if(form.password != form.confirm_password){
                    return {status: false, error: "A senhas são diferentes."}
                }
            }
            if(form.password.length > 255){
                return {status: false, error: "O campo senha deve conter no máximo 255 caracteres."}
            }
            // else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(form.password)){
            //     return {status: false, error: 'A senha deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais!'};
            // }
        }


        if('privacy' in form){
            if(!form.privacy){
                return {status: false, error: 'Você deve concordar com nossas políticas de privacidades.'}
            }
        }

        return {status: true}
    }
}


export default new ValidationFieldsUser()