// import * as admin from 'firebase-admin';
// import {getApps} from 'firebase-admin/app'

// const adminCredentials = JSON.parse(
//    process.env.ADMIN_CREDENTIALS
// )

// if (!getApps().length) {
//    admin.initializeApp({
//       credential: admin.credential.cert(adminCredentials)
//    })
// }

// const adminDB = admin.firestore()

// export {
//    adminDB
// }

import * as firebaseAdmin from 'firebase-admin'

const adminCredentials = JSON.parse(
   process.env.ADMIN_CREDENTIALS
)

export const verifyIDToken = async (token) => {
   if (!firebaseAdmin.apps.length) {
      firebaseAdmin.initializeApp({
         credential: firebaseAdmin.credential.cert(adminCredentials)
      })
   }
   return firebaseAdmin.auth().verifyIdToken(token).catch(err => {throw err})
}