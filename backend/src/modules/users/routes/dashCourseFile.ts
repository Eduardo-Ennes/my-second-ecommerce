import express from 'express'
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
import {authenticationApi} from '../../../middlewares/authenticationApi'
import { multerConfigFile } from '../../../middlewares/multerFile'
import multer from 'multer'
const router = express.Router()

const uploadFile = multer(multerConfigFile)


// Este arquivo de router é para as operações que envolvem arquivos de uma determinada aula 

import { createFile, searchFiles, deleteFile, fileUpload } from '../controllers/dashCourseFile'

router.post('/create/course/file/:id', authenticationApi, authenticationUser, uploadFile.single('file'), createFile)
router.get('/search/course/files/:id', authenticationApi, authenticationUser, searchFiles)
router.delete('/delete/course/file/:id', authenticationApi, authenticationUser, deleteFile)
router.get('/upload/file/:name', authenticationApi, authenticationUser, fileUpload)

export default router