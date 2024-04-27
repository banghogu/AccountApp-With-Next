import Flex from '@/components/shared/Flex'
import TextField from '@/components/shared/TextField'
import WithAuth from '@/components/shared/WithAuth'
import useUser from '@/hooks/useUser'
import { Piggybank } from '@/models/piggybank'
import { createPiggybank } from '@/remote/piggybank'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import Swal from 'sweetalert2'
import { colors } from '@/styles/colorPalette'
import Spacing from '@/components/shared/Spacing'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  {
    ssr: false,
  },
)

const NewPiggybankPage = () => {
  const user = useUser()
  const [formValues, setFormValues] = useState({
    name: '',
    endDate: '',
    goalAmount: '',
  })

  const { mutate, isLoading } = useMutation(
    (newPiggybank: Piggybank) => createPiggybank(newPiggybank),
    {
      onSuccess: () => {
        successModal()
      },
      onError: () => {
        failModal()
      },
    },
  )

  const successModal = async () => {
    const result = await Swal.fire({
      title: '새로운 저금통을 만들었어요',
      text: `매일 매일 조금씩 저금하여 목표금액을 모아보아요`,
      confirmButtonColor: colors.blue,
      confirmButtonText: '확인',
    })

    if (result.isConfirmed) {
      window.history.back()
    }
  }

  const failModal = async () => {
    const result = await Swal.fire({
      title: '저금통을 만들지 못했어요',
      text: `잠시 후 다시 시도해주세요`,
      confirmButtonColor: colors.blue,
      confirmButtonText: '확인',
    })

    if (result.isConfirmed) {
      window.history.back()
    }
  }

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleSubmit = () => {
    const newPiggybank = {
      ...formValues,
      goalAmount: Number(formValues.goalAmount),
      userId: user?.id as string,
      startDate: new Date(),
      endDate: new Date(formValues.endDate),
      balance: 0,
    } as Piggybank

    mutate(newPiggybank)
  }

  const minDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])

  return (
    <WithAuth>
      <div>
        <Flex direction="column" style={{ padding: 24 }}>
          <TextField
            name="name"
            label="저금통 이름"
            value={formValues.name}
            onChange={handleFormValues}
          />
          <Spacing size={16} />
          <TextField
            name="endDate"
            type="date"
            label="종료 일자"
            min={minDate}
            value={formValues.endDate}
            onChange={handleFormValues}
          />
          <Spacing size={16} />
          <TextField
            name="goalAmount"
            type="number"
            label="목표 금액"
            value={formValues.goalAmount}
            onChange={handleFormValues}
          />
        </Flex>

        <FixedBottomButton
          disabled={isLoading === true}
          label="저금통 생성하기"
          onClick={handleSubmit}
        />
      </div>
    </WithAuth>
  )
}

export default NewPiggybankPage
