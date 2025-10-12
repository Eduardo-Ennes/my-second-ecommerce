import express from 'express'
const router = express.Router()
import { createUser} from '../services/user'


router.post('/create/user', createUser)


export default router