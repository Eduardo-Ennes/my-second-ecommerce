type Course = {
  name: string
  price: number
  price_promotion?: number
  promotion: string
  description: string
}


class ApiCourse{
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
}


export default new ApiCourse()