import {cassInsertDB, cassSelectDB} from '../db/dbConsult'
import {timeidToDate} from '../routes/helpers'
import {types} from 'cassandra-driver'
export const createEstimulo = (projectid, estimulo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const estimuloId = estimulo.estimulo_id === '' ? types.TimeUuid.now() : estimulo.estimulo_id
      const valuesEstimulo = []
      // const stackReact = ['eda956e0-abd2-11e8-a280-5b30023e4373',
      //   'eda92fd1-abd2-11e8-8627-803ee02ad595',
      //   'eda8e1b0-abd2-11e8-9fe7-d00876816104',
      //   'eda908c2-abd2-11e8-9c1e-79ed5884cd81',
      //   'eda908c6-abd2-11e8-ab02-fba9b851f22a' ]
      const stackReact = ['eda908c6-abd2-11e8-9b02-fba9b851f22a']
      valuesEstimulo.push(estimuloId)
      valuesEstimulo.push(estimulo.name)
      valuesEstimulo.push(estimulo.url)
      // console.log(JSON.stringify(stackReact))
      valuesEstimulo.push(JSON.stringify(stackReact))
      valuesEstimulo.push(estimulo.instructions)
      // console.log(valuesEstimulo)
      const queryprojects = 'INSERT INTO analyzer.estimulo (estimulo_id, estimulo_name, url, stack_reactions, instructions) VALUES (?,?,?,?,?) '
      await cassInsertDB(queryprojects, valuesEstimulo)

      const valuesProtoSti = []
      valuesProtoSti.push(projectid)
      valuesProtoSti.push(estimuloId)
      const queryuserProjects = 'INSERT INTO analyzer.project_to_estimulo (project_id , estimulo_id ) VALUES ( ?,?) '
      await cassInsertDB(queryuserProjects, valuesProtoSti)
      resolve()
    } catch (error) {
      console.log('createProject')
      reject(error)
    }
  })
}

export const getEstimulo = (projectID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryUserProjects = 'SELECT * FROM analyzer.project_to_estimulo  WHERE project_id = ?;'
      const valuesProjStim = []
      valuesProjStim.push(projectID)
      const estimulosKeys = await cassSelectDB(queryUserProjects, valuesProjStim)
      valuesProjStim.push(projectID)
      const estimulosdata = await cassSelectDB('select * from analyzer.estimulo')

      // console.log(estimulosdata)
      const obj = {}
      estimulosKeys.forEach((e, k) => {
        const date = timeidToDate(e.estimulo_id.toString())
        estimulosdata.forEach((e2, k2) => {
          if (e.estimulo_id.toString() === e2.estimulo_id.toString()) {
            obj[e.estimulo_id.toString()] = {
              id: e.estimulo_id.toString(),
              name: e2.estimulo_name,
              config: e2.numInfo,
              url: e2.url,
              date
              // fecha: getDateObj(e.estimulo_id.toString())
            }
          }
        })
      })
      // console.log(obj)
      resolve(obj)
    } catch (error) {
      console.log('getProjects', error)
      reject(error)
    }
  })
}
export const getOneEstimulus = idEstimulo => {
  return new Promise(async (resolve, reject) => {
    try {
      const estimulo = await cassSelectDB('select * from  analyzer.estimulo where estimulo_id = ?', [idEstimulo])
      const stackReact = await cassSelectDB('select * from  analyzer.reactions')
      const reactions = []
      // console.log('estimulo', estimulo)
      JSON.parse(estimulo[0].stack_reactions).forEach((e) => {
        stackReact.forEach((reaction) => {
          if (reaction.reaction_id.toString() === e.toString()) {
            const react = {
              id: e.toString(),
              emoji: reaction.reaction,
              nombre: reaction.name
            }
            reactions.push(react)
          }
        })
      })
      const obj = {
        url: estimulo[0].url,
        name: estimulo[0].estimulo_name,
        stackreact: {
          tipo: 'emoji',
          reactions
        },
        instructions: estimulo[0].instructions
      }
      resolve(obj)
    } catch (error) {
      console.log('getOneEstimulus', error)
      reject(error)
    }
  })
}
