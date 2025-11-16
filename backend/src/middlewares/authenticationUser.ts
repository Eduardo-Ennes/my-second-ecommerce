import {Request, Response, NextFunction} from 'express';
import redisClient from '../infrastructure/config/redisClient';

export async function authenticationUser(req: Request, res: Response, next: NextFunction) {
    try{    
        const cacheUser = await redisClient.get('user')
        const user = await JSON.parse(cacheUser.toString())

        if(!user.login){
            res.status(401).json({status: false, error: 'Usuário não autenticado.', code: 401})
            return;
        }

        next();
    }catch(error){
        res.status(401).json({status: false, error: 'Houve um problema na autenticação do usuário.', code: 401})
        return;
    }
}