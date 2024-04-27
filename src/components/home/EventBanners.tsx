import { getEventBanners } from '@/remote/banner'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import Flex from '../shared/Flex'
import Text from '../shared/Text'
import Image from 'next/image'
import { css } from '@emotion/react'
import Skeleton from '../shared/Skeleton'
import useAccount from '@/hooks/useAccount'
import { useEffect } from 'react'

const EventBanners = () => {
  const { data: account } = useAccount()
  const {
    data: banners,
    isLoading,
    refetch: refetchBanners,
  } = useQuery(['event-banners'], () =>
    getEventBanners({
      hasAccount: account != null && account.status === 'DONE',
    }),
  )

  useEffect(() => {
    if (account != null && account.status === 'DONE') {
      refetchBanners()
    }
  }, [account, refetchBanners])

  if (isLoading || banners == null) {
    return <BannerSkeleton />
  }

  return (
    <div style={{ padding: 24 }}>
      <Swiper spaceBetween={8}>
        {banners?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Flex
                  style={{ backgroundColor: banner.backgroundColor }}
                  justify="space-between"
                  css={bannerStyles}
                >
                  {/* 왼쪽 */}
                  <Flex direction="column">
                    <Text bold={true}>{banner.title}</Text>
                    <Text typography="t6">{banner.subTitle}</Text>
                  </Flex>
                  {/* 오른쪽 */}
                  <Image src={banner.iconUrl} width={40} height={40} alt="" />
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export const BannerSkeleton = () => {
  return <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
}

const bannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`

export default EventBanners
