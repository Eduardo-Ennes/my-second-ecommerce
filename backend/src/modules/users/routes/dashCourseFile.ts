import express from 'express'
// middleware de autenticação do usuário
import { authenticationUser } from '../../../middlewares/authenticationUser'
import { multerConfigFile } from '../../../middlewares/multerFile'
import multer from 'multer'
const router = express.Router()

const uploadFile = multer(multerConfigFile)


// Este arquivo de router é para as operações que envolvem arquivos de uma determinada aula 

import { createFile, searchFiles, deleteFile, fileUpload } from '../controllers/dashCourseFile'

router.post('/create/course/file/:id', authenticationUser, uploadFile.single('file'), createFile)
router.get('/search/course/files/:id', authenticationUser, searchFiles)
router.delete('/delete/course/file/:id', authenticationUser, deleteFile)
router.get('/upload/file/:name', authenticationUser, fileUpload)

export default router