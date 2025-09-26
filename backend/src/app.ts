import express from 'express'
import cors from 'cors'
// import swaggerUi from 'swagger-ui-express'
// import swaggerJsdoc from "swagger-jsdoc";
import dotenv from 'dotenv'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.listen(process.env.PORT, () => {
    console.log("Servidor iniado com sucesso!")
    console.log(`Rodando na porta ${process.env.PORT}`)
})