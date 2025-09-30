import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// import swaggerUi from 'swagger-ui-express'
// import swaggerJsdoc from "swagger-jsdoc";
import { createClient } from "redis";


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const redisClient = createClient({
    url: "redis://redis_MySecond_Ecommerce:6379" 
})

redisClient.connect()
    .then(() => console.log("Redis inicializado com sucesso!."))
    .catch((error) => {
        console.log("Erro ao se conectar ao redis.")
        console.error("Error: ", error)
 })

app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado com sucesso!")
    console.log(`Rodando na porta ${process.env.PORT}`)
})