import { multerConfigLeasson } from '../../../middlewares/multerLeasson'
import multer from 'multer'
import express from 'express'
const router = express.Router() 

const uploadLeasson = multer(multerConfigLeasson)

// Este arquivo de router é para as operações que envolvem as aulas do curso 

import { createLeasson, deleteLeasson, getLeasson, updateLeasson, searchDetailLeasson } from '../controllers/courseLeasson'

router.post('/create/course/leasson', uploadLeasson.single('file'), createLeasson)
router.put('/update/course/leasson/:id', uploadLeasson.single('file'), updateLeasson)
router.get('/search/course/detail/leasson/:id', searchDetailLeasson)
router.get('/search/course/leasson/:name', getLeasson)
router.delete('/delete/course/leasson/:id', deleteLeasson)

export default router