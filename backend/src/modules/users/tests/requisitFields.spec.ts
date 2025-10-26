import ValidationRequisits from '../validations/validationFieldsRequisits'


describe('Requisits -> teste do campo requisitos do curso', () => { 
    it('Deve retornar: error de campo com mais de 75 caracteres', async () => {
        const longString = 'A'.repeat(76)
        const validation = await ValidationRequisits.Fields(longString)
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('O campo de requisito do curso deve possuir no máximo 75 caracteres.')
    })

    it('Deve retornar: error de campo vazio', async () => {
        const validation = await ValidationRequisits.Fields('')
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('O campo requisito não pode ser vazio.')
    })

    it('Todos devem dar certo: requisitos do curso', async () => {
        const validation = await ValidationRequisits.Fields('Ter conhecimentos em lógica de programação.')
        expect(validation.status).toBe(true)
    })
})