import express from 'express'
import { multerConfigFile } from '../../../middlewares/multerFile'
import multer from 'multer'
const router = express.Router()

const uploadFile = multer(multerConfigFile)


// Este arquivo de router é para as operações que envolvem arquivos de uma determinada aula 

import { createFile, searchFiles, deleteFile, fileUpload } from '../controllers/courseFile'

router.post('/create/course/file/:id', uploadFile.single('file'), createFile)
router.get('/search/course/files/:id', searchFiles)
router.delete('/delete/course/file/:id', deleteFile)
router.get('/upload/file/:name', fileUpload)

export default router