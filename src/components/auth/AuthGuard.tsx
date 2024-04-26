import { useSession } from 'next-auth/react'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession()
  if (status === 'loading') {
    return null
  }
  return <>{children}</>
}

export default AuthGuard
