import express from 'express'
const router = express.Router()

// Este arquivo de router é para as operações que envolvem os módulos do curso e um especial comentado logo abaixo


import { createModule, searchDetailModule, updateModule, deleteModule, searchAll} from '../controllers/courseModule'

// ! Busca todos os módulos e as aulas de um determinado curso para exibição
router.get('/search/course/leassons/:id', searchAll)


router.post('/create/course/module', createModule)
router.get('/search/course/detail/module/:id', searchDetailModule)
router.post('/update/course/module', updateModule)
router.delete('/delete/course/module/:id', deleteModule)


export default router