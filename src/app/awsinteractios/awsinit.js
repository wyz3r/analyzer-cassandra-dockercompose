import AWS from 'aws-sdk'
const { config } = global
AWS.config.update({ accessKeyId: config.AMAZON_ACCESS_KEY, secretAccessKey: config.AMAZON_SECRET })
const s3 = new AWS.S3()

export const saveFile = (url, filetype) => {
  const s3Params = {
    Bucket: config.AMAZON_BUCKET,
    Key: url, // carpeta/nombre_de_archivo
    Expires: 600,
    ContentType: filetype, // filetype
    ACL: 'public-read'
  }
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      const returnData = {
        signedRequest: data,
        url: `https://s3-${config.AMAZON_REGION}.amazonaws.com/${config.AMAZON_BUCKET}/${url}`
      }
      console.log(returnData)
      resolve(returnData)
    })
  })
}
