import express from 'express'
// middleware de autenticação do usuário
import {authenticationApi} from '../../../middlewares/authenticationApi'
import {searchDetailCourse} from '../controllers/detailCourse'

const router = express.Router()

// Busca apenas um curso específico para exibir seus detalhes
router.get('/search/course/detail/:id', authenticationApi, searchDetailCourse)

export default router