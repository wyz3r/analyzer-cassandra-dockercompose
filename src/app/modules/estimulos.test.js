// import {cassInsertDB, cassSelectDB} from '../db/dbConsult'
// import {createEstimulo, getEstimulo} from './estimulos'

// jest.mock('../db/dbConsult', () => {
//   const cassInsertDB = jest.fn((query, array) => {
//     return new Promise((resolve, reject) => {
//       if (array.length === 2) {
//         resolve()
//         return
//       }
//       const error = 400
//       reject(error)
//     })
//   })
//   const cassSelectDB = jest.fn((query, values) => {
//     return new Promise((resolve, reject) => {
//       if (query === 'SELECT * FROM analyzer.user_projects  WHERE user_id = ?;') {
//         resolve([
//           {user_id: 'RRIYM7MYVcRQwH5lsuCkd8f1T9H2', project_id: 'abfa0f40-8c34-11e8-9ee9-b98b8ae99b7e'},
//           {user_id: 'RRIYM7MYVcRQwH5lsuCkd8f1T9H2', project_id: '1be9bb51-9056-11e8-8bb0-78cc3639ae11'},
//           {user_id: 'RRIYM7MYVcRQwH5lsuCkd8f1T9H2', project_id: 'fe8f5c00-911c-11e8-99d9-4e078ef1987c'},
//           {user_id: 'RRIYM7MYVcRQwH5lsuCkd8f1T9H2', project_id: '82ae4be0-911d-11e8-8c7d-33203ceb2b25'}])
//         return
//       }
//       if (query === 'SELECT * FROM analyzer.projects;') {
//         resolve([
//           {project_id: 'abfa0f40-8c34-11e8-9ee9-b98b8ae99b7e', config: null, project_name: 'Proyecto D'},
//           {project_id: 'fe8f5c00-911c-11e8-99d9-4e078ef1987c', config: null, project_name: 'proyecto de muestras'},
//           {project_id: '1be9bb51-9056-11e8-8bb0-78cc3639ae11', config: null, project_name: 'nombre clave'},
//           {project_id: '82ae4be0-911d-11e8-8c7d-33203ceb2b25', config: null, project_name: 'proyecto de muestras'},
//           {project_id: 'abf9e83d-8c34-11e8-a267-75ea15cd3950', config: null, project_name: ' Proyecto B'}
//         ])
//       }
//     })
//   })
//   return {
//     cassInsertDB,
//     cassSelectDB
//   }
// })
// describe('create estimulo ', async () => {
//   it('Prueba de happypath para crear proyectos ', async () => {
//     const mockProject = {
//       name: 'proyecto de muestras'
//     }
//     const mockUserInfo = {uid: 'RRIYM7MYVcRQwH5lsuCkd8f1T9H2'}
//     await createProject(mockUserInfo, mockProject)
//     expect(cassInsertDB).toHaveBeenCalledTimes(2)
//     expect(cassInsertDB).toHaveBeenCalledWith('INSERT INTO analyzer.projects (project_id, project_name) VALUES (?,?) ', expect.any(Array))
//     expect(cassInsertDB).toHaveBeenCalledWith('INSERT INTO analyzer.user_projects (user_id , project_id ) VALUES ( ?,?) ', expect.any(Array))
//   })

//   it('error al no pasar correctamente los argumentos', async () => {
//     try {
//       await createProject()
//     } catch (error) {
//       // console.log(error.TypeError)
//       expect(error.TypeError).toEqual(undefined)
//     }
//   })
// })
