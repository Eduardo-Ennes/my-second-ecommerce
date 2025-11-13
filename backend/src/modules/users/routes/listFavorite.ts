import express from 'express'
const router = express.Router()
import listFavorite from '../controllers/listFavorite'

router.post('/add/favorite/:id', listFavorite.createRef)
router.delete('/delete/favorite/:id', listFavorite.deleteRef)

export default router
