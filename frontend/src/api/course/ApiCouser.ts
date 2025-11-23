type Course = {
  name: string
  price: number
  price_promotion?: number
  promotion: string
  description: string
}

type CourseUpdate = {
  name: string
  image: string | File
  price: string
  price_promotion?: string
  promotion: string
  status: string
  description: string
}


class ApiCourse{
    async searchAllUserCourses(){
      try{
        const passwordApis = localStorage.getItem('passwordApis')
        const response = await fetch('http://localhost:3000/search/user/courses', {
            method: 'GET',
            headers: {
                'passwordapis': passwordApis || ''
            },
          })
    
          const data = await response.json()
          return data
      }catch(error){
        console.log(error)
        return {status: false, error: "Error ao buscar os seus cursos, falha na conexão com o servidor."}
      }
    }

    async searchDetailUserCourse(id: number){
      try{
        const passwordApis = localStorage.getItem('passwordApis')
        const response = await fetch(`http://localhost:3000/search/user/course/${id}`, {
          method: 'GET',
          headers: {
            'passwordapis': passwordApis || ''
          },
        });
    
          const data = await response.json()
          return data
      }catch(error){
        console.log(error)
        return {status: false, error: "Error ao buscar os detalhes do curso, falha na conexão com o servidor."}
      }
    }

    // API para criar um curso
    async CreateCourse(form: Course){
        try{
          const passwordApis = localStorage.getItem('passwordApis')
          const response = await fetch('http://localhost:3000/create/course', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'passwordapis': passwordApis || ''
              },
              body: JSON.stringify(form)
            })
            const data = await response.json()
            return data
        }catch(error){
          console.log(error)
          return{status: false, error: "Error ao criar o curso, falha na conexão com o servidor."}
        }
    }


    // API para atualizar um curso
    async UpdateCourse(id: number, form: CourseUpdate){
      try{
        const passwordApis = localStorage.getItem('passwordApis')
        if (!form || !id) return;
        
        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('price', form.price)
        if(form.price_promotion) formData.append('price_promotion', form.price_promotion)
        formData.append('promotion', form.promotion)
        formData.append('status', form.status)
        formData.append('description', form.description)

        // Adiciona o arquivo se existir
        if(form.image instanceof File) {
          formData.append('file', form.image)
        }

        const response = await fetch(`http://localhost:3000/update/course/${id}`, {
          method: 'PUT',
          headers: {
            'passwordapis': passwordApis || ''
          },
          body: formData
        })

        const data = await response.json()
        return data
      }catch(error){
        console.log(error)
        return {status: false, error: "Error ao atualizar o curso, falha na conexão com o servidor."}
      }
    }
}


export default new ApiCourse()