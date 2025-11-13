class DetailCourse {
    // Busca dados de um curso, usuário e lista de favoritos
    async searchCourse(id: number){
        try{
            const response = await fetch(`http://localhost:3000/search/course/detail/${id}`, {
                method: 'GET'
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao buscar os detalhes do curso. Falha na conexão com o servidor.'}
        }
    }


    // Adiciona um curso a lista de favoritos
    async addListFavorite(id: number){
        try{
            const response = await fetch(`http://localhost:3000/add/favorite/${id}`, {
                method: 'POST'
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao adicionar o curso na lista de favoritos. Falha na conexão com o servidor.'}
        }
    }


    // Deleta um curso da lista de favoritos
    async deleteListFavorite(id: number){
        try{
            const response = await fetch(`http://localhost:3000/delete/favorite/${id}`, {
                method: 'DELETE'
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao deletar o curso da lista de favoritos. Falha na conexão com o servidor.'}
        }
    }
}



export default new DetailCourse()