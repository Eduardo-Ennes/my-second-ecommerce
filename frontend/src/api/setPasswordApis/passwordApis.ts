export async function setPasswordApis(){
    try{
        const response = await fetch('http://localhost:3000/send/password/apis', {
            method: 'GET',
        })

        const data = await response.json()
        localStorage.setItem('passwordApis', data.passwordApi)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}