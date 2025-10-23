import express from 'express'
const router = express.Router()
import { createCourse, searchTagstechnologies, searchUserAllCouses, searchUserCourseById, updateCourse } from '../services/course'


router.post('/create/course', createCourse)
router.get('/search/technologies', searchTagstechnologies)
router.get('/search/user/courses', searchUserAllCouses)
router.get('/search/user/course/:id', searchUserCourseById)
router.put('/update/course/:id', updateCourse) // o id está sendo passado no formulário


export default router