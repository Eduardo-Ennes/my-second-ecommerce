

// Nesta classe estão as funções que filtram os cursos por id e nome, como forma de pesquisa do usuário. E também está incluido a api que buscas as tags de tecnologia do backend para serem usadas como filtro de pesquisa.  
class ApiSearchCoursesAndTechnologies{
    async searchAllTagsTechnologies(){
        try{
            const response = await fetch('http://localhost:3000/search/course/all/tags/technologies', {
                method: 'GET'
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Error ao buscar as tags de tecnologia, falha na conexão com o servidor. '}
        }
    }


    async SearchAllCourses(){
        try{
            const response = await fetch('http://localhost:3000/search/all/courses', {
                method: 'GET'
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Error ao buscar os cursos, falha na conexão com o servidor.'}
        }
    }


    async SearchCourseByTag(id: number | null){
        try{
            const response = await fetch(`http://localhost:3000/search/course/filter/tag/tecnologie/${id}`, {
                method: 'GET' 
            })

            const data = await response.json()
            return data
        }catch(error){
            console.log(error)
            return{status: false, error: 'Error ao filtrar os cursos pela tecnologia, falha na conexão com o servidor.'}
        }
    }


    async SearchCoursesByName(name: string){
        try{
            const response = await fetch(`http://localhost:3000/search/course/filter/${name}`, {
                method: 'GET'
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