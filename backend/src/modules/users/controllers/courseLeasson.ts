import { Request, Response } from 'express'
import repositorieCourseLeasson from '../repositories/courseLeasson'
import redisClient from '../../../infrastructure/config/redisClient'
import fs from 'fs';
import path from 'path'


// Criar uma aula
export async function createLeasson(req: Request, res: Response){
    try{
        const cacheErrorLeasson = await redisClient.get('cacheErrorLeasson')
        if(cacheErrorLeasson != null){
            // Tem caido todas as vezes nesta exceção, mesmo com a imagem sendo criada 
            const error = cacheErrorLeasson
            await redisClient.del('cacheErrorLeasson')
            res.status(400).json({status: false, error: error})
            return;
        }

        const cacheLeasson = await redisClient.get('cacheLeasson')
        const videoPath = path.resolve(__dirname, `../videoLeassons/${cacheLeasson}`)

        if(fs.existsSync(videoPath)){
            const form = {
                idModule: req.body.idModule,
                name: req.body.name.trim(),
                video: typeof cacheLeasson === 'string' ? cacheLeasson: ''
            }

            // Esta validação está aqui por que é apenas para dois campos, achei desnecessário criar um arquivo apenas para validar.
            if(form.name.length > 75){
                res.status(400).json({status: false, error: 'O nome da aula deve conter no máximo 75 caracteres.'})
                await redisClient.del('cacheErrorLeasson')
                await redisClient.del('cacheLeasson')
                return;
            }
            else if(form.name.length < 1){
                res.status(400).json({status: false, error: 'O nome do curso não pode ser vazio.'})
                await redisClient.del('cacheErrorLeasson')
                await redisClient.del('cacheLeasson')
                return;
            }
            else if(form.video == ''){
                res.status(500).json({status: false, error: 'Houve um erro inesperado e a aula não pode ser salva. Tente novamente.'})
                await redisClient.del('cacheErrorLeasson')
                await redisClient.del('cacheLeasson')
                return;
            }


            const result = await repositorieCourseLeasson.createLeasson(form.idModule, form.name, form.video)
            res.status(result.code).json(result)
        }
        else{
            res.status(400).json({status: false, error: 'A imagem pode conter no máximo 1.5 GB.'})
            return;
        }
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um erro ao criar a aula.'})
    }
}


// Busca uma aula para atualização
export async function searchDetailLeasson(req: Request, res: Response){
    try{
        const id = Number(req.params.id)

        // Aqui nos apagamos o cache do video para que o campo sempre esteja vazio quando for atualizado, não causará problemas com arquivos enviados anteriormente.
        await redisClient.del('cacheLeasson')

        const result = await repositorieCourseLeasson.searchDetailLeasson(id)
        res.status(result.code).json(result)
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um erro ao buscar a aula. Tente novamente.'})
    }
}


// Atualiza uma aula
export async function updateLeasson(req: Request, res: Response){
    try{
        if(req.body.name.length > 75){
            res.status(400).json({status: false, error: 'O nome da aula pode conter no máximo 75 caracteres.'})
            return;
        }
        else if(req.body.name.length < 1){
            res.status(400).json({status: false, error: 'O nome do curso não pode ser vazio.'})
            return;
        }
        else if(req.body.position > 100 && req.body.position < 0){
            res.status(400).json({status: false, error: 'Só pode haver 100 aulas dentro de cada módulo.'})
            return;
        }

        const id = Number(req.params.id)
        var form: {
            name: string,
            position: number
            file?: string
        } = {
            name: req.body.name,
            position: Number(req.body.position)
        }
        const cacheLeasson = await redisClient.get('cacheLeasson')
        if(cacheLeasson && cacheLeasson.length > 0){
            form = {...form, file: cacheLeasson.toString()}
        }

        const result = await repositorieCourseLeasson.updateLeasson(id, form)
        res.status(result.code).json(result)

    }catch(error){
        console.log(error)
        res.status(500).json({status: false, error: 'Houve um erro ao atualizar a aula.'})
    }
}


// Deletar uma aula 
export async function deleteLeasson(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        
        const response = await repositorieCourseLeasson.deleteLeasson(id)
        if(!response.status){
            res.status(response.code).json(response)
            return;
        }

        res.status(response.code).json(response)
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um erro ao deletar a aula. Tente novamente.'})
    }
}


// Fornece o video diretamente para produção da aula
export async function getLeasson(req: Request, res: Response){
    try{
        const name = req.params.name
        const leassonPath = path.resolve(__dirname, `../videoLeassons/${name}`)
        if(!fs.existsSync(leassonPath)){
            res.status(404).json({status: false, error: 'Não foi possivel carregar a aula.'})
            return;
        }

        res.status(200).sendFile(leassonPath);
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um erro ao buscar a aula.'})
    }
}