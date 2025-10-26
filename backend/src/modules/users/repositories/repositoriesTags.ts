import Knex from '../../../infrastructure/config/postgres'

type Response = {
    status?: boolean
    error?: string
    message?: string
    code?: number
}

class RepositorieTagsCourse {
    // Função que cria um requisito
    async createRequisit(idCourse: number, requisit: string): Promise<Response>{
        try{    
            await Knex.insert({
                requisit: requisit,
                course_id: idCourse
            }).from('course_requisits')

            return {status: true, message: 'Requisito cadastrados com sucesso.', code: 200}
        }catch(error){
            console.log(error)
            return {status: false, error: 'Houve um error ao salvar todo ou parte das tags ou requisitos. Tente novamente mais tarde ou atualize os campos.', code: 500}
        }
    }


    async createReferenceTagTechnologie(idCouser: number, idTech: number): Promise<Response> {
        try{    
            const exist = await Knex('course_technologie')
            .where({ course_id: idCouser, tech_id: idTech })

            if(exist.length > 0){
                return {status: false, error: 'Esta tecnologia já está refrenciada ao curso.', code: 400}
            }


            await Knex.insert({
                course_id: idCouser,
                tech_id: idTech
            }).from('course_technologie')

            return {status: true, message: 'Tecnologia cadastrada com sucesso.', code: 200}
        }catch(error){
            console.log(error)
            return {status: false, error: 'Houve um error ao salvar todo ou parte das tags ou requisitos. Tente novamente mais tarde ou atualize os campos.', code: 500}
        }
    }
}

export default new RepositorieTagsCourse()