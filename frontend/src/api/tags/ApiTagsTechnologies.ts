class ApiTagsTechnologies{
    // Função api para criação de referência de tag de tecnologia a um curso
    async create(idCourse: number | null, idTech: number){
        try{
            const response = await fetch('http://localhost:3000/create/reference/course/tag/technologie', {
                method: 'POST',
                headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
              },
              body: JSON.stringify({
                idCourse: idCourse,
                idTech: idTech
              })
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return {status: false, error: 'Error ao criar a tag de tecnologia, falha na conexão com o servidor.'}
        }
    }

    async delete(id: number){
        try{
            const response = await fetch(`http://localhost:3000/delete/tag/technologie/course/${id}`,{
                method: 'DELETE'
            })

            const data = response.json()
            return data
        }catch(error){
            console.log(error)
            return {status: false, error: 'Error ao deletar a tecnologia referente ao curso, falha na conexão com o servidor. Recarregue a página.'}
        }
    }

    // Função que busca as tecnologias referentes a um curso
    async search(id: number | null){
        try{
            const response = await fetch(`http://localhost:3000/search/tags/technologies/course/${id}`)

            const data = response.json()
            return data
        }catch(error){
            console.log(error)
            return {status: false, error: 'Error ao carregar as tecnologias do curso, falha na conexão com o servidor. Recarregue a página.'}
        }
    }
}


export default new ApiTagsTechnologies()