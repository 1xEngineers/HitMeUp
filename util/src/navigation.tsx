import { useRoute } from '@react-navigation/core'
import React from 'react'

export const navStateToProps = (ScreenComponent: any) => {
  return (props: any) => {
    const route = useRoute()
    const params = route.params
    return <ScreenComponent {...props} {...params} />
  }
}
