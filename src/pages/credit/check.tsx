import FixedBottomButton from '@/components/shared/FixedBottomButton'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { CHECK_STATUS } from '@/constants/credit'
import useUser from '@/hooks/useUser'
import { getCheckStatus, getCreditScore, updateCredit } from '@/remote/credit'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import Swal from 'sweetalert2'

const CheckPage = () => {
  const user = useUser()
  const [readyToPoll, setReadyToPoll] = useState(true)
  const { data: status } = useQuery(['creditStatus'], () => getCheckStatus(), {
    onSuccess: (status) => {
      if (status === CHECK_STATUS.COMPLETE) {
        setReadyToPoll(false)
      }
    },
    onError: () => {
      setReadyToPoll(false)
      showModal()
    },
    enabled: readyToPoll,
    refetchInterval: 2000,
    staleTime: 0,
  })

  const { data: score } = useQuery(
    ['creditScore'],
    () => getCreditScore(200, 1000),
    {
      enabled: status === CHECK_STATUS.COMPLETE,
      onSuccess: (score) => {
        console.log(score)
        mutate(score)
      },
    },
  )

  const { mutate } = useMutation((score: number) =>
    updateCredit({ creditScore: score, userId: user?.id as string }),
  )

  const showModal = async () => {
    const result = await Swal.fire({
      title: '신용점수 조회에 실패했어요',
      text: `잠시 후 다시 시도해주세요`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '확인',
    })

    if (result.isConfirmed) {
      window.history.back()
    }
  }

  return (
    <div>
      <FullPageLoader message={STATUS_CHECK_MESSAGE[status ?? 'REDAY']} />
      {status === CHECK_STATUS.COMPLETE ? (
        <FixedBottomButton
          label="확인"
          onClick={() => {
            window.history.back()
          }}
        />
      ) : null}
    </div>
  )
}
const STATUS_CHECK_MESSAGE = {
  [CHECK_STATUS.REDAY]: '신용점수 조회를 위해 정보를 준비하고있어요',
  [CHECK_STATUS.PROGRESS]: '신용점수를 조회중입니다. 잠시만 기다려주세요',
  [CHECK_STATUS.COMPLETE]: '신용점수 조회가 완료되었습니다',
}

export default CheckPage
