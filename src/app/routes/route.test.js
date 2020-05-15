import {appRouter} from './routes'
import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import {saveFile} from '../awsinteractios/awsinit'
import {parseUser} from './helpers'
import {createProject, getProjects} from '../modules/proyectos'
// import { equal } from 'assert';

const app = express()
app.use(bodyParser.json())
app.use(appRouter)

jest.mock('../awsinteractios/awsinit', () => {
  return {
    saveFile: jest.fn(() => 200)
  }
})
jest.mock('./helpers', () => {
  return {
    parseUser: jest.fn(() => {
      return {uid: 'RRIYM7MYVcRQwH5lsuCkd8f1T9H2'}
    })
  }
})
jest.mock('../modules/proyectos', () => {
  return {
    getProjects: jest.fn((userInfo) => {
      return expect.any(JSON)
    }),
    createProject: jest.fn((userInfo, projectPayload) => {
    })
  }
})
describe('Testing service endpoint /addMultimedia AWS', () => {
  const mockPayload = {name: 'Eventloop3.jpg', filetype: ' image/jpeg'}
  it('addMultimedia errorRequest 400 payload undefined  name and filetype', (done) => {
    request(app).post('/addMultimedia').send()
      .then((response) => {
        expect(saveFile).not.toHaveBeenCalled()
        expect(response.statusCode).toBe(400)
        done()
      })
  })
  it('addMultimedia ok 200 ', (done) => {
    request(app).post('/addMultimedia').send(mockPayload)
      .then((response) => {
        // const saveFile = jest.fn()
        expect(saveFile).toHaveBeenCalled()
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})

describe('Testing service endpoint /getProjects', () => {
  it('getProjects id undefined error 400  ', (done) => {
    request(app).get('/getProjects')
      .then((response) => {
        expect(parseUser).not.toHaveBeenCalled()
        expect(getProjects).not.toHaveBeenCalled()
        expect(response.statusCode).toBe(400)
        done()
      })
  })
  it('getProjects ok 200 ', (done) => {
    request(app).get('/getProjects')
      .set({id: expect.any(String)})
      .then((response) => {
        expect(parseUser).toHaveBeenCalledWith(expect.any(String))
        expect(getProjects).toHaveBeenCalledWith({uid: 'RRIYM7MYVcRQwH5lsuCkd8f1T9H2'})
        expect(response.status).toBe(200)
        done()
      })
  })
})

describe('Testing service endpoint /addProjects', () => {
  // it('getProjects id undefined error 400  ', (done) => {
  //   request(app).post('/getProjects')
  //     .then((response) => {
  //       expect(parseUser).not.toHaveBeenCalled()
  //       expect(getProjects).not.toHaveBeenCalled()
  //       expect(response.statusCode).toBe(400)
  //       done()
  //     })
  // })
  it('addProjects ok 200 ', (done) => {
    const mockPayload = {
      name: 'el proyecto'
    }
    const id = expect.any(String)
    request(app).post('/addProjects')
      .send({id, projectPayload: mockPayload})
      .then((response) => {
        expect(parseUser).toHaveBeenCalledWith(expect.any(String))
        expect(createProject).toHaveBeenCalledWith({uid: 'RRIYM7MYVcRQwH5lsuCkd8f1T9H2'}, mockPayload)
        expect(getProjects).toHaveBeenCalledWith({uid: 'RRIYM7MYVcRQwH5lsuCkd8f1T9H2'})
        expect(response.status).toBe(200)
        done()
      })
  })
})
