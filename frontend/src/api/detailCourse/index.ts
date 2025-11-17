class DetailCourse {
    // Busca dados de um curso, usuário e lista de favoritos
    async searchCourse(id: number){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/search/course/detail/${id}`, {
                method: 'GET',
                headers: {
                    'passwordapis': passwordApis || ''
                },
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao buscar os detalhes do curso. Falha na conexão com o servidor.'}
        }
    }


    // Adiciona um curso ao carrinho de compras
    async addCourseInCard(id: number){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/add/course/card/${id}`, {
                method: 'POST',
                headers: {
                    'passwordapis': passwordApis || ''
                },
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao adicionar o curso no carrinho de compras. Falha na conexão com o servidor.'}
        }
    }


    // Busca o carrinho de compras
    async searchCard(){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch('http://localhost:3000/search/courses/card', {
                method: 'GET',
                headers: {
                    'passwordapis': passwordApis || ''
                },
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao buscar as informações do carrinho de compras. Falha na conexão com o servidor.'}
        }
    }


    async deleteCourseInCard(id: number){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/del/course/card/${id}`, 
                {
                method: 'DELETE',
                headers: {
                    'passwordapis': passwordApis || ''
                },
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao remover o curso do carrinho de compras. Falha na conexão com o servidor.'}
        }
    }


    // Adiciona um curso a lista de favoritos
    async addListFavorite(id: number){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/add/favorite/${id}`, {
                method: 'POST',
                headers: {
                    'passwordapis': passwordApis || ''
                },
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao adicionar o curso na lista de favoritos. Falha na conexão com o servidor.'}
        }
    }


    async searchListFavorite(){
        try{
            console.log('API ACIONADA')
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch('http://localhost:3000/search/list/favorite', {
                method: 'GET',
                headers: {
                    'passwordapis': passwordApis || ''
                },
            })

            const data = await response.json()
            return data 
        }catch(error){
            console.log(error)
            return{status: false, error: 'Houve um erro ao buscar a lista de favoritos. Falha na conexão com o servidor.'}
        }
    }


    // Deleta um curso da lista de favoritos
    async deleteListFavorite(id: number){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/delete/favorite/${id}`, {
                method: 'DELETE',
                headers: {
                    'passwordapis': passwordApis || ''
                },
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