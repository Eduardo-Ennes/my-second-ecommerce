import express from 'express'
import {multerConfig} from '../../../middlewares/multer'
import { multerConfigLeasson } from '../../../middlewares/multerLeasson'
import { multerConfigFile } from '../../../middlewares/multerFile'
import multer from 'multer'
const router = express.Router()

// Importações do curso
import { createCourse, searchTagstechnologies, searchUserAllCouses, searchUserCourseById, updateCourse} from '../controllers/course'

// Importações das aulas
import { createLeasson, deleteLeasson, getLeasson, updateLeasson, searchDetailLeasson } from '../controllers/courseLeasson'

// importações do módulo
import { createModule, searchDetailModule, updateModule, deleteModule, searchAll} from '../controllers/courseModule'

// files 
import { createFile, searchFiles, deleteFile, fileUpload } from '../controllers/courseFile'

// Cria a instância do multer usando sua config
const upload = multer(multerConfig)
const uploadLeasson = multer(multerConfigLeasson)
const uploadFile = multer(multerConfigFile)

// ! Aqui neste routes está todas as rotas envolvidas com o curso em si, criação, atualização, deleção e busca, tudo que é envolvido a ele. Apenas os controllers e repositories são em documentos separados devido ao tamanho do código, para uma melhor organização e visualização.

// Course
router.post('/create/course', createCourse)
router.get('/search/technologies', searchTagstechnologies)
router.get('/search/user/courses', searchUserAllCouses)
router.get('/search/user/course/:id', searchUserCourseById)
router.put('/update/course/:id', upload.single('file'), updateCourse) // o id está sendo passado no formulário

// Daqui para baixo são sobre a estrutura do curso

// Modules
router.post('/create/course/module', createModule)
router.get('/search/course/detail/module/:id', searchDetailModule)
router.post('/update/course/module', updateModule)
router.delete('/delete/course/module/:id', deleteModule)

// Leassons
router.post('/create/course/leasson', uploadLeasson.single('file'), createLeasson)
router.put('/update/course/leasson/:id', uploadLeasson.single('file'), updateLeasson)
router.get('/search/course/detail/leasson/:id', searchDetailLeasson)
router.get('/search/course/leasson/:name', getLeasson)
router.delete('/delete/course/leasson/:id', deleteLeasson)

// Busca os módulos e as aulas para exibição
router.get('/search/course/leassons/:id', searchAll)


// files
router.post('/create/course/file/:id', uploadFile.single('file'), createFile)
router.get('/search/course/files/:id', searchFiles)
router.delete('/delete/course/file/:id', deleteFile)
router.get('/upload/file/:name', fileUpload)


export default router