import AuthGuard from '@/components/auth/AuthGuard'
import Layout from '@/components/shared/Layout'
import Navbar from '@/components/shared/Navbar'
import globalStyles from '@/styles/globalStyles'
import { Global } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Layout>
        <Global styles={globalStyles} />
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Navbar />
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </SessionProvider>
      </Layout>
    </>
  )
}
