import express from 'express'
const router = express.Router()
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
import {authenticationApi} from '../../../middlewares/authenticationApi'
import listFavorite from '../controllers/favorite'
import card from '../controllers/card'

// Neste routes eu coloquei as rotas da lista de favoritos e carrinho de compras, por ser poucas rotas

router.post('/add/favorite/:id', authenticationApi, authenticationUser, listFavorite.create)
router.get('/search/list/favorite', authenticationApi, listFavorite.get)
router.delete('/delete/favorite/:id', authenticationApi, authenticationUser, listFavorite.delete)

router.post('/add/course/card/:id', authenticationApi, card.add)
router.get('/search/courses/card', authenticationApi, card.get)
router.delete('/del/course/card/:id', authenticationApi, card.del)

export default router
