import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import knex from './infrastructure/config/postgres'
import redisClient from './infrastructure/config/redisClient'
import dotenv from 'dotenv'
dotenv.config()
// import swaggerUi from 'swagger-ui-express'
// import swaggerJsdoc from "swagger-jsdoc";


// importações dos Routes
import routerDashCourse from './modules/users/routes/dashCourse'
import routerDashTechnologiesAndRequisits from './modules/users/routes/dashTechnologiesAndRequisits'
import routesDashCourseModules from './modules/users/routes/dashCourseModule'
import routesDashCourseLeassons from './modules/users/routes/dashCourseLeasson'
import routesDashCourseFile from './modules/users/routes/dashCourseFile'
import routerhome from './modules/users/routes/homeAndDetailCourse'
import listFavoriteAndCard from './modules/users/routes/favoriteAndCard'
import routerUser from './modules/users/routes/routesUser'
import routerDetailCourse from './modules/users/routes/detailCourse'


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routerhome)
app.use(routerDetailCourse)
app.use(routerUser)
app.use(listFavoriteAndCard)

// Router das operações da dashboard
app.use(routerDashCourse)   
app.use(routerDashTechnologiesAndRequisits)
app.use(routesDashCourseModules)
app.use(routesDashCourseLeassons)
app.use(routesDashCourseFile)


// Conexão com o postgres e inicialização da aplicação
redisClient.connect()
    .then(() => {
        console.log("Redis inciailizado com sucesso!")

        knex.raw('SELECT 1')
        .then(() => {
            console.log("Conexão com o banco postgres realizada com sucesso!")

            app.listen(process.env.PORT, async () => {
                // Eu gerei e criptografei a senha de autenticação das apis nesta etapa, por que será processada apenas uma vez, quando o servidor iniciar. 
                const passwordApis = await bcrypt.hash(process.env.PASSWORD_REQ_API, 10)
                await redisClient.set('autheticationApis', passwordApis)
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
