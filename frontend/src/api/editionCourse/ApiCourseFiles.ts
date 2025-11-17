class ApiCourseFiles {
    async createFile(id: number | null, file: string | File){
        try{
           const passwordApis = localStorage.getItem('passwordApis')
           const formData = new FormData()

           formData.append('file', file)

            const response = await fetch(`http://localhost:3000/create/course/file/${id}`, {
                method: 'POST', 
                headers: {
                    'passwordapis': passwordApis || ''
                },
                body: formData
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao criar o arquivo, falha na conexão com o servidor.'}
        }
    }

    async searchFiles(id: number | null){
         try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/search/course/files/${id}`, {
                method: 'GET',
                headers: {
                    'passwordapis': passwordApis || ''
                }, 
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao buscar os arquivo, falha na conexão com o servidor.'}
        }
    }


    async deleteFile(id: number | null){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/delete/course/file/${id}`, {
                method: 'DELETE', 
                headers: {
                    'passwordapis': passwordApis || ''
                },
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um error ao deletar o arquivo, falha na conexão com o servidor.'}
        }
    }
}


export default new ApiCourseFiles()