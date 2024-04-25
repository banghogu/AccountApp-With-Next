import { Card } from '@/models/card'
import { getCard } from '@/remote/card'
import { GetServerSidePropsContext } from 'next'
import { useParams } from 'next/navigation'
import { useQuery } from 'react-query'

interface CardProps {
  initialCard: Card
}

const CardDetailPage = ({ initialCard }: CardProps) => {
  const { id } = useParams()

  const { data } = useQuery(['card', id], () => getCard(id as string), {
    initialData: initialCard,
  })

  if (data == null) {
    return
  }

  const { name, corpName, promotion, tags, benefit } = data
  return <div>CardDetailPage</div>
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
