import express from 'express'
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
import {multerConfig} from '../../../middlewares/multer'
import multer from 'multer'
const router = express.Router()
import { createCourse, searchTagstechnologies, searchUserAllCouses, searchUserCourseById, updateCourse} from '../controllers/dashCourse'

// Esses routes são da tabela do curso do usuário e as operações do formula´rio de atualização.

// Cria a instância do multer usando sua config
const upload = multer(multerConfig)

// Busca todos os cursos do usuário para o template da dashboard
router.get('/search/user/courses', authenticationUser, searchUserAllCouses)

// Course
router.post('/create/course', authenticationUser, createCourse)
router.get('/search/technologies', authenticationUser, searchTagstechnologies)
router.get('/search/user/course/:id', authenticationUser, searchUserCourseById)
router.put('/update/course/:id', authenticationUser, upload.single('file'), updateCourse)

export default router