import { Request, Response } from 'express'
import redisClient from '../../../infrastructure/config/redisClient'
import ValidationFieldsUser from '../validations/validationFieldsUser'
import MethodsUser from '../repositories/MethodsUser'


type FormUser = {
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
    cpf?: string
    password?: string
    confirm_password?: string
}

export async function createUser(req: Request, res: Response) {
  const elements: FormUser = req.body

  Object.keys(elements).forEach(key => {
    if (typeof elements[key] === 'string') {
      elements[key] = elements[key].trim();
    }
  });

  try{
    const result = await ValidationFieldsUser.Fields(elements, true)
    if(!result.status){
      res.status(400).json(result)
    }
    const save = await MethodsUser.CreateUser(elements)
    if(!save){
      res.status(save.code).json(save)
    }

    res.status(save.code).json(save)
  }catch(error){
    console.log(error)
    res.status(500).json({status: false, message: 'Houve um error inesperado. Tente novamente.'})
  }
}


export async function loginUser(req: Request, res: Response) {
  const elements: FormUser = req.body

  try{
    const result = await ValidationFieldsUser.Fields(elements, false)
    if(!result.status){
      res.status(400).json(result)
    }

    const response = await MethodsUser.LoginUser(elements)
    res.status(response.code).json(response)
    
  }catch(error){
    res.status(500).json({status: false, message: 'Houve um error inesperado. Tente novamente.'})
  }
}


export async function getCacheUser(req: Request, res: Response) {
    try{
      const user = await redisClient.get('user')
      
      if(user != null){
        const cacheUser = JSON.parse(user.toString())
        res.status(200).json({status: true, user: cacheUser})
      }
      else{
        await redisClient.set('user', JSON.stringify({login: false}))
        
        const getCacheUser = await redisClient.get('user')
        const cacheUser = await JSON.parse(getCacheUser?.toString() || '{}')
        res.status(200).json({status: true, user: cacheUser})
      }
    }catch(error){
      console.log(error)
      res.status(500).json({status: false, message: 'Houve um error inesperado. Tente novamente.'})
    }
  }


// Por enquanto url de teste: Depois reutilizar para a funcionalidade LOGOUTH
export async function reset(req: Request, res: Response){
  try{
    await redisClient.del('user')
    res.json({message: 'Tudo certo!'})
  }catch(error){
    console.log(error)
    res.json({error: 'Não deletou!'})
  }
}