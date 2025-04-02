import type { Request, Response, NextFunction } from 'express'
import dayjs from 'dayjs'

export class Res {
  status: number
  data: any

  constructor(status: number = 200, data: any) {
    this.status = status
    this.data = data
  }
}

export function logger(req: Request, res: Response, next: NextFunction): void {
  const startTime = dayjs()
  res.on('finish', () => {
    const endTime = dayjs()
    const duration = endTime.diff(startTime)
    console.log(`${req.ip} [${endTime.format()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`)
  })
  next()
}

export function handler(fn: (req: Request) => Promise<Res>): (req: Request, res: Response) => Promise<void> {
  return async (req, res) => {
    try {
      const result = await fn(req)
      res.status(result.status).json(result.data)
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.stack)
      } else {
        console.error(err)
      }
      res.status(500).send()
    }
  }
}
