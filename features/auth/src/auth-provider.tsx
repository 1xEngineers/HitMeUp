import { useApolloClient } from '@apollo/client'
import {
  FirebaseUser,
  onAuthChange,
  signInWithCustomToken,
  signOut as signUserOut,
} from '@hmu-feature/firebase-auth'
import { getDeviceId, getImageDensity } from '@hmu-client/util'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { ImageSize, useMeQuery, UserAccountType } from './use-me.gql'
import { useSignInUserMutation } from './use-sign-in-user.gql'
export enum AuthState {
  CHECKING,
  UNAUTHORIZED,
  AUTHORIZED,
  NEW_USER,
  INVALID_TOKEN,
}

interface AuthContextType {
  user?: UserAccountType
  loading?: boolean
  state?: AuthState
  error?: Error
  isNewUser?: boolean
  hasPhoneNumber?: boolean
  refresh?: () => Promise<any>
  setInviteCode?: (inviteCode: string) => void
  setPhoneNumber?: (phoneNumber: string) => void
  inviteCode?: string
  signOut?: () => void
  phoneNumber?: string
}

const AuthContext = createContext<AuthContextType>({})

interface Props {
  children: any
  onFirebaseUserChange?: (firebaseUser: FirebaseUser | null | undefined) => void
}

function isProfileComplete(user?: UserAccountType) {
  return !!user?.name && !!user.username && !!user.avatar
}
function checkIfIsNewUser(user?: UserAccountType) {
  return !isProfileComplete(user)
}

export function AuthProvider({ children, onFirebaseUserChange }: Props) {
  const client = useApolloClient()
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>()
  const [state, setState] = useState(AuthState.CHECKING)
  const [error, setError] = useState<Error>()
  const [inviteCode, setInviteCode] = useState<string>()
  const [signingIn, setSigningIn] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const {
    data,
    loading: isLoadingMe,
    refetch: refetchMe,
  } = useMeQuery({ density: getImageDensity(), size: ImageSize.XXXLARGE }, { skip: !firebaseUser })
  const [signInUser] = useSignInUserMutation()
  const signInAttempted = useRef<boolean>()
  const user = data?.me

  const signOut = useCallback(async () => {
    setPhoneNumber(undefined)
    await signUserOut()
    await client.clearStore()
  }, [client])

  useEffect(() => {
    const signInNewUser = async () => {
      setSigningIn(true)
      signInAttempted.current = true
      try {
        const { data: userData } = await signInUser()

        await signInWithCustomToken?.(userData?.signInUser.token as string)
        await refetchMe()
      } finally {
        signInAttempted.current = false
        setSigningIn(false)
      }
    }
    if (firebaseUser && !isLoadingMe && !user && !signInAttempted.current && inviteCode) {
      if (inviteCode === 'unknown' || atob(inviteCode) === firebaseUser.email) {
        signInNewUser().catch(setError)
      } else {
        setState(AuthState.INVALID_TOKEN)
      }
    }
  }, [firebaseUser, isLoadingMe, user, signInUser, refetchMe, inviteCode])

  useEffect(() => {
    const unsubscribe = onAuthChange(setFirebaseUser)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (firebaseUser?.phoneNumber) {
      setPhoneNumber(firebaseUser?.phoneNumber)
    }
  }, [firebaseUser?.phoneNumber])

  useEffect(() => {
    if (!isLoadingMe && firebaseUser !== undefined) {
      setState(
        firebaseUser
          ? user?.isOnboardingCompleted
            ? AuthState.AUTHORIZED
            : user
            ? AuthState.NEW_USER
            : AuthState.UNAUTHORIZED
          : AuthState.UNAUTHORIZED,
      )
    }
  }, [data, firebaseUser, isLoadingMe, phoneNumber, signingIn, state, user])

  useEffect(() => {
    onFirebaseUserChange?.(firebaseUser)
  }, [firebaseUser, onFirebaseUserChange])

  const hasPhoneNumber = !!firebaseUser && !!phoneNumber

  const value = useMemo(() => {
    return {
      user,
      state,
      error,
      signOut,
      refresh: refetchMe,
      isNewUser: checkIfIsNewUser(user),
      loading: isLoadingMe || signingIn,
      hasPhoneNumber,
      inviteCode,
      setPhoneNumber,
      setInviteCode,
      phoneNumber,
    }
  }, [
    user,
    state,
    error,
    isLoadingMe,
    signingIn,
    signOut,
    refetchMe,
    hasPhoneNumber,
    inviteCode,
    setPhoneNumber,
    setInviteCode,
    phoneNumber,
  ])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
