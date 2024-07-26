import * as admin from 'firebase-admin'
import * as serviceAccount from 'path/to/serviceAccountKey.json'
import {child, get, getDatabase, ref, set} from 'firebase/database'
import firebase from 'firebase/compat/app';

const _ = firebase.initializeApp(
  admin.credential.cert(serviceAccount as admin.ServiceAccount)
)
const db = getDatabase(_)
const dbRef = ref(db)

export const saveToken = async (userId: string, token: string) => {
  const values = (await get(child(dbRef, `userTokens/${userId}/`))).val() ?? {}
  const payload = {...values, token}
  await set(ref(db, `userTokens/${userId}/`), payload)
}

export const getToken = async (userId: string) => {
  const values = (await get(child(dbRef, `userTokens/${userId}/`))).val()
  return values?.token
}
