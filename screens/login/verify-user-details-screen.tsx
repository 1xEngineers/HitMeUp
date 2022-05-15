import { Screen } from '@hmu-component/screen'
import { Text } from '@hmu-component/text'
import { useAuth } from '@hmu-feature/auth'
import { useNavigation } from '@react-navigation/core'
import { Spacer } from 'native-x-spacer'
import { Spinner } from 'native-x-spinner'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React, { useEffect } from 'react'
import { ScreenNames } from '../navigator'

export function VerifyUserDetailsScreen() {
  const { loading, user, isNewUser } = useAuth()
  const { navigate } = useNavigation<any>()

  useEffect(() => {
    if (loading || !user) return
  }, [loading, user, isNewUser, navigate])

  return (
    <Screen>
      <Stack alignCenter alignMiddle fill>
        <Spinner size='large' color={COLOR.ACCENT} />
        <Spacer />
        <Text>Please wait</Text>
      </Stack>
    </Screen>
  )
}
