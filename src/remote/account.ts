import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'
import { Account } from '@/models/account'

export function setTerms({
  userId,
  termIds,
}: {
  userId: string
  termIds: string[]
}) {
  return setDoc(doc(collection(store, COLLECTIONS.TERMS), userId), {
    userId,
    termIds,
  })
}

export async function getAccount(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.ACCOUNT), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Account),
  }
}

export async function getTerms(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.TERMS), userId),
  )

  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as { userId: string; termIds: string[] }),
  }
}
