type updateModule = {
    id: number | null 
    name: string
    position: number 
}


class ApiCourseModule {
    // Cria um módulo
    async createModule(idCourse: number | null, name: string, position: number){
        try{
            const response = await fetch('http://localhost:3000/create/course/module',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    id: idCourse,
                    name: name,
                    position: position
                })
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao criar o módulo, falha na conexão com o servidor, tente novamente.'}
        }
    }


    // Busca dados de um módulo
    async searchModule(id: number | null){
        try{
            const response = await fetch(`http://localhost:3000/search/course/detail/module/${id}`, {
                method: 'GET'
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao atualizar o módulo, falha na conexão com o servidor, tente novamente.'}
        }
    }


    // Atualiza um módulo
    async updateModule(form: updateModule){
        try{
            console.log(form) // Aqui mostra em objeto
            // Id é passado pelo formulário
            const response = await fetch('http://localhost:3000/update/course/module', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    id: form.id,
                    name: form.name,
                    position: form.position
                })
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao atualizar o módulo, falha na conexão com o servidor, tente novamente.'}
        }
    }


    // Deleta um módulo
    async deleteModule(id: number | null){
        try{
            console.log(id)
            const response = await fetch(`http://localhost:3000/delete/course/module/${id}`, {
                method: 'DELETE'
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao deletar o módulo, falha na conexão com o servidor, tente novamente.'}
        }
    }


    // Busca todas os módulos e aulas do curso para serem exibidos.
    async searchAll(id: number | null){
        try{
            const response = await fetch(`http://localhost:3000/search/course/leassons/${id}`, {
                method: 'GET'
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao buscar as aulas, falha na conexão com o servidor, tente novamente.'}
        }
    }
}



export default new ApiCourseModule()