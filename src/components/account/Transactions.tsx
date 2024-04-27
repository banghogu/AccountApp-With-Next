import Link from 'next/link'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Button from '../shared/Button'

const Transactions = () => {
  return (
    <div>
      <Text bold={true} style={{ padding: 24 }}>
        입출금내역
      </Text>

      <Flex style={{ padding: 24 }}>
        <Text>아직 입출금 내역이 없어요</Text>
      </Flex>
    </div>
  )
}

export default Transactions
