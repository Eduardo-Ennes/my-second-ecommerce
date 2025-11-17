import express from 'express'
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
import {authenticationApi} from '../../../middlewares/authenticationApi'
const router = express.Router()
import { createTechCourse, 
    searchTechCourse, 
    deleteTechCourse,
    createTagRequisist,
    searchRequisitsCourse,
    deleteRequisitCourse } from '../controllers/dashTagsTechnologiesAnsRequisits'

    
// Technologie
router.post('/create/reference/course/tag/technologie', authenticationApi, authenticationUser, createTechCourse)   // Cria, IDS sendo passados pelo corpo da requisição
router.get('/search/tags/technologies/course/:id', authenticationApi, authenticationUser, searchTechCourse)        // Busca
router.delete('/delete/tag/technologie/course/:id', authenticationApi, authenticationUser, deleteTechCourse)       // Deleta

// Requisits
router.post('/create/course/tag/requisit/:id', authenticationApi, authenticationUser, createTagRequisist)      // Cria
router.get('/search/tags/requisits/course/:id', authenticationApi, authenticationUser, searchRequisitsCourse)  // Busca
router.delete('/delete/tag/requisit/course/:id', authenticationApi, authenticationUser, deleteRequisitCourse)  // Deleta

export default router