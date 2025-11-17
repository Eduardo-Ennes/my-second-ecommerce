

// Nesta classe temos duas funções padões: 1- busca as tags de tecnologia para servir de filtro para pesquisas, 2 - padrão que busca todos os cursos para exibir na tela inicial, 3 e 4 - são funções de filtros de pesquisa por tag de tecnologia ou nome digitado.  
class ApiSearchCoursesAndTechnologies{
    // Busca todas as tags de tecnologia para filtrar os cursos
    async searchAllTagsTechnologies(){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch('http://localhost:3000/search/course/all/tags/technologies', {
                method: 'GET',
                headers: {
                    'passwordapis': passwordApis || ''
                }
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Error ao buscar as tags de tecnologia, falha na conexão com o servidor. '}
        }
    }


    // Busca todos os cursos para exibir na tela inicial
    async SearchAllCourses(){
        try{
            const passwordApis = localStorage.getItem('passwordApis')

            const response = await fetch('http://localhost:3000/search/all/courses', {
                method: 'GET',
                headers: {
                    'passwordapis': passwordApis || ''
                }
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Error ao buscar os cursos, falha na conexão com o servidor.'}
        }
    }


    // Busca cursos relacionados a tag selecionada
    async SearchCourseByTag(id: number | null){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/search/course/filter/tag/tecnologie/${id}`, {
                method: 'GET',
                headers: {
                    'passwordapis': passwordApis || ''
                }
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Error ao filtrar os cursos pela tecnologia, falha na conexão com o servidor.'}
        }
    }


    // Busca cursos pelo nome
    async SearchCoursesByName(name: string){
        try{
            const passwordApis = localStorage.getItem('passwordApis')
            const response = await fetch(`http://localhost:3000/search/course/filter/${name}`, {
                method: 'GET',
                headers: {
                    'passwordapis': passwordApis || ''
                },
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Error ao buscar os cursos pelo nome digitado, falha na conexão com o servidor.'}
        }
    }
}


export default new ApiSearchCoursesAndTechnologies()