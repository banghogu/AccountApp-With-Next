import Link from 'next/link'
import Button from '../shared/Button'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import Image from 'next/image'

const Account = () => {
  const hasAccount = false
  if (hasAccount) {
    return (
      <div style={{ padding: 24 }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column">
            <Text typography="t6" color="gray600">
              방호진 회원님의 자산
            </Text>
            <Spacing size={8} />
            <Text typography="t3" bold={true}>
              7,000원
            </Text>
          </Flex>
          <Button>분석</Button>
        </Flex>
      </div>
    )
  }

  const 계좌상태 = 'READY'
  const title =
    계좌상태 === 'READY'
      ? '만들고 있으신 \n 계좌가 있으시군요'
      : '계좌 개설이\n더 쉽고 빨라졌어요'
  const buttonLabel = 계좌상태 === 'READY' ? '이어만들기' : '3분만에 개설하기'
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between">
        <Flex direction="column">
          <Text bold={true} style={{ whiteSpace: 'pre-wrap' }}>
            {title}
          </Text>
          <Spacing size={8} />
          <Button>{buttonLabel}</Button>
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

export default Account
