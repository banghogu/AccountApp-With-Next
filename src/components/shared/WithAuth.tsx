import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function WithAuth({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return null
  }

  if (data == null) {
    router.replace('/auth/signin')
    return null
  }

  return <>{children}</>
}

export default WithAuth
