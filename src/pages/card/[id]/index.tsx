import ListRow from '@/components/shared/ListRow'
import Top from '@/components/shared/Top'
import { Card } from '@/models/card'
import { getCard } from '@/remote/card'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import dynamic from 'next/dynamic'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

interface CardDetailPageProps {
  initialCard: Card
}

const CardDetailPage = ({ initialCard }: CardDetailPageProps) => {
  const { id } = useParams()

  const { data, isLoading } = useQuery(
    ['card', id],
    () => getCard(id as string),
    {
      initialData: initialCard,
    },
  )

  if (data == null || isLoading) {
    return
  }

  const { name, corpName, promotion, tags, benefit } = data

  console.log(promotion.title)

  const subTitle =
    promotion != undefined ? removeHtmlTags(promotion.title) : tags.join(',')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />
      <ul>
        {benefit.map((text, index) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, translateX: -90 }}
            transition={{
              duration: 0.7,
              ease: 'easeInOut',
              delay: index * 0.7,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
          >
            <ListRow
              as="div"
              left={
                <Image
                  src="https://cdn4.iconfinder.com/data/icons/travello-basic-ui-1/64/Correct-512.png"
                  width={40}
                  height={40}
                  alt=""
                />
              }
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
              }
            />
          </motion.li>
        ))}
      </ul>
      {promotion != null ? (
        <Flex
          direction="column"
          style={{ marginTop: '80px', padding: '0 24px 80px 24px' }}
        >
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={() => {
          // TODO:
        }}
      />
    </div>
  )
}

export default CardDetailPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const cardId = query.id as string
  const card = await getCard(cardId)

  return {
    props: {
      initialCard: card,
    },
  }
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}
