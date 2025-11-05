import express from 'express'
const router = express.Router()
import { createTechCourse, 
    searchTechCourse, 
    deleteTechCourse,
    createTagRequisist,
    searchRequisitsCourse,
    deleteRequisitCourse } from '../controllers/tags'

    
// Technologie
router.post('/create/reference/course/tag/technologie', createTechCourse)   // Cria, IDS sendo passados pelo corpo da requisição
router.get('/search/tags/technologies/course/:id', searchTechCourse)        // Busca
router.delete('/delete/tag/technologie/course/:id', deleteTechCourse)       // Deleta

// Requisits
router.post('/create/course/tag/requisit/:id', createTagRequisist)      // Cria
router.get('/search/tags/requisits/course/:id', searchRequisitsCourse)  // Busca
router.delete('/delete/tag/requisit/course/:id', deleteRequisitCourse)  // Deleta

export default router