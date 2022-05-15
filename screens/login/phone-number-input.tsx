import { Button } from '@hmu-component/button'
import { PageHeader } from '@hmu-component/page-header'
import { Screen } from '@hmu-component/screen'
import { Text } from '@hmu-component/text'
import { Title } from '@hmu-component/title'
import { ErrorPopup } from '@hmu-feature/error-popup'
import { sendPhoneVerificationCode } from '@hmu-feature/firebase-auth'
import { Country, PhoneNumber, PhoneNumberPicker } from '@hmu-feature/phone-number-picker'
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/core'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React, { useCallback, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, TextInput as RNTextInput } from 'react-native'
import { styles as s } from 'tachyons-react-native'
import { ScreenNames } from '../navigator'
import { LoginScreens } from './login-screen'

type CommentScreenParamList = {
  [LoginScreens.PhoneNumberInput]: { country?: Country } | undefined
}

const styles = {
  container: [s.flex, s.h100],
}

export function PhoneNumberInput() {
  const { params } = useRoute<RouteProp<CommentScreenParamList>>()
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>()
  const { navigate } = useNavigation<any>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()
  const phoneInputRef = useRef<RNTextInput>(null)

  const onNext = async () => {
    if (!phoneNumber || !phoneNumber.isValid) return

    setLoading(true)
    try {
      const verificationId = await sendPhoneVerificationCode(phoneNumber.phoneNumber)
      setLoading(false)
      navigate(LoginScreens.CodeVerification, {
        phoneNumber: phoneNumber.phoneNumber,
        formattedPhoneNumber: phoneNumber.formattedPhoneNumber,
        verificationId,
      })
    } catch (e) {
      setError(e as Error)
      setLoading(false)
    }
  }

  const onPickCountry = () => navigate(ScreenNames.CountryPicker)
  const focusOnPhoneInput = useCallback(() => phoneInputRef.current?.focus(), [])

  useFocusEffect(focusOnPhoneInput)

  return (
    <Screen>
      <PageHeader showBackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Stack fill padding='large'>
          <Title>{`what's your number?`}</Title>
          <Spacer size='x-small' />
          <Text semiBold textColor={COLOR.TERTIARY}>{`we'll text you a verification code`}</Text>
          <Spacer size='large' />
          <PhoneNumberPicker
            phoneInputRef={phoneInputRef}
            country={params?.country}
            onChange={setPhoneNumber}
            onPickCountry={onPickCountry}
          />
          <Spacer fill />
          <Button loading={loading} disabled={loading || !phoneNumber?.isValid} onTap={onNext}>
            next
          </Button>
        </Stack>
      </KeyboardAvoidingView>
      <ErrorPopup error={error} />
    </Screen>
  )
}
