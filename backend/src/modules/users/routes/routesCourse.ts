import express from 'express'
import {multerConfig} from '../../../middlewares/multer'
import multer from 'multer'
const router = express.Router()

import { createCourse, searchTagstechnologies, searchUserAllCouses, searchUserCourseById, updateCourse} from '../controllers/course'

import getCourseAndTagTechnologies from '../controllers/getCourseAndTechnologies'

// Cria a instância do multer usando sua config
const upload = multer(multerConfig)


// Course
router.post('/create/course', createCourse)
router.get('/search/technologies', searchTagstechnologies)
router.get('/search/user/courses', searchUserAllCouses)
router.get('/search/user/course/:id', searchUserCourseById)
router.put('/update/course/:id', upload.single('file'), updateCourse)


// getCourse
router.get('/search/course/all/tags/technologies', getCourseAndTagTechnologies.searchAllTagTechnologies)
router.get('/search/all/courses', getCourseAndTagTechnologies.searchAllCourses)
router.get('/search/course/filter/tag/tecnologie/:id', getCourseAndTagTechnologies.searchCoursesFilterTag)
router.get('/search/course/image/:name', getCourseAndTagTechnologies.getImageCourse)
router.get('/search/course/filter/:name', getCourseAndTagTechnologies.searchCourseFilterName)

export default router