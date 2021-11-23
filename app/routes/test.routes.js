import express from 'express'
import testController from '../controllers/test.controllers'

const router = express.Router()
router.get('/:n', testController.index)

export default router
