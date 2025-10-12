import ValidationFieldsUser from '../validations/validationFieldsUser'

const validUser = {
  first_name: 'Eduardo',
  last_name: 'Ennes',
  email: 'eduardo@teste.com',
  phone: '21985699658',
  cpf: '15350946056', 
  image: 'path/to/image.jpg',
  password: 'Eduardo123@#$@#$',
  confirm_password: 'Eduardo123@#$@#$'
};


describe('First_name -> Teste da função ValidationFieldsUser', () => {
    it('Deve retornar: error de campo com mais de 75 caracteres', async () => {
        const longName = 'A'.repeat(76)
        const validation = await ValidationFieldsUser.Fields({...validUser, first_name: longName})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('O campo nome deve ter no máximo 75 caracteres.')
    })

    it('Deve retornar: erro de campo vazio', async () => {
        const validation = await ValidationFieldsUser.Fields({...validUser, first_name: ''})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('O campo nome não pode ser vazio.')
    })
})


describe('Last_name -> Teste da função ValidationFieldsUser', () => {
    it('Deve retornar: error de campo com mais de 75 caracteres', async () => {
        const longName = 'A'.repeat(76)
        const validation = await ValidationFieldsUser.Fields({...validUser, last_name: longName})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('O campo sobrenome deve ter no máximo 75 caracteres.')
    })

    it('Deve retornar: erro de campo vazio', async () => {
        const validation = await ValidationFieldsUser.Fields({...validUser, last_name: ''})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('O campo sobrenome não pode ser vazio.')
    })
})


describe('Email -> Teste da função ValidationFieldsUser', () => {
    it('Deve retornar: erro de campo com mais de 100 caracteres', async () => {
        const longName = 'A'.repeat(101)
        const validation = await ValidationFieldsUser.Fields({...validUser, email: longName})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('O campo email deve ter no máximo 100 caracteres.')
    })

    it('Deve retornar: erro de campo vazio', async () => {
        const validation = await ValidationFieldsUser.Fields({...validUser, email: ''})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('O campo email não pode ser vazio.')
    })

    it('Deve retornar: email inválido devido a falta do @', async () => {
        const validation = await ValidationFieldsUser.Fields({...validUser, email: 'eduardo.teste.com'})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Email inválido!')
    })

    it('Deve retornar: email inválido devido a falta do .com', async () => {
        const validation = await ValidationFieldsUser.Fields({...validUser, email: 'eduardo@teste.br'})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Email inválido!')
    })
})


describe('Phone -> Teste da função ValidationFieldsUser', () => {
    it('Deve retornar: erro número inválido devido a ter mais de 11 caracteres', async () => {
        const longNumber = '3'.repeat(12)
        const validation = await ValidationFieldsUser.Fields({...validUser, phone: longNumber})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Número inválido.')
    })

    it('Deve retornar: erro número inválido devido a ter menos de 11 caracteres', async () => {
        const smallNumber = '3'.repeat(5)
        const validation = await ValidationFieldsUser.Fields({...validUser, phone: smallNumber})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Número inválido.')
    })

    it('Deve retornar: erro número não pode conter caracteres', async () => {
        const validation = await ValidationFieldsUser.Fields({...validUser, phone: '21925k68565'})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('O campo número não pode conter letras.')
    })
})


describe('Cpf -> Teste da função ValidationFieldsUser', () => {
    it('Deve retornar: erro de campo com mais de 11 caracteres', async () => {
        const longNumber = '3'.repeat(12)
        const validation = await ValidationFieldsUser.Fields({...validUser, cpf: longNumber})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Cpf deve conter exatamente 11 dígitos!')
    })

    it('Deve retornar: erro de campo com menos de 11 caracteres', async () => {
        const smallNumber = '3'.repeat(5)
        const validation = await ValidationFieldsUser.Fields({...validUser, cpf: smallNumber})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Cpf deve conter exatamente 11 dígitos!')
    })

    it('Deve retornar: erro de cpf inválido.', async () => {
        const validation = await ValidationFieldsUser.Fields({...validUser, cpf: '12345678900'})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('Cpf inválido!')
    })
})


describe('Imagem -> Teste da função ValidationFieldsUser', () => {
    it('Deve retornar: erro de imagem muito pesada ou longa.', async () => {
        const longName = 'A'.repeat(501)
        const validation = await ValidationFieldsUser.Fields({...validUser, image: longName})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('O caminho da imagem é muito longo. Máximo permitido: 500 caracteres.')
    })
})


describe('Senhas -> Teste da função ValidationFieldsUser', () => {
    it('Deve retornar: erro de senhas diferentes.', async () => {
        const validation = await ValidationFieldsUser.Fields({...validUser, password: 'eduardo', confirm_password: 'edward'})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('A senhas são diferentes.')
    })

    it('Deve retornar: erro de campo com mais de 255 caracteres.', async () => {
        const longName = 'A'.repeat(256)
        const validation = await ValidationFieldsUser.Fields({...validUser, password: longName, confirm_password: longName})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('O campo senha deve conter no máximo 255 caracteres.')
    })

    it('Deve retornar: erro de campo senha com formato incorreto.', async () => {
        const validation = await ValidationFieldsUser.Fields({...validUser, password: '', confirm_password: ''})
        expect(validation.status).toBe(false)
        expect(validation.error).toBe('A senha deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais!')
    })
})


describe('Envio de todos os campoos -> Teste da função ValidationFieldsUser, deve retornar true', () => {
    it('Deve retornar: true, teste de dados válidos', async () => {
        const validation = await ValidationFieldsUser.Fields(validUser)
        expect(validation.status).toBe(true)
    })
})