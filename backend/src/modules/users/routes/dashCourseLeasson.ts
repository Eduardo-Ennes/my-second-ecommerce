// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
import { multerConfigLeasson } from '../../../middlewares/multerLeasson'
import multer from 'multer'
import express from 'express'
const router = express.Router() 

const uploadLeasson = multer(multerConfigLeasson)

// Este arquivo de router é para as operações que envolvem as aulas do curso 

import { createLeasson, deleteLeasson, getVideoLeasson, updateLeasson, searchDetailLeasson } from '../controllers/dashCourseLeasson'

router.post('/create/course/leasson', authenticationUser, uploadLeasson.single('file'), createLeasson)
router.put('/update/course/leasson/:id', authenticationUser, uploadLeasson.single('file'), updateLeasson)
router.get('/search/course/detail/leasson/:id', authenticationUser, searchDetailLeasson)
router.get('/search/course/leasson/:name', authenticationUser, getVideoLeasson)
router.delete('/delete/course/leasson/:id', authenticationUser, deleteLeasson)

export default router