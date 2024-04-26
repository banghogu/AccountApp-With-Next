import { CHECK_STATUS } from '@/constants/credit'
import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'

export function getCheckStatus() {
  const values = [
    CHECK_STATUS.REDAY,
    CHECK_STATUS.PROGRESS,
    CHECK_STATUS.COMPLETE,
    CHECK_STATUS.REJECT,
  ]

  const status = values[Math.floor(Math.floor(Math.random() * values.length))]

  if (status === CHECK_STATUS.REJECT) {
    throw new Error('신용점수 조회에 실패했습니다.')
  }

  return status
}

export function updateCredit({
  userId,
  creditScore,
}: {
  userId: string
  creditScore: number
}) {
  return setDoc(doc(collection(store, COLLECTIONS.CREDIT), userId), {
    userId,
    creditScore,
  })
}

export function getCreditScore(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
