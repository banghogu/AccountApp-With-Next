import Link from 'next/link'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import Image from 'next/image'
import useAccount from '@/hooks/useAccount'
import useUser from '@/hooks/useUser'
import addDelimiter from '@/utils/addDel'
import { useCallback } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const Account = () => {
  const { data: account } = useAccount()
  const user = useUser()
  const navigate = useRouter()

  const handleCheck = useCallback(() => {
    if (user == null) {
      showModal()

      return
    }

    navigate.push('/account/new')
  }, [user, navigate])

  const showModal = async () => {
    const result = await Swal.fire({
      title: '로그인이 필요한 기능이에요',
      text: `계좌 개설을 위해 로그인을 먼저 진행해주세요`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '확인',
    })

    if (result.isConfirmed) {
      navigate.push('/auth/signin')
    }
  }

  if (account == null) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between">
          <Flex direction="column">
            <Text bold={true} style={{ whiteSpace: 'pre-wrap' }}>
              {`계좌 개설이\n더 쉽고 빨라졌어요`}
            </Text>
            <Spacing size={8} />
            <Button onClick={handleCheck}>3분만에 개설하기</Button>
          </Flex>
          <Image
            src="https://cdn4.iconfinder.com/data/icons/business-and-finance-colorful-free-hand-drawn-set/100/money_dollars-512.png"
            alt=""
            width={80}
            height={80}
          />
        </Flex>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text typography="t6" color="gray600">
            {user?.name} 회원님의 자산
          </Text>
          <Spacing size={2} />
          <Text typography="t3" bold={true}>
            {addDelimiter(account.balance)}원
          </Text>
        </Flex>
        <Link href="/account">
          <Button>분석</Button>
        </Link>
      </Flex>
    </div>
  )
}

export default Account
