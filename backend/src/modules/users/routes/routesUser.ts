import express from 'express'
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
// middleware de autenticação do usuário logado
import { authenticationLogadoUser } from '../../../middlewares/authenticationLoginUser'
const router = express.Router()
import { createUser, loginUser, getCacheUser, logouth } from '../controllers/user'


router.get('/search/cache/user', getCacheUser)

// Porque deste middleware?
// Apenas pode acessar o login e create user quem não está logado
router.post('/login', authenticationLogadoUser, loginUser)
router.post('/create/user', authenticationLogadoUser, createUser)

// Apenas pode acessar o logouth quem está logado
router.delete('/logouth', authenticationUser, logouth)


export default router