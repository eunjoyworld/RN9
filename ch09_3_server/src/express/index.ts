import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

export const createExpressServer = () => {
  const app = express()
  return app
    .use(express.static('public')) // static file server
    .use(cors())
    .use(bodyParser.json()) // for 'Content-Type': 'application/json'
}
