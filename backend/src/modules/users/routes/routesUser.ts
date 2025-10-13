import express from 'express'
const router = express.Router()
import { createUser, loginUser } from '../services/user'


router.post('/create/user', createUser)
router.post('/login', loginUser)


export default router