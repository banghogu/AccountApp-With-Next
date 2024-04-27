import Account from '@/components/home/Account'
import { CardListSkeleton } from '@/components/home/CardList'
import { CreditScoreSkeleton } from '@/components/home/CreditScore'
import { BannerSkeleton } from '@/components/home/EventBanners'
import Spacing from '@/components/shared/Spacing'
import { getHasAccount } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { User } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { QueryClient, dehydrate } from 'react-query'

//중요한 정보가 아니면
const EventBanners = dynamic(() => import('@/components/home/EventBanners'), {
  ssr: false,
  loading: () => (
    <div style={{ padding: 24 }}>
      <BannerSkeleton />
    </div>
  ),
})

const CreditScore = dynamic(() => import('@/components/home/CreditScore'), {
  ssr: false,
  loading: () => <CreditScoreSkeleton />,
})

const CardList = dynamic(() => import('@/components/home/CardList'), {
  ssr: false,
  loading: () => <CardListSkeleton />,
})

export default function Home() {
  const { data } = useSession()
  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
      <CardList />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['account', (session.user as User).id], () =>
      getHasAccount((session.user as User).id),
    )

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}
