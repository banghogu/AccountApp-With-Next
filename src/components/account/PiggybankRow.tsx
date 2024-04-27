import ListRow from '../shared/ListRow'
import Image from 'next/image'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import addDelimiter from '@/utils/addDel'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import { css } from '@emotion/react'
import { colors } from '@/styles/colorPalette'
import { useQuery } from 'react-query'
import { getPiggybank } from '@/remote/piggybank'
import { differenceInDays } from 'date-fns'

const PiggybankRow = () => {
  const navigate = useRouter()
  const user = useUser()
  const { data } = useQuery(['piggybank', user?.id], () =>
    getPiggybank(user?.id as string),
  )
  if (data == null) {
    return (
      <div css={bannerStyles}>
        <ul>
          <ListRow
            left={
              <Image
                src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
                width={40}
                height={40}
                alt=""
              />
            }
            contents={
              <ListRow.Texts
                title="저금통"
                subTitle="매일 매일 조금씩 저금하여 목표금액을 모아보아요"
              />
            }
            withArrow={true}
            onClick={() => {
              navigate.push('/account/piggybank/new')
            }}
          />
        </ul>
      </div>
    )
  }
  const { balance, endDate, goalAmount } = data
  const dday = differenceInDays(endDate, new Date())
  return (
    <div css={bannerStyles}>
      <ul>
        <ListRow
          left={
            <Image
              src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-512.png"
              width={40}
              height={40}
              alt=""
            />
          }
          contents={
            <Flex direction="column">
              <Text typography="t4" bold={true}>
                D-{dday}
              </Text>
              <Text>{addDelimiter(goalAmount - balance)}원 남았어요</Text>
            </Flex>
          }
        />
      </ul>
    </div>
  )
}
const bannerStyles = css`
  border-radius: 8px;
  margin: 20px;
  background-color: ${colors.gray100};
  cursor: pointer;
`
export default PiggybankRow
