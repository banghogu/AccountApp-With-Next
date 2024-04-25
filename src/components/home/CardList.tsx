import { getCards } from '@/remote/card'
import { useQuery } from 'react-query'
import Text from '../shared/Text'
import ListRow from '../shared/ListRow'
import Badge from '../shared/Badge'
import Button from '../shared/Button'
import Skeleton from '../shared/Skeleton'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import { colors } from '@/styles/colorPalette'

const CardList = () => {
  const { data, isLoading } = useQuery(['cards'], () => getCards())
  const navigate = useRouter()

  const isShowMoreButton = data?.items.length ?? 0 > 5

  if (data?.items == undefined || isLoading) {
    return <CardListSkeleton />
  }

  return (
    <div style={{ padding: '24px 0' }}>
      <Text
        bold={true}
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </Text>
      <ul>
        {data?.items.slice(0, 5).map((card, index) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
            }
            right={card.payback != null ? <Badge label={card.payback} /> : null}
            withArrow={true}
            onClick={() => {
              navigate.push(`/card/${card.id}`)
            }}
          />
        ))}
      </ul>
      {isShowMoreButton ? (
        <div style={{ padding: '12px 24px 0 24px' }}>
          <Button
            full={true}
            css={buttonStyles}
            weak={true}
            size="medium"
            onClick={() => {
              navigate.push('/card')
            }}
          >
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export function CardListSkeleton() {
  return (
    <div style={{ padding: '24px 0' }}>
      <Text
        bold={true}
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </Text>
      {[...new Array(5)].map((_, idx) => (
        <ListRow
          key={idx}
          contents={
            <ListRow.Texts
              title={<Skeleton width={30} height={25} />}
              subTitle={<Skeleton width={45} height={20} />}
            />
          }
        />
      ))}
    </div>
  )
}

const buttonStyles = css`
  border-radius: 6px;
  transition:
    background-color 0.3s,
    border-color 0.3s;
  &:hover {
    background-color: ${colors.blue};
    color: ${colors.white};
  }
`

export default CardList
