import { useQuery } from 'react-query'

import { getHasAccount } from '@remote/account'
import useUser from './useUser'

function useAccount() {
  const user = useUser()

  return useQuery(
    ['account', user?.id],
    () => getHasAccount(user?.id as string),
    {
      enabled: user != null,
    },
  )
}

export default useAccount
