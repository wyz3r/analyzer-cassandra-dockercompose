import {cassSelectDB} from '../db/dbConsult'

export const getReactionsByEstimulo = (estimuloid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = 'SELECT stack_reactions FROM analyzer.estimulo WHERE estimulo_id = ?'
      const stackReact = await cassSelectDB(query, [estimuloid])
      const stackJson = JSON.parse(stackReact[0].stack_reactions)

      const queryReaction = 'SELECT * FROM analyzer.reactions WHERE reaction_id in ?'
      const reactions = await cassSelectDB(queryReaction, [stackJson])

      const reactionById = []

      reactions.forEach(element => {
        const {reaction_id, name, reaction, tipo} = element
        reactionById[reaction_id] = {name: name, reaction: reaction, tipo: tipo}
      })

      resolve(reactionById)
    } catch (error) {
      reject(error)
    }
  })
}
