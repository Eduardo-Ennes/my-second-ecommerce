import express from 'express'
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
const router = express.Router()

// Este arquivo de router é para as operações que envolvem os módulos do curso e um especial comentado logo abaixo


import { createModule, searchDetailModule, updateModule, deleteModule, searchAll} from '../controllers/dashCourseModule'

// ! Busca todos os módulos e as aulas de um determinado curso para exibição
router.get('/search/course/leassons/:id', authenticationUser, searchAll)


router.post('/create/course/module', authenticationUser, createModule)
router.get('/search/course/detail/module/:id', authenticationUser, searchDetailModule)
router.post('/update/course/module', authenticationUser, updateModule)
router.delete('/delete/course/module/:id', authenticationUser, deleteModule)


export default router