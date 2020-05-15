import * as admin from 'firebase-admin'
import firebaseConf from '../video-analize.json'
import {initialFireAdmin} from './initFirebase'

jest.mock('firebase-admin', () => {
  const Mockcert = jest.fn()
  return {
    Mockcert,
    initializeApp: jest.fn(() => 200),
    credential: {
      cert: (...params) => Mockcert(...params)
    }
  }
})
// jest.mock('./initFirebase', () => {
//   return {
//     initialFireAdmin: jest.fn(() => 200)
//   }
// })
describe('Test conection whit firebase', () => {
  it('execute funtion with firebas config ', () => {
    initialFireAdmin()
    const serviceAccount = {
      projectId: firebaseConf.project_id,
      clientEmail: firebaseConf.client_email,
      privateKey: firebaseConf.private_key
    }
    expect(admin.initializeApp).toHaveBeenCalledWith({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://video-analize.firebaseio.com'
    })
  })
})
