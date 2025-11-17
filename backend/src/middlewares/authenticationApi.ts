import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();


export async function authenticationApi(req: Request, res: Response, next: NextFunction) {
    // Está é a senha salva para autenticação
    const passwordApi = process.env.PASSWORD_REQ_API
    // Está será a senha que virá pela requisição
    let PasswordApiRequest = req.headers['passwordapis']
    if(!PasswordApiRequest){
        PasswordApiRequest = ''
    }

    console.log('ATIVOU!!')
    console.log(passwordApi)
    console.log(PasswordApiRequest)
    
    const isMatch = await bcrypt.compare(passwordApi as string, PasswordApiRequest as string)
    if(!isMatch){
        res.status(401).json({status: false, error: 'Requisição maliciosa!'})
        return;
    }

    next()
}