type user = {
    first_name: string
    last_name: string
    cpf: string
    email: string
    phone: string
    password: string 
    confirm_password: string
    privacy: boolean
}

type LoginUser = {
    email: string
    password: string 
}


class ApisUser {
    async CacheUser(){
        try{
            const response = await fetch('http://localhost:3000/search/cache/user', {
                method: 'GET',
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return {status: false, error: 'Houve um error ao buscar o cache do usuário. Falha na conexão com o servidor.', code: 500}
        }
    }


    async CreateUser(form: user) {
        try{
            const response = await fetch('http://localhost:3000/create/user', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json',
                },
                body: JSON.stringify(form)
            })
            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao criar o usuário. Falha na conexão com o servidor.'}
        }
    }


    async LoginUser(form: LoginUser){
        try{
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(form)
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao realizar o login. Falha na conexão com o servidor.'}
        }
    }

    async logouthUser(){
        try{
            const response = await fetch('http://localhost:3000/logouth', {
                method: 'DELETE'
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao realizar o logouth. Falha na conexão com o servidor.'}
        }
    }
}

export default new ApisUser()