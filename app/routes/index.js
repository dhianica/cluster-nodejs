import express from 'express'
import dotenv from 'dotenv'
import testRouter from './test.routes'

dotenv.config()

const router = express.Router()

// Router posting
router.use('/test', testRouter)

export default router
