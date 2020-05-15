import {cassInsertDB} from '../db/dbConsult'

export const createUser = (uid, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = 'INSERT INTO analyzer.users (user_id , mail ) VALUES ( ?,?)'
      const result = await cassInsertDB(query, [uid, email])
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}
