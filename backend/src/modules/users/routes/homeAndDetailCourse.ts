import express from 'express'
const router = express.Router()

import {authenticationApi} from '../../../middlewares/authenticationApi'
import getCourseAndTagTechnologies from '../controllers/homeAndDetailCourse'


// Rota que envia a password para autenticação das requisições da api
// ! Esta é a única rota que não deve possuir o middleware de autenticação, até por que ela é a responsavél por enviar o token ao frontend
router.get('/send/password/apis', getCourseAndTagTechnologies.sendPasswordApis)


// busca todas as tags de tecnologia para filtrar os cursos
router.get('/search/course/all/tags/technologies', authenticationApi, getCourseAndTagTechnologies.searchAllTagTechnologies)

// Rota padrão que busca todos os cursos para exibir na tela inicial
router.get('/search/all/courses', authenticationApi, getCourseAndTagTechnologies.searchAllCourses)

// Rota que filtra cursos pela tag de tecnologia
router.get('/search/course/filter/tag/tecnologie/:id', authenticationApi, getCourseAndTagTechnologies.searchCoursesFilterTag)

// Filtra cursos pelo nome digitado na barra de pesquisa
router.get('/search/course/filter/:name', authenticationApi, getCourseAndTagTechnologies.searchCourseFilterName)

// Rota que apenas fornece a imagem do curso
router.get('/search/course/image/:name', getCourseAndTagTechnologies.getImageCourse)

// Busca apenas um curso específico para exibir seus detalhes
router.get('/search/course/detail/:id', authenticationApi, getCourseAndTagTechnologies.searchDetailCourse)

export default router