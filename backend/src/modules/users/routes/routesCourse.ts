import express from 'express'
import {multerConfig} from '../../../middlewares/multer'
import multer from 'multer'
const router = express.Router()
import { 
    createCourse, 
    searchTagstechnologies, 
    searchUserAllCouses, 
    searchUserCourseById, 
    updateCourse
    } from '../services/course'

// Cria a instância do multer usando sua config
const upload = multer(multerConfig)


router.post('/create/course', createCourse)
router.get('/search/technologies', searchTagstechnologies)
router.get('/search/user/courses', searchUserAllCouses)
router.get('/search/user/course/:id', searchUserCourseById)

router.put('/update/course/:id', upload.single('file'), updateCourse) // o id está sendo passado no formulário


export default router