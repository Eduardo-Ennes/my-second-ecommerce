import express from 'express'
const router = express.Router()
import listFavorite from '../controllers/listFavorite'
import card from '../controllers/card'

router.post('/add/favorite/:id', listFavorite.createRef)
router.delete('/delete/favorite/:id', listFavorite.deleteRef)

router.post('/add/course/card/:id', card.add)
router.get('/search/courses/card', card.getCard)
router.delete('/del/course/card/:id', card.del)

export default router
