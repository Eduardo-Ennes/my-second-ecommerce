import { Request, Response } from 'express'
import validationFieldsCourse from '../validations/fieldsCourse'
import repositorieModule from '../repositories/dashCourseModule'


// Cria um módulo
export async function createModule(req: Request, res: Response){
    try{
        req.body = {...req.body, name: (req.body.name || '').trim()}

        const validation = await validationFieldsCourse.Fields(req.body)
        if(!validation.status){
            res.status(400).json(validation)
            return;
        }

        const result = await repositorieModule.createModule(Number(req.body.id), req.body.name, req.body.position)

        res.status(result.code).json(result)
    }catch(error){
        console.log(error)
        res.status(500).json({status: false, error: 'Houve um erro ao criar o módulo.'})
    }
}


// Busca dados de um módulo para atualização
export async function searchDetailModule(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        const result = await repositorieModule.searchDetailModule(id)
        res.status(result.code).json(result)
    }catch(error){
        console.log(error)
        res.status(500).json({status: false, error: 'Houve um erro ao buscar o módulo.'})
    }
}


// Atualizar um módulo
export async function updateModule(req: Request, res: Response){
    try{
        if(req.body.name.length > 75){
            res.status(400).json({status: false, error: 'O nome do módulo deve conter no máximo 75 caracteres'})
            return;
        }
        else if(req.body.name.length < 0){
            res.status(400).json({status: false, error: 'O nome do módulo não pode ser vazio.'})
            return;
        }
        else if(req.body.position > 100){
            res.status(400).json({status: false, errro: 'Apenas aceitamos a numeração até 100 do módulo.'})
            return;
        }

        const result = await repositorieModule.updateModule(req.body)
        res.status(result.code).json(result)
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um erro ao atualizar o módulo.'})
    }
}


// Deletar um módulo
export async function deleteModule(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        console.log(id)

        const response = await repositorieModule.deleteModule(id)
        res.status(response.code).json(response)
    }catch(error){
        console.log(error)
        res.status(500).json({status: false, error: 'Houve um erro ao deletar o módulo.'})
    }
}


// Busca todos os módulos e aulas para exibição
export async function searchAll(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        const response = await repositorieModule.searchAll(id)
        res.status(response.code).json(response)
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um erro ao buscar as aulas do curso.'})
    }
}