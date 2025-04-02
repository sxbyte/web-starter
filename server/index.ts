import express from 'express'
import { Res, logger, handler } from './lib/express-tools.js'

const router = express.Router()

router.use(express.json())
router.use(logger)

// prefix: /api
router.get('/', handler(async (_req) => {
  return new Res(200, 'app')
}))

export default router
