import express from 'express'
const router = express.Router()
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
import listFavorite from '../controllers/listFavorite'
import card from '../controllers/card'

// Neste routes eu coloquei as rotas da lista de favoritos e carrinho de compras, por ser poucas rotas decidi colocar as duas funcionalidades no mesmo arquivo

router.post('/add/favorite/:id', authenticationUser, listFavorite.createRef)
router.delete('/delete/favorite/:id', authenticationUser, listFavorite.deleteRef)

router.post('/add/course/card/:id', card.add)
router.get('/search/courses/card', card.getCard)
router.delete('/del/course/card/:id', card.del)

export default router
