import express from 'express'
const router = express.Router()
import { createCourse, searchtechnologies } from '../services/course'


router.post('/create/course', createCourse)
router.get('/search/technologies', searchtechnologies)


export default router