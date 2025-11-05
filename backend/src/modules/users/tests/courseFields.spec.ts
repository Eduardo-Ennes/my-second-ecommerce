import ValidationCorse from '../validations/validationFieldsCourse'

const Course = {
    name: 'Curso de python do básico ao avançado',
    image: 'kugfugfiygiyg/wrtghwrth/whtwrh',
    price: 139.99,
    price_promotion: 29.99,
    promotion: true,
    technologies: [{name: 'python'}, {name: 'Django'}, {name: 'Mysql'}],
    requisits: [{name: 'Ser um bosta'}, {name: 'Ser um merda'}],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Donec ac sapien at felis.'
}


describe('Name -> teste do nome do curso', () => {
    it('Deve retornar: error de campo com mais de 75 caracteres', async () => {
        const longName = 'A'.repeat(76)
        const validation = await ValidationCorse.Fields({...Course, name: longName})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Nome pode conter apenas até 75 caracteres.')
    })

    it('Deve retornar: error de campo vazio', async () => {
        const validation = await ValidationCorse.Fields({...Course, name: ''})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Nome não pode ser vazio.')
    })
})


describe('Price -> teste do preço do curso', () => {
    it('Deve retornar: error de preço menor que R$10,00', async () => {
        const validation = await ValidationCorse.Fields({...Course, price: 9.99})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Preço mínimo do curso deve ser R$10,00 reais.')
    })

    it('Deve retornar: error de preço maior que R$200,00', async () => {
        const validation = await ValidationCorse.Fields({...Course, price: 200.01})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Preço máximo do curso deve ser R$200,00 reais.')
    })
})


describe('Price Promotion -> teste do preço promocional do curso', () => {
    it('Deve retornar: error de preço promocional menor que R$0,00', async () => {
        const validation = await ValidationCorse.Fields({...Course, price_promotion: -1})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Preço promocional não pode ser menor que R$0 reais')
    })  

    it('Deve retornar: error de preço promocional maior que o preço original', async () => {
        const validation = await ValidationCorse.Fields({...Course, price_promotion: 140})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Preço promocional não pode ser maior do que o valor original do curso. Preço promocional: R$140 | Preço original R$139.99.')
    })
})


describe('Promotion -> teste do campo promoção do curso', () => {
    it('Deve retornar: error de campo promoção diferente de boolean', async () => {
        const validation = await ValidationCorse.Fields({...Course, promotion: 'true' as any})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Houve um error ao declarar opção promocional!')
    })
})


describe('Description -> teste do campo description do curso', () => {
    it('Deve retornar: error de campo com mais de 3000 caracteres', async () => {
        const longDescription = 'A'.repeat(3001) 
        const validation = await ValidationCorse.Fields({...Course, description: longDescription})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('A descrição deve conter no máximo 3000 caracteres.')
    })

    it('Deve retornar: error de campo vazio', async () => {
        const validation = await ValidationCorse.Fields({...Course, description: ''})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('A descrição não pode ser vazio.')
    })
})


describe('All Fields -> teste de todos os campos do curso', () => {
    it('Deve retornar: status true', async () => {
        const validation = await ValidationCorse.Fields(Course)
        expect(validation.status).toBe(true)
    })  
})