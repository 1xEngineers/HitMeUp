import { MutationHookOptions, useMutation } from '@apollo/client'
import gql from 'graphql-tag'

const mutation = gql`
  mutation signInUser {
    signInUser {
      token
      isNew
      user {
        id
      }
    }
  }
`

export interface MutationType {
  signInUser: SignInUserResponseType
}

export interface SignInUserResponseType {
  token: string
  isNew: boolean
  user: UserType
  __typename?: 'SignInUserResponse'
}

export interface UserType {
  id: string
  __typename?: 'User'
}

export function useSignInUserMutation(options?: MutationHookOptions<MutationType, void>) {
  return useMutation<MutationType, void>(mutation, options)
}
