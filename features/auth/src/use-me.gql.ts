import { QueryHookOptions, useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const query = gql`
  query fetchMe($density: ImageDensity, $size: ImageSize) {
    me {
      id
      name
      username
      isOnline
      isBusy
      isHanging
      bio
      userRoles
      status
      isOnboardingCompleted
      avatar {
        id
        url(density: $density, size: $size)
      }
    }
  }
`

export interface RequestType {
  density?: ImageDensity | undefined
  size?: ImageSize | undefined
}

export enum ImageDensity {
  x1 = 'x1',
  x2 = 'x2',
  x3 = 'x3',
}

export enum ImageSize {
  XSMALL = 'XSMALL',
  SMALL = 'SMALL',
  NORMAL = 'NORMAL',
  LARGE = 'LARGE',
  XLARGE = 'XLARGE',
  XXLARGE = 'XXLARGE',
  XXXLARGE = 'XXXLARGE',
}

export interface QueryType {
  me?: UserAccountType
}

export interface UserAccountType {
  id: string
  name?: string
  username?: string
  isOnline?: boolean
  isBusy?: boolean
  isHanging?: boolean
  bio?: string
  userRoles: UserRole[]
  status: UserStatus
  isOnboardingCompleted?: boolean
  avatar?: ImageType
  __typename?: 'UserAccount'
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
}

export interface ImageType {
  id: string
  url?: string
  __typename?: 'Image'
}

export function useMeQuery(
  request: RequestType,
  options?: QueryHookOptions<QueryType, RequestType>,
) {
  return useQuery<QueryType, RequestType>(query, {
    variables: request,
    ...options,
  })
}
