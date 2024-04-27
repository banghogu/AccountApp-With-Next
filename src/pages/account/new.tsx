import Form from '@/components/account/Form'
import Terms from '@/components/account/Terms'
import FullPageLoader from '@/components/shared/FullPageLoader'
import ProgressBar from '@/components/shared/ProgressBar'
import WithAuth from '@/components/shared/WithAuth'
import useUser from '@/hooks/useUser'
import { Account } from '@/models/account'
import { User } from '@/models/user'
import {
  createAccount,
  getHasAccount,
  getTerms,
  setTerms,
} from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'))

// STEP 0 = 약관동의
// STEP 1 = 계좌 개설 폼 페이지
// STEP 2 = 완료페이지
const LAST_STEP = 2

const AccountNew = ({ initialStep }: { initialStep: number }) => {
  const navigate = useRouter()
  const user = useUser()
  const [step, setStep] = useState(initialStep)

  const handleTerms = async (termIds: string[]) => {
    await setTerms({ userId: user?.id as string, termIds: termIds as string[] })
    setStep((prev) => prev + 1)
  }

  //todo status: 'DONE'으로 만들기
  const handleForms = async (formValues) => {
    const newAccount = {
      ...formValues,
      accountNumber: Date.now(),
      balance: 0,
      status: 'READY',
      userId: user?.id as string,
    } as Account
    await createAccount(newAccount)
    setStep((prev) => prev + 1)
  }

  return (
    <WithAuth>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 ? <Terms onNext={handleTerms} /> : null}
      {step === 1 ? <Form onNext={handleForms} /> : null}
      {step === 2 ? (
        <>
          <FullPageLoader message="계좌 개설 신청이 완료되었어요" />
          <FixedBottomButton
            label="확인"
            onClick={() => {
              navigate.push('/')
            }}
          />
        </>
      ) : null}
    </WithAuth>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  const agreedTerms = await getTerms((session?.user as User).id)

  if (agreedTerms == null) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }

  const account = await getHasAccount((session?.user as User).id)

  if (account == null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initialStep: 2,
    },
  }
}

export default AccountNew
