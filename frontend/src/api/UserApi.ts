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
    async CreateUser(form: user) {
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
    }

    async LoginUser(form: LoginUser){
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
    }
}

export default new ApisUser()