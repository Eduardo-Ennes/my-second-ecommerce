import express from 'express'
const router = express.Router()

import getCourseAndTagTechnologies from '../controllers/getCourseAndTechnologies'

router.get('/search/course/all/tags/technologies', getCourseAndTagTechnologies.searchAllTagTechnologies)
router.get('/search/all/courses', getCourseAndTagTechnologies.searchAllCourses)
router.get('/search/course/filter/tag/tecnologie/:id', getCourseAndTagTechnologies.searchCoursesFilterTag)
router.get('/search/course/image/:name', getCourseAndTagTechnologies.getImageCourse)
router.get('/search/course/filter/:name', getCourseAndTagTechnologies.searchCourseFilterName)
router.get('/search/course/detail/:id', getCourseAndTagTechnologies.searchDetailCourse)

export default router