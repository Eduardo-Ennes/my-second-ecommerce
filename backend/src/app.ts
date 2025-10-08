import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import knex from './infrastructure/config/connection'
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

app.get("/", (req, res) => {
    res.status(200).json({name: "Olá, mundo!"})
})

// Inicialização do redis, conexão com o postgres e inicialização da aplicação
redisClient.connect()
    .then(() => {
        console.log("Redis inciailizado com sucesso!")

        knex.raw('SELECT 1')
        .then(() => {
            console.log("Conexão com o banco postgres realizada com sucesso!")

            app.listen(process.env.PORT, () => {
                console.log("Servidor iniciado com sucesso!")
                console.log(`Rodando na porta ${process.env.PORT}`)
            })
        })
        .catch((error) => {
            console.log('Error ao se conectar com o postgres!')
            console.log(`Error: ${error}`)
        })
    })
    .catch((error) => {
        console.log("Erro ao inicializar o redis.")
        console.log(`ERROR: ${error}`)
    })
