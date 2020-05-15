import {cassInsertDB, cassSelectDB} from '../db/dbConsult'
import {getReactionsByEstimulo} from './reactions'
// import {timeidToDate} from '../routes/helpers'
// import {types} from 'cassandra-driver'

export const addAnswers = (comments, userid, estimuloid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fecha = () => new Date().getTime()
      console.log(fecha())
      const verify = await validateStart(estimuloid, userid)
      if (verify) {
        const query = 'INSERT INTO analyzer.informante (estimulo_id , infor_id , answers, start_answer ) VALUES (?, ?, ?, ?)'
        await cassInsertDB(query, [estimuloid, userid, JSON.stringify(comments), fecha()])
      } else {
        const query = 'INSERT INTO analyzer.informante (estimulo_id , infor_id , answers, finish_answer ) VALUES (?, ?, ?, ?)'
        await cassInsertDB(query, [estimuloid, userid, JSON.stringify(comments), fecha()])
      }
      resolve(200)
    } catch (error) {
      reject(error)
    }
  })
}

export const validateStart = (estimuloid, userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = 'SELECT * FROM analyzer.informante WHERE estimulo_id = ? and infor_id = ?'
      const userData = await cassSelectDB(query, [estimuloid, userid])
      resolve(userData[0] === undefined)
    } catch (error) {
      reject(error)
    }
  })
}

export const getInformantesByEstimulo = (estimuloid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = 'SELECT * FROM analyzer.informante WHERE estimulo_id = ?'
      const informantesData = await cassSelectDB(query, [estimuloid])

      if (informantesData.length > 0) {
        const stackReact = await getReactionsByEstimulo(estimuloid)

        const data = {}
        data['informantes'] = informantesData
        data['reactionsStack'] = stackReact

        resolve(data)
      } else {
        resolve(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}
