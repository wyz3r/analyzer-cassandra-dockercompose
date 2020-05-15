import { Router } from 'express'
import {saveFile} from '../awsinteractios/awsinit'
import {parseUser} from './helpers'
// import fs from 'fs'
import tempfile from 'tempfile'

// import Excel from 'exceljs'
// import { runInNewContext } from 'vm'
import {createProject, getProjects, getCategorys} from '../modules/proyectos'
import {createEstimulo, getEstimulo, getOneEstimulus} from '../modules/estimulos'
import {addAnswers, getInformantesByEstimulo} from '../modules/informante'
// import {getReactions} from '../modules/reactions'
import {createExcel} from '../modules/excel'

import {createUser} from '../modules/users'
// import { cassInsertDB } from '../db/dbConsult'
export const appRouter = Router()

appRouter.post('/addMultimedia', async (req, res) => {
  const { filetype, name } = req.body
  if (!filetype || !name) {
    res.status(400).end()
    return
  }
  const url = await saveFile(`proyecto/${name}`, filetype)
  res.json(url)
})

// appRouter.use(async (req, res, next) => {
//   try {
//     await parseUser(id)
//     next()
//   } catch (error) {
//     console.log({error})
//     if (error.code === 'auth/argument-error') {
//       res.sendStatus(401)
//       return
//     }
//     res.sendStatus(400)
//   }
// })
// administracion user request
appRouter.get('/getprojects', async (req, res) => {
  const {id} = req.headers
  try {
    if (!id) {
      // res.status(400).end()
      res.status(400).send('id undefiined')
      return
    }
    const userInfo = await parseUser(id)
    const result = await getProjects(userInfo)
    res.json(result)
  } catch (error) {
    console.log({error})
    if (error.code === 'auth/argument-error') {
      res.sendStatus(401)
      return
    }
    console.log({error})
    res.sendStatus(400)
  }
})

appRouter.get('/getCategorys', async (req, res) => {
  try {
    console.log('hello world')
    const result = await getCategorys()
    res.json(result)
  } catch (error) {
    console.log({error})
    if (error.code === 'auth/argument-error') {
      res.sendStatus(401)
      return
    }
    console.log({error})
    res.sendStatus(400)
  }
})
appRouter.post('/addProjects', async (req, res) => {
  try {
    const {id, projectPayload} = req.body
    console.log(projectPayload)
    // res.send('result')
    const userInfo = await parseUser(id)
    await createProject(userInfo, projectPayload)
    const result = await getProjects(userInfo)
    res.send(result)
  } catch (error) {
    console.log({error})
    if (error.code === 'auth/argument-error') {
      res.sendStatus(401)
      return
    }
    res.sendStatus(400)
  }
})
// users endpoints
appRouter.post('/addUsers', async (req, res) => {
  const { uid, email } = req.body
  try {
    const result = await createUser(uid, email)
    res.send(result)
  } catch (error) {
    console.log(400)
    console.log(error)
    res.sendStatus(400)
  }
})

appRouter.post('/addStimulus', async (req, res) => {
  const { projectid, estimulo } = req.body
  try {
    await createEstimulo(projectid, estimulo)
    const result = await getEstimulo(projectid)
    // console.log(result)
    // res.sendStatus(200)
    res.send(result)
  } catch (error) {
    console.log(400)
    console.log(error)
    res.sendStatus(400)
  }
})

appRouter.get('/getStimulus', async (req, res) => {
  const {projectid} = req.headers
  try {
    if (!projectid) {
      // res.status(400).end()
      res.status(400).send('id undefiined')
      return
    }
    // const userInfo = await parseUser(id)
    const result = await getEstimulo(projectid)
    res.json(result)
  } catch (error) {
    console.log({error})
    if (error.code === 'auth/argument-error') {
      res.sendStatus(401)
      return
    }
    console.log({error})
    res.sendStatus(400)
  }
})
appRouter.get('/getOneStimulus', async (req, res) => {
  const {estimuloid} = req.headers
  try {
    if (!estimuloid) {
      // res.status(400).end()
      res.status(400).send('id undefiined')
      return
    }
    // const userInfo = await parseUser(id)
    const result = await getOneEstimulus(estimuloid)
    // res.json(result)
    res.json(result)
  } catch (error) {
    console.log({error})
    if (error.code === 'auth/argument-error') {
      res.sendStatus(401)
      return
    }
    console.log({error})
    res.sendStatus(400)
  }
})

appRouter.post('/addInformante', async (req, res) => {
  const {comments, userid, estimuloid} = req.body
  console.log('addInformante')
  try {
    const result = await addAnswers(comments, userid, estimuloid)
    // comments.forEach((element) => console.log(Math.round(element.momento)))
    res.sendStatus(result)
  } catch (error) {
    console.log(error)
  }
})

appRouter.post('/getData', async (req, res) => {
  const {estimuloid} = req.body
  try {
    console.log('get data from estimulo', estimuloid)
    const result = await getInformantesByEstimulo(estimuloid)
    res.send(result)
  } catch (error) {
    console.log(error)
  }
})

appRouter.get('/getExcel/:estimuloid', async (req, res) => {
  try {
    const {estimuloid} = req.params
    const exreg = new RegExp('[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}')
    if (!exreg.test(estimuloid)) {
      res.status(403).send('id invalido')
      return false
    }
    console.log('get excel', estimuloid)
    const result = await getInformantesByEstimulo(estimuloid)
    if (result) {
      const workbook = await createExcel(result)
      var options = {
        dateFormats: ['DD/MM/YYYY HH:mm:ss']
      }
      var tempFilePath = tempfile('.xlsx')
      workbook.xlsx.writeFile(tempFilePath, options).then(() => {
        res.setHeader('Content-Disposition', 'attachment; filename=' + estimuloid + '.xlsx')
        res.setHeader('Content-Transfer-Encoding', 'binary')
        res.setHeader('Content-Type', 'application/octet-stream')
        res.sendFile(tempFilePath, function (err) {
          if (err) {
            console.log('---------- error downloading file: ', err)
            res.status(204).send("Sorry! You can't see that.")
          } else {
            console.log('file is written')
          }
        })
      })
    } else {
      res.status(400).send('información no encontrada')
    }
  } catch (error) {
    console.log('getExcel', error)
    res.sendStatus(500)
  }
})
