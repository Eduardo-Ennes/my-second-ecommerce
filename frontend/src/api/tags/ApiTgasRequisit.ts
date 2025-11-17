class ApiTagsRequisit {
    async create(idCourse: number | null, requisit: string){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/create/course/tag/requisit/${idCourse}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'passwordapis': passwordApis || ''
                },
                body: JSON.stringify({requisit: requisit})
            })

            const data = response.json()
            return data
        }catch(error){
            console.log(error)
            return {status: false, error: 'Error ao criar o requisito do curso, falha na conexão com o servidor.'}
        }
    }


    async delete(id: number | null){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/delete/tag/requisit/course/${id}`, {
                method: 'DELETE',
                headers: {
                    'passwordapis': passwordApis || ''
                },
            })

            const data = response.json()
            return data
        }catch(error){
            console.log(error)
            return {status: false, error: 'Error ao deletar o requisito do curso, falha na conexão com o servidor.'}
        }
    }


    async search(id: number | null){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/search/tags/requisits/course/${id}`, {
                method: 'GET',
                headers: {
                    'passwordapis': passwordApis || ''
                },
            })

            const data = response.json()
            return data
        }catch(error){
            console.log(error)
            return {status: false, error: 'Error ao buscar os requisitos do curso, falha na conexão com o servidor.'}
        }
    }
}


export default new ApiTagsRequisit()