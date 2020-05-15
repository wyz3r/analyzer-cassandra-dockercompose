import {cassInsertDB, cassSelectDB} from '../db/dbConsult'
import {timeidToDate} from '../routes/helpers'
import {types} from 'cassandra-driver'
export const createProject = (userInfo, projectPayload) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(types.TimeUuid.now().toString())
      const projectid = types.TimeUuid.now()
      const valuesprojects = []
      valuesprojects.push(projectid)
      valuesprojects.push(projectPayload.name)
      valuesprojects.push(projectPayload.description)
      valuesprojects.push(JSON.stringify(projectPayload.brand))
      valuesprojects.push(JSON.stringify(projectPayload.currentCategory))

      const queryprojects = 'INSERT INTO analyzer.projects (project_id, project_name, description, marcas,categoria ) VALUES (?,?,?,?,?) '
      await cassInsertDB(queryprojects, valuesprojects)

      const valuesuserProjects = []
      valuesuserProjects.push(userInfo.uid)
      valuesuserProjects.push(projectid)
      const queryuserProjects = 'INSERT INTO analyzer.user_projects (user_id , project_id ) VALUES ( ?,?) '
      await cassInsertDB(queryuserProjects, valuesuserProjects)
      resolve()
    } catch (error) {
      console.log('createProject')
      reject(error)
    }
  })
}

export const getProjects = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryUserProjects = 'SELECT * FROM analyzer.user_projects  WHERE user_id = ?;'
      const UserProjectsvalues = []
      UserProjectsvalues.push(userInfo.uid)
      const projectsKeys = await cassSelectDB(queryUserProjects, UserProjectsvalues)
      const queryProjects = 'SELECT * FROM analyzer.projects;'
      const allProjects = await cassSelectDB(queryProjects)
      const queryEstimulos = 'SELECT * FROM analyzer.project_to_estimulo;'
      const estimulos = await cassSelectDB(queryEstimulos)
      // console.log(estimulos)
      const obj = {}
      projectsKeys.forEach((e, k) => {
        const date = timeidToDate(e.project_id.toString())
        allProjects.forEach((e2, k2) => {
          if (e.project_id.toString() === e2.project_id.toString()) {
            // console.log(e2.marcas)
            // console.log('haas')
            obj[e.project_id.toString()] = {
              id: e.project_id.toString(),
              name: e2.project_name,
              config: e2.config,
              desc: e2.description,
              date,
              brand: e2.marcas !== null ? JSON.parse(e2.marcas) : [],
              category: e2.categoria !== null ? JSON.parse(e2.categoria) : [],
              numStim: estimulos.filter(stm => {
                return (stm.project_id.toString() === e.project_id.toString())
              }).map(e => e).length
            }
          }
        })
      })
      // console.log(obj)
      // console.log(allProjects)
      resolve(obj)
    } catch (error) {
      console.log('getProjects', error)
      reject(error)
    }
  })
}

export const getCategorys = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const obj = {}
      const category = await cassSelectDB('SELECT * FROM analyzer.categorys;')
      obj['categorys'] = category.map((cat) => {
        return cat.categorys_name
      })
      resolve(obj)
    } catch (error) {
      console.log('getMarcas', error)
      reject(error)
    }
  })
}
