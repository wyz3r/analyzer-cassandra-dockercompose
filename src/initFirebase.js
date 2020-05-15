import * as admin from 'firebase-admin'
import firebaseConf from '../video-analize.json'
export const initialFireAdmin = () => {
  const serviceAccount = {
    projectId: firebaseConf.project_id,
    clientEmail: firebaseConf.client_email,
    privateKey: firebaseConf.private_key
  }
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://video-analize.firebaseio.com'
  })
}

initialFireAdmin()
