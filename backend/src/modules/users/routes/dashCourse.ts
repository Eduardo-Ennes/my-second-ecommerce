import express from 'express'
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
import {authenticationApi} from '../../../middlewares/authenticationApi'
import {multerConfig} from '../../../middlewares/multerImageCourse'
import multer from 'multer'
const router = express.Router()
import { createCourse, searchTagstechnologies, searchUserAllCouses, searchUserCourseById, updateCourse} from '../controllers/dashCourse'

// Esses routes são da tabela do curso do usuário e as operações do formula´rio de atualização.

// Cria a instância do multer usando sua config
const upload = multer(multerConfig)

// Busca todos os cursos do usuário para o template da dashboard
router.get('/search/user/courses', authenticationApi, authenticationUser, searchUserAllCouses)

// Course
router.post('/create/course', authenticationApi, authenticationUser, createCourse)
router.get('/search/technologies', authenticationApi, authenticationUser, searchTagstechnologies)
router.get('/search/user/course/:id', authenticationApi, authenticationUser, searchUserCourseById)
router.put('/update/course/:id', authenticationApi, authenticationUser, upload.single('file'), updateCourse)

export default router