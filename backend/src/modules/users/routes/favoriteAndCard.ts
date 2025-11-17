import express from 'express'
const router = express.Router()
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
import {authenticationApi} from '../../../middlewares/authenticationApi'
import listFavorite from '../controllers/listFavorite'
import card from '../controllers/card'

// Neste routes eu coloquei as rotas da lista de favoritos e carrinho de compras, por ser poucas rotas decidi colocar as duas funcionalidades no mesmo arquivo

router.post('/add/favorite/:id', authenticationApi, authenticationUser, listFavorite.createRef)
router.delete('/delete/favorite/:id', authenticationApi, authenticationUser, listFavorite.deleteRef)

router.post('/add/course/card/:id', authenticationApi, card.add)
router.get('/search/courses/card', authenticationApi, card.getCard)
router.delete('/del/course/card/:id', authenticationApi, card.del)

export default router
