import express from 'express'
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
const router = express.Router()
import { createTechCourse, 
    searchTechCourse, 
    deleteTechCourse,
    createTagRequisist,
    searchRequisitsCourse,
    deleteRequisitCourse } from '../controllers/dashTagsTechnologiesAnsRequisits'

    
// Technologie
router.post('/create/reference/course/tag/technologie', authenticationUser, createTechCourse)   // Cria, IDS sendo passados pelo corpo da requisição
router.get('/search/tags/technologies/course/:id', authenticationUser, searchTechCourse)        // Busca
router.delete('/delete/tag/technologie/course/:id', authenticationUser, deleteTechCourse)       // Deleta

// Requisits
router.post('/create/course/tag/requisit/:id', authenticationUser, createTagRequisist)      // Cria
router.get('/search/tags/requisits/course/:id', authenticationUser, searchRequisitsCourse)  // Busca
router.delete('/delete/tag/requisit/course/:id', authenticationUser, deleteRequisitCourse)  // Deleta

export default router