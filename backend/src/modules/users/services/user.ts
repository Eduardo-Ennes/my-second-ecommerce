import { Request, Response } from 'express'
import ValidationFieldsUser from '../validations/validationFieldsUser'
import RegisterUser from '../repositories/RegisterUser'


type FormUser = {
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
    cpf?: string
    image?: string
    password?: string
    confirm_password?: string
}

export async function createUser(req: Request, res: Response) {
  const elements = req.body

  Object.keys(elements).forEach(key => {
    if (typeof elements[key] === 'string') {
      elements[key] = elements[key].trim();
    }
  });

  try{
    const result = await ValidationFieldsUser.Fields(elements)
    if(!result.status){
      res.status(400).json(result)
    }
    const save = await RegisterUser.CreateUser(elements)
    if(!save){
      res.status(save.code).json(save)
    }

    res.status(save.code).json(save)
  }catch(error){
    console.log(error)
    res.status(500).json({status: false, message: 'Houve um error inesperado. Tente novamente.'})
  }
}
