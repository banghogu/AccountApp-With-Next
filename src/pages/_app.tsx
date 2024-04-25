import Layout from '@/components/shared/Layout'
import globalStyles from '@/styles/globalStyles'
import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
