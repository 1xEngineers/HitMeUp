import { useRoute } from '@react-navigation/core'
import { useEffect } from 'react'
import { useAuth } from '@hmu-feature/auth'

export type LoginScreenContainerProps = {
  children: any
}

export function LoginScreenContainer({ children }: LoginScreenContainerProps) {
  const { setInviteCode } = useAuth()

  const route = useRoute()

  useEffect(() => {
    setInviteCode?.((route.params as any)?.inviteCode ?? 'unknown')
  }, [route, setInviteCode])

  return children
}
