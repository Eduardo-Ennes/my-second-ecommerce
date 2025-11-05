type createLeasson = {
    name: string
    video: string | File
}

class ApiCourseLeasson {
    // Cria um aula 
    async createLeasson(idModule: number | null, form: createLeasson){
        try{
            const formData = new FormData()
            formData.append('name', form.name)
            formData.append('idModule', idModule?.toString() ?? '' )
            if(form.video instanceof File){
                formData.append('file', form.video)
            }

            const response = await fetch('http://localhost:3000/create/course/leasson', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao criar a aula, falha na conexão com o servidor, tente novamente.'}
        }
    }


    // Busca dados de uma aula
    async searchDetailLeasson(id: number | null){
        try{
            const response = await fetch(`http://localhost:3000/search/course/detail/leasson/${id}`, {
                method: 'GET'
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao buscar as informações da aula, falha na conexão com o servidor, tente novamente.'}
        }
    }

    
    // Atualiza uma aula 
    async updateLeasson(id: number, form: {name: string, file: string | File, position: number}){
        try{
            const formData = new FormData()
            formData.append('name', form.name)
            if(form.file){
                formData.append('file', form.file)
            }
            formData.append('position', String(form.position))

            const response = await fetch(`http://localhost:3000/update/course/leasson/${id}`, {
                method: 'PUT',
                body: formData
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao atualizar a aula, falha na conexão com o servidor, tente novamente.'}
        }
    }


    // Deleta uma aula 
    async deleteLeasson(id: number | null){
        try{
            const response = await fetch(`http://localhost:3000/delete/course/leasson/${id}`, {
                method: 'DELETE'
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            console.log('aqui')
            return{status: false, error: 'Houve um error ao deletar a aula, falha na conexão com o servidor.'}
        }
    }
}


export default new ApiCourseLeasson()