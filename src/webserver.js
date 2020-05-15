import express from 'express'
import { appRouter } from './app/routes/routes'
// import {cassInsertDB, cassSelectDB} from './app/db/dbConsult'

import bodyParser from 'body-parser'

const app = express()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, id, projectid, estimuloid')
  next()
})
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  console.log('hello pocket api ')
  res.status(200).send('hello pocket api')
})

app.listen(8081, () => {
  console.log('common everybodys')
  logger.info(`listening in port ${8081}`)
})
app.use(appRouter)

export default app
