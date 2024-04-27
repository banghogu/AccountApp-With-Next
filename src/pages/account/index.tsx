import PiggybankRow from '@/components/account/PiggybankRow'
import Transactions from '@/components/account/Transactions'
import Spacing from '@/components/shared/Spacing'
import WithAuth from '@/components/shared/WithAuth'

const AccountPage = () => {
  return (
    <WithAuth>
      <div>
        <PiggybankRow />
        <Spacing size={24} />
        <Transactions />
      </div>
    </WithAuth>
  )
}

export default AccountPage
