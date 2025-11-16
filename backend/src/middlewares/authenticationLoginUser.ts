import {Request, Response, NextFunction} from 'express';
import redisClient from '../infrastructure/config/redisClient';

// Este middlweare é para verificar se o usuário está logado, por exemplo para operação de login e criação do usuário, apenas usuários não logados podem.

export async function authenticationLogadoUser(req: Request, res: Response, next: NextFunction) {
    try{    
        const cacheUser = await redisClient.get('user')
        const user = await JSON.parse(cacheUser.toString())

        if(user.login){
            res.status(401).json({status: false, error: `${user.first_name} ${user.last_name}, esta área é apenas para usuários não autenticados`, code: 401})
            return;
        }

        next();
    }catch(error){
        res.status(401).json({status: false, error: 'Houve um problema na autenticação do usuário.', code: 401})
        return;
    }
}