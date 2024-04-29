import Badge from '@/components/shared/Badge'
import Input from '@/components/shared/Input'
import ListRow from '@/components/shared/ListRow'
import ScrollProgressBar from '@/components/shared/ScrollProgressBar'
import Top from '@/components/shared/Top'
import { getCards } from '@/remote/card'
import { css } from '@emotion/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { QueryClient, dehydrate, useInfiniteQuery } from 'react-query'

const ScrollToTopButton = dynamic(
  () => import('@/components/shared/ScrollToTop'),
  {
    ssr: false,
  },
)

const CardListPage = () => {
  const navigate = useRouter()
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 500) {
        setShowScrollButton(true)
      } else {
        setShowScrollButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => getCards(pageParam),
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
    },
  )
  console.log(data)

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [hasNextPage, fetchNextPage, isFetching])

  if (data == null) {
    return null
  }
  const cards = data?.pages?.map(({ items }) => items).flat()

  return (
    <div>
      {cards && (
        <>
          <ScrollProgressBar style={scrollProgressBarStyles} />
          <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
          <div style={{ padding: '0 24px 12px 24px' }}>
            <Input
              placeholder="카드 검색..."
              onFocus={() => {
                navigate.push('/card/search')
              }}
            />
          </div>
          <InfiniteScroll
            dataLength={cards.length}
            hasMore={hasNextPage}
            loader={<ListRow.Skeleton />}
            next={loadMore}
            scrollThreshold="100px"
          >
            <ul>
              {cards?.map((card, index) => (
                <ListRow
                  key={card.id}
                  contents={
                    <ListRow.Texts
                      title={`${index + 1}위`}
                      subTitle={card.name}
                    />
                  }
                  right={
                    card.payback != null ? <Badge label={card.payback} /> : null
                  }
                  withArrow={true}
                  onClick={() => {
                    navigate.push(`/card/${card.id}`)
                  }}
                />
              ))}
            </ul>
          </InfiniteScroll>
          <ScrollToTopButton show={showScrollButton} />
        </>
      )}
    </div>
  )
}

export async function getServerSideProps() {
  const client = new QueryClient()
  await client.prefetchInfiniteQuery(['cards'], () => getCards())
  console.log(client)
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  }
}

const scrollProgressBarStyles = css`
  position: sticky;
  top: 64px;
  z-index: 2;
`

export default CardListPage
