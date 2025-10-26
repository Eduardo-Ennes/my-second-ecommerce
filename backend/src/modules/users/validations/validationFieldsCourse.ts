type Course = {
  name: string
  price: number
  price_promotion?: number
  promotion: boolean
  technologies: { name: string }[]
  requisits: { name: string }[]
  description: string
}

type ResponseValidation = {
    status: boolean
    error?: string
}


class ValidationFieldsCorse {
    async Fields (form: Course): Promise<ResponseValidation> {
        if('name' in form){
            if(form.name.length > 75) {
                return {status: false, error: 'O nome do curso pode conter apenas 75 caracteres.'}
            }
            else if(form.name.length < 1) {
                return {status: false, error: 'Nome do curso não pode ser vazio.'}
            }
        }

        if('price' in form){
            if(form.price < 10){
                return {status: false, error: 'Preço mínimo do curso deve ser R$10,00 reais.'}
            }
            else if(form.price > 200) {
                return {status: false, error: 'Preço máximo do curso deve ser R$200,00 reais.'}
            }
        }

        if('price_promotion' in form){
            if(form.price_promotion < 0){
                return {status: false, error: 'Preço promocional não pode ser menor que R$0 reais'}
            }
            else if(form.price_promotion > form.price){
                return {status: false, error: `Preço promocional não pode ser maior do que o valor original do curso. Preço promocional: R$${form.price_promotion} | Preço original R$${form.price}.`}
            }
        }

        if('promotion' in form){
            if(typeof form.promotion !== 'boolean'){
                return {status: false, error: 'Houve um error ao declarar opção promocional!'}
            }
        }

        if('description' in form){
            if(form.description.length > 3000){
                return {status: false, error: `A descrição deve conter no máximo 3000 caracteres.`}
            }
            else if(form.description.length < 1){
                return {status: false, error: `A descrição não pode ser vazio.`}
            }
        }

        return {status: true}
    }
}


export default new ValidationFieldsCorse()