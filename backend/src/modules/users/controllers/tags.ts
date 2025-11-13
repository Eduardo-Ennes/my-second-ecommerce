import { Request, Response } from 'express'
import Knex from '../../../infrastructure/config/postgres'
import ValidationFieldsRequisits from '../validations/validationFieldsRequisits'
import repositorieTags from '../repositories/tags'



// TECHNOLOGIE

// Função para criar referencia de uma tag de tecnologia para um curso
export async function createTechCourse(req: Request, res: Response){
    try{
        const idCouser = req.body.idCourse
        const idTech = req.body.idTech    

        const result = await repositorieTags.createReferenceTagTechnologie(idCouser, idTech)

        res.status(result.code).json(result)

    }catch(error){
        console.log(error)
        res.status(500).json({status: false, error: 'Houve um error ao registrar a tag de tecnologia no banco de dados. Tente novamente mais tarde.'})
    }
}


// Função para deletar uma referência de um curso e tecnologia, diretamente pelo id da tabela de referência entre os dois.
export async function deleteTechCourse(req: Request, res: Response){
    try{
        const id = Number(req.params.id)    // Este id é referente ao id da refêrencia criada que interliga as tabelas course e technologies. É o id da refrência criada na tabela course_technologie.

        await Knex.delete().where('id', id).from('course_technologie')

        res.status(200).json({status: true, message: 'Tecnologia deletada com sucesso.'})
    }catch(error){
        console.log(error)
        res.status(500).json({status: false, error: 'Houve um erro ao deletar a tag de tecnologia referente ao curso. Tente novamente.'})
    }
}


// Função para buscar as tags de tecnologia de um curso
export async function searchTechCourse(req: Request, res: Response){
    try{
        const idCourse = Number(req.params.id)

        const data = await Knex('course_technologie')
        .join('technologies', 'course_technologie.tech_id', '=', 'technologies.id')
        .where('course_technologie.course_id', idCourse)
        .select(
            'course_technologie.id as ref_id',
            'technologies.id as tech_id',
            'technologies.tech'
        );

        res.status(200).json({status: true, data: data})
    }catch(error){
        console.log(error)
        res.status(500).json({status: false, error: 'Houve um error ao buscar as tags de tecnologia do curso. Recarregue a página.'})
    }
}


// Requisits

// Função de criação das tags de requisitos do curso
export async function createTagRequisist(req: Request, res: Response) {
    const idCourse = Number(req.params.id)
    const requisit = req.body.requisit
    try{
        const validations = await ValidationFieldsRequisits.Fields(requisit)
        if(!validations.status){
            res.status(400).json({status: validations.status, error: validations.error})
            return
        }

        const result = await repositorieTags.createRequisit(idCourse, requisit)
        res.status(result.code).json(result)

    }catch(error){
        console.log(error)
        res.status(500).json({status: false, error: 'Houve um error ao registrar as tags de requisitos no banco de dados. Tente novamente.'})
    }
}


// Função para deleção de um requisito de um curso
export async function deleteRequisitCourse(req: Request, res: Response){
    try{
        const id = Number(req.params.id)

        await Knex.delete().where('id', id).from('course_requisits')

        res.status(200).json({status: true, message: 'Requisito deletado com sucesso.'})
    }catch(error){
        console.log(error)
        res.status(500).json({status: false, error: 'Houve um error ao deletar a tag de requisito no banco de dados. Tente novamente.'})
    }
}


// Função que busca os requisitos de um curso
export async function searchRequisitsCourse(req: Request, res: Response){
    try{
        const id = Number(req.params.id)

        const requisits = await Knex.select('id', 'requisit', 'course_id')
        .where('course_id', id)
        .from('course_requisits')

        res.status(200).json({status: true, data: requisits})
    }catch(error){
        console.log(error)
        res.status(500).json({status: false, error: 'Houve um error ao buscar as tags de requisitos no banco de dados. Recarregue a página.'})
    }
}
