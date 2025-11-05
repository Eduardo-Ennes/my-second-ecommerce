import express from 'express'
const router = express.Router()
import { createUser, loginUser, getCacheUser, reset } from '../controllers/user'


router.post('/reset', reset)
router.get('/cache/users', getCacheUser)
router.post('/create/user', createUser)
router.post('/login', loginUser)


export default router