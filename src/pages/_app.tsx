import AuthGuard from '@/components/auth/AuthGuard'
import Layout from '@/components/shared/Layout'
import Navbar from '@/components/shared/Navbar'
import globalStyles from '@/styles/globalStyles'
import { Global } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Layout>
        <Global styles={globalStyles} />
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ReactQueryDevtools initialIsOpen={false} />
              <AuthGuard>
                <Navbar />
                <Component {...pageProps} />
              </AuthGuard>
            </Hydrate>
          </QueryClientProvider>
        </SessionProvider>
      </Layout>
    </>
  )
}
