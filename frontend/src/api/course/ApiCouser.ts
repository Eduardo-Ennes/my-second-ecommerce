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
        const response = await fetch('http://localhost:3000/search/user/courses', {
            method: 'GET',
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
        const response = await fetch(`http://localhost:3000/search/user/course/${id}`, {
            method: 'GET',
          });
    
          const data = await response.json()
          console.log('DATA API: ', data)
          return data
      }catch(error){
        console.log(error)
        return {status: false, error: "Error ao buscar os detalhes do curso, falha na conexão com o servidor."}
      }
    }

    // API para criar um curso
    async CreateCourse(form: Course){
        try{
          const response = await fetch('http://localhost:3000/create/course', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
              },
              body: JSON.stringify(form)
            })
            const data = await response.json()
            console.log('DATA: ', data)
            return data
        }catch(error){
          console.log(error)
          return{status: false, error: "Error ao criar o curso, falha na conexão com o servidor."}
        }
    }


    // API para atualizar um curso
    async UpdateCourse(id: number, form: CourseUpdate){
      try{
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