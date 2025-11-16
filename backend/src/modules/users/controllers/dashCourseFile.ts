import { Request, Response } from 'express'
import Knex from '../../../infrastructure/config/postgres'
import redisClient from '../../../infrastructure/config/redisClient'
import path from 'path'
import fs from 'fs'


// Irei acessar o banco de dados diretamente destas funções, por ser um código relativamente pequeno, acredito não ser necessário criar um arquivo de separado.


export async function createFile(req: Request, res: Response) {
    try{
        const id = Number(req.params.id)
        const cacheFile = await redisClient.get('cacheFile')
        const cacheErrorFile = await redisClient.get('cacheErrorFile')

        if(cacheErrorFile !== null){
            res.status(400).json({status: false, error: cacheErrorFile})
            return;
        }
        
        await Knex.insert({
            file: cacheFile,
            leasson_id: id
        }).from('course_files')

        res.status(200).json({status: true, message: 'Arquivo salvo com sucesso.'})
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um error ao salvar o arquivo.'})
    }
}


export async function searchFiles(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        const files = await Knex.select('*').where({leasson_id: id}).from('course_files')

        for(const element of files){
            (element as any).url = `http://localhost:3000/upload/file/${element.file}`;
        }

        res.status(200).json({status: true, data: files})
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um error ao buscar os arquivo.'})
    }
}


export async function deleteFile(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        console.log(id)
        const data = await Knex.select('file')
        .where({id: id}).from('course_files').first()

        const file = path.resolve(__dirname, `../files/${data.file}`)
        fs.unlinkSync(file)

        await Knex.delete()
        .where({id: id})
        .from('course_files')

        res.status(200).json({status: true, message: 'Arquivo deletado com sucesso.'})
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um error ao deletar o arquivo.'})
    }
}


export async function fileUpload(req: Request, res: Response){
    try{
        const name = req.params.name
        const basePath = path.resolve(__dirname, "../files/");
        const filePath = path.join(basePath, name);

        const normalizedPath = path.normalize(filePath);
        if (!normalizedPath.startsWith(basePath)) {
            return res.status(400).json({status: false, message: "Caminho de arquivo inválido."});
        }

        if(!fs.existsSync(filePath)){
            res.status(500).json({status: false}) 
            return;
        }

        res.download(filePath)
    }catch(error){
        res.status(500).json({status: false, error: 'Houve um error ao realizar o download do arquivo.'})
    }
}