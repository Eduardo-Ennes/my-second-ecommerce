import express from 'express'
const router = express.Router()
import { createUser, loginUser, getCacheUser, logouth } from '../controllers/user'


router.get('/search/cache/user', getCacheUser)
router.post('/create/user', createUser)
router.post('/login', loginUser)
router.delete('/logouth', logouth)


export default router