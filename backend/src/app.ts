import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import knex from './infrastructure/config/postgres'
import redisClient from './infrastructure/config/redisClient'
// import swaggerUi from 'swagger-ui-express'
// import swaggerJsdoc from "swagger-jsdoc";


// Routes
import routerUser from './modules/users/routes/routesUser'
import routerCourse from './modules/users/routes/routesCourse'
import routerGetCourse from './modules/users/routes/routesGetCourse'
import routesCourseModules from './modules/users/routes/routesCourseModule'
import routesCourseLeassons from './modules/users/routes/routesCourseLeasson'
import routesCourseFile from './modules/users/routes/routesCourseFile'
import routerTags from './modules/users/routes/routesTags'


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routerUser)
app.use(routerCourse)
app.use(routerGetCourse)
app.use(routerTags)
app.use(routesCourseModules)
app.use(routesCourseLeassons)
app.use(routesCourseFile)


// Conexão com o postgres e inicialização da aplicação
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
