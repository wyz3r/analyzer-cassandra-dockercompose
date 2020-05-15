import Excel from 'exceljs'
export const createExcel = (data) => {
  return new Promise((resolve, reject) => {
    try {
      let workbook = new Excel.Workbook()
      workbook.creator = 'pocket'
      workbook.created = new Date()

      const worksheet = workbook.addWorksheet('lists', {properties: {tabColor: {argb: 'FFC0000'}}, defaultRowHeight: 30}, {views: [{xSplit: 1, ySplit: 1}]})

      worksheet.views = [{}]
      const styleMiddleft = {alignment: { vertical: 'middle', horizontal: 'left' }}
      const styleMiddCenter = {alignment: { vertical: 'middle', horizontal: 'center' }}

      worksheet.columns = [
        { header: 'Folio', key: 'folio', width: 20, style: styleMiddleft },
        { header: 'Duración', key: 'duracion', width: 20, style: styleMiddleft },
        { header: 'Inicio', key: 'inicio', width: 20, style: styleMiddleft },
        { header: 'Fin', key: 'fin', width: 20, style: styleMiddleft },
        { header: 'Tiempo(seg)', key: 'time', width: 20, style: styleMiddleft },
        { header: 'Reacción', key: 'reaction', width: 20, style: styleMiddleft },
        { header: 'Emoticon', key: 'emoticon', width: 10, style: styleMiddCenter },
        { header: 'Comentario', key: 'comentario', width: 80 }
      ]

      const {informantes, reactionsStack} = data

      let initRow = 2
      const mergeCells = []

      informantes.forEach((informante, index) => {
        const {infor_id, answers, finish_answer, start_answer} = informante
        const answersData = JSON.parse(answers)
        let finishRow = initRow - 1

        answersData.forEach(answer => {
          const {momento, reactionid, comentario} = answer
          // const {name, reaction} = reactionsStack[reactionid]
          const inicio = new Date(start_answer)
          const fin = new Date(finish_answer)
          const duracion = (fin - inicio) / 60000

          const newRow = worksheet.addRow({
            folio: infor_id,
            duracion: Math.round(duracion * 100) / 100,
            inicio: inicio,
            fin: fin,
            time: momento,
            reaction: 'name',
            emoticon: 'reaction',
            comentario: comentario
          })

          if (index % 2 !== 0) {
            newRow.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: {
                argb: 'FF86bace'
              }
            }
            newRow.border = {
              top: {style: 'thin'},
              left: {style: 'thin'},
              bottom: {style: 'thin'},
              right: {style: 'thin'}
            }
          }

          finishRow++
        })

        const columsMerge = [ 'A', 'B', 'C', 'D' ]

        columsMerge.forEach(colum => {
          worksheet.mergeCells(colum + initRow + ':' + colum + finishRow)
        })

        initRow = finishRow + 1
      })

      worksheet.properties.defaultRowHeight = 30
      resolve(workbook)
    } catch (error) {
      reject(error)
    }
  })
}
