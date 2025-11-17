import express from 'express'
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
import {authenticationApi} from '../../../middlewares/authenticationApi'
const router = express.Router()

// Este arquivo de router é para as operações que envolvem os módulos do curso e um especial comentado logo abaixo


import { createModule, searchDetailModule, updateModule, deleteModule, searchAll} from '../controllers/dashCourseModule'

// ! Busca todos os módulos e as aulas de um determinado curso para exibição
router.get('/search/course/leassons/:id', authenticationApi, authenticationUser, searchAll)


router.post('/create/course/module', authenticationApi, authenticationUser, createModule)
router.get('/search/course/detail/module/:id', authenticationApi, authenticationUser, searchDetailModule)
router.post('/update/course/module', authenticationApi, authenticationUser, updateModule)
router.delete('/delete/course/module/:id', authenticationApi, authenticationUser, deleteModule)


export default router