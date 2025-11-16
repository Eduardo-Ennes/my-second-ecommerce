import { Request, Response } from 'express'
import redisClient from '../../../infrastructure/config/redisClient'
import validationFieldsUser from '../validations/fieldsUser'
import repositorieUser from '../repositories/user'
import { verifyCardLogin } from '../utils/loginVerifyCardUser'


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
    const result = await validationFieldsUser.Fields(elements, true)
    if(!result.status){
      res.status(400).json(result)
    }
    const save = await repositorieUser.CreateUser(elements)
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
  try{
    const elements: FormUser = req.body
    const result = await validationFieldsUser.Fields(elements, false)
    if(!result.status){
      res.status(400).json(result)
    }

    const response = await repositorieUser.LoginUser(elements)
    if(!response.status){
      res.status(response.code).json(response)
      return;
    }
   
    const exist = await verifyCardLogin(response.id)
    console.log(response)
    console.log(exist)
    res.status(200).json(exist)
  }catch(error){
    res.status(500).json({status: false, message: 'Houve um error inesperado. Tente novamente.'})
  }
}


export async function getCacheUser(req: Request, res: Response) {
    try{
      const cacheUser = await redisClient.get('user')
      // verificamos se há algum usuário logado.
      if(cacheUser != null){
        // se sim, retornamos o objeto que foi criado no login com as informações do usuário
        const user = JSON.parse(cacheUser.toString())
        res.status(200).json({status: true, user: user.login})
      }
      else{
        // se não, criamos este objeto
        await redisClient.set('user', JSON.stringify({login: false}))
        const noUser = await redisClient.get('user')
        const user = JSON.parse(noUser.toString())
        res.status(200).json({status: true, user: user.login})
      }
    }catch(error){
      console.log(error)
      res.status(500).json({status: false, message: 'Houve um error inesperado. Tente novamente.'})
    }
  }


// Por enquanto url de teste: Depois reutilizar para a funcionalidade LOGOUTH
export async function logouth(req: Request, res: Response){
  try{
    await redisClient.del('user')
    await redisClient.del('card')
    res.status(200).json({status: true})
  }catch(error){
    console.log(error)
    res.status(500).json({status: false, error: 'Houve um erro, não foi possivel realizar o logouth.'})
  }
}