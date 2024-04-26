import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'
import WithAuth from '@/components/shared/WithAuth'

function MyPage() {
  const navigate = useRouter()

  return (
    <WithAuth>
      <Spacing size={100} />
      <Flex justify="center">
        <Button onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</Button>
      </Flex>
    </WithAuth>
  )
}

export default MyPage
