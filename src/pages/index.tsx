import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Container>
        <div css={bold}>hello</div>
      </Container>
    </>
  )
}

const Container = styled.div`
  background-color: pink;
`
const bold = css`
  font-weight: bold;
`
