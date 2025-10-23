type Course = {
  name: string
  price: number
  price_promotion?: number
  promotion: string
  description: string
}

type CourseUpdate = {
  name: string
  price: string
  price_promotion?: string
  promotion: string
  status: string
  description: string
}


class ApiCourse{
    // API para criar um curso
    async CreateCouse(form: Course){
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
            return data
        }catch(error){
          console.log(error)
          return{status: false, error: "Error ao criar o curso, falha na conexão com o servidor."}
        }
    }


    // API para atualizar um curso
    async UpdateCourse(id: number, form: CourseUpdate){
      try{
        const response = await fetch(`http://localhost:3000/update/course/${id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify(form)
        })

        const data = await response.json()
        console.log(data)
        return data
      }catch(error){
        console.log(error)
        return {status: false, error: "Error ao atualizar o curso, falha na conexão com o servidor."}
      }
    }
}


export default new ApiCourse()