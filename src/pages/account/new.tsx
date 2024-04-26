import Terms from '@/components/account/Terms'
import ProgressBar from '@/components/shared/ProgressBar'
import WithAuth from '@/components/shared/WithAuth'
import useUser from '@/hooks/useUser'
import { User } from '@/models/user'
import { getTerms, setTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useState } from 'react'

// STEP 0 = 약관동의
// STEP 1 = 계좌 개설 폼 페이지
// STEP 2 = 완료페이지
const LAST_STEP = 2

const AccountNew = ({ initialStep }: { initialStep: number }) => {
  console.log(initialStep)
  const user = useUser()
  const [step, setStep] = useState(initialStep)
  const handleTerms = async (termIds: string[]) => {
    await setTerms({ userId: user?.id as string, termIds: termIds as string[] })
    setStep((prev) => prev + 1)
  }
  return (
    <WithAuth>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 ? <Terms onNext={handleTerms} /> : null}
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

  if (agreedTerms != null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  // const account = await getAccount((session?.user as User).id)

  // if (account == null) {
  //   return {
  //     props: {
  //       initialStep: 1,
  //     },
  //   }
  // }

  return {
    props: {
      initialStep: 0,
    },
  }
}

export default AccountNew
