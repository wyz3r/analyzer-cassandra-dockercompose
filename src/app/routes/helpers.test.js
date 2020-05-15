// import * as admin from 'firebase-admin'
// import {parseUser} from './helpers'

// jest.mock('firebase-admin', () => {
//   const Mockcert = jest.fn()
//   const mockAuth = jest.fn(() => {
//     const mockValidate = jest.fn(() => {

//     })
//   })
//   return {
//     mockAuth,
//     Mockcert,
//     initializeApp: jest.fn(() => 200),
//     credential: {
//       cert: (...params) => Mockcert(...params)
//     }
//   }
// })
// describe('Testing helper modules ', () => {
//   it('parse funtion  ', async () => {
//     try {
//       const result = await parseUser()
//       console.log(result)
//     } catch (error) {
//       console.log(error)
//     }
//   })
// })
