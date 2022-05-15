import { NavigationContainerRef, StackActions } from '@react-navigation/native'
import {createRef} from 'react'

export enum ScreenNames {
  Login = 'login',
}

interface NavigationOptions {
  reset?: boolean
  replace?: boolean
}
export const navigationRef = createRef<NavigationContainerRef<any>>()

export function navigate<T>(screenName: string, params?: T, options?: NavigationOptions) {
  const navigator = navigationRef.current
  if (!navigator) {
    throw new Error('Could not found navigator instance!')
  }
  if (options?.replace) {
    navigator.dispatch(StackActions.replace(screenName, params as Object))
  } else {
    if (options?.reset) {
      navigator.dispatch(StackActions.replace(screenName, params as Object))
    }
    navigator.navigate(screenName, params as Object)
  }
}
