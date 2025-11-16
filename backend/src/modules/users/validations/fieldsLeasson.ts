type ResponseValidation = {
    status: boolean
    error?: string
    code?: number
}


class validationsFieldsLeasson {
    async Fields (name: string, position: number): Promise<ResponseValidation> {
        if(name.length > 75){
            return {status: false, error: 'O nome da aula pode conter no máximo 75 caracteres.', code: 400}
        }
        else if(name.length < 1){
            return {status: false, error: 'O nome da aula não pode ser vazio.', code: 400}
        }
        else if(position > 100 && position < 0){
            return {status: false, error: 'A posição da aula deve estar entre 0 e 100.', code: 400}
        }
    }
}


export default new validationsFieldsLeasson()