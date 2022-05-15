import { PageHeader } from '@hmu-component/page-header'
import { Screen } from '@hmu-component/screen'
import { Text } from '@hmu-component/text'
import { TextInput } from '@hmu-component/text-input'
import { Title } from '@hmu-component/title'
import { useAuth } from '@hmu-feature/auth'
import {
  linkPhoneCredentialToCurrentUser,
  sendPhoneVerificationCode,
  signInWithPhoneNumber,
} from '@hmu-feature/firebase-auth'
import { useNavigation, useRoute } from '@react-navigation/core'
import { Spacer } from 'native-x-spacer'
import { Spinner } from 'native-x-spinner'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LoginScreens } from './login-screen'

const styles = {
  input: [
    {
      padding: 0,
      width: 100,
      marginLeft: -8,
      fontSize: 26,
      fontWeight: 'bold',
    },
  ],
}

export function CodeVerificationScreen() {
  const route = useRoute<any>()
  const { phoneNumber, formattedPhoneNumber, verificationId } = route.params || {}

  const { user, setPhoneNumber } = useAuth()
  const { navigate } = useNavigation<any>()
  const authVerificationId = useRef<string>(verificationId)
  const [verifyingCode, setVerifyingCode] = useState(false)
  const [resendingCode, setResendingCode] = useState(false)
  const [error, setError] = useState<Error>()
  const [code, setCode] = useState<string>('')

  const disabled = !code || code.length < 6 || verifyingCode

  const verifyCode = useCallback(
    async (code: string) => {
      try {
        if (user) {
          await linkPhoneCredentialToCurrentUser(authVerificationId.current, code)
        } else {
          await signInWithPhoneNumber(authVerificationId.current, code)
        }

        return true
      } catch (e) {
        setError(e as Error)
        return false
      }
    },
    [user],
  )

  const onNext = useCallback(async () => {
    if (disabled || !code) return

    setVerifyingCode(true)
    const isValid = await verifyCode(code)
    setVerifyingCode(false)

    if (isValid) {
      setPhoneNumber?.(phoneNumber)
      navigate(LoginScreens.VerifyUserDetails)
    }
  }, [disabled, code, verifyCode, setPhoneNumber, phoneNumber, navigate])

  const onResend = useCallback(async () => {
    setResendingCode(true)
    sendPhoneVerificationCode(phoneNumber)
      .then(id => {
        if (id) {
          authVerificationId.current = id
        }
      })
      .catch(setError)
      .finally(() => setResendingCode(false))
  }, [phoneNumber])

  const onCodeChange = useCallback((newCode: string) => {
    setCode(newCode.replace(/[^0-9]/g, ''))
    setError(undefined)
  }, [])

  useEffect(() => {
    if (code.length === 6) onNext()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  useEffect(() => {
    authVerificationId.current = verificationId
  }, [verificationId])

  const formattedCode = `${code.substr(0, 3)} ${code.substr(3, 3)}`.trim()
  return (
    <Screen>
      <PageHeader showBackButton />

      <Stack padding='large'>
        <Title>enter the code</Title>
        <Spacer size='x-small' />
        <Text semiBold textColor={COLOR.TERTIARY}>
          {`we sent it to `}
          <Text>{formattedPhoneNumber}</Text>
        </Text>
        <Spacer size='large' />

        <Stack fillHorizontal>
          <TextInput
            border='none'
            autoFocus
            fill
            maxLength={7}
            error={error?.message}
            value={formattedCode}
            disabled={verifyingCode}
            keyboardType='numeric'
            style={styles.input}
            textContentType='oneTimeCode'
            placeholder='000 000'
            backgroundColor={COLOR.TRANSPARENT}
            placeholderColor={COLOR.TERTIARY}
            onChangeText={onCodeChange}
          />
        </Stack>

        <Spacer size='normal' />

        <Stack horizontal alignMiddle>
          <Text>
            {`didn't get it?`}
            <Text
              semiBold
              textColor={resendingCode ? COLOR.TERTIARY : COLOR.ACCENT}
              lineHeight='relax'
              onPress={onResend}
            >
              {resendingCode ? ` resending ` : ` resend `}
            </Text>
          </Text>
          {resendingCode ? <Spinner size={'small'} /> : null}
        </Stack>

        {verifyingCode ? (
          <>
            <Spacer />
            <Stack fillHorizontal alignLeft>
              <Spinner size={'small'} />
            </Stack>
          </>
        ) : null}
      </Stack>
    </Screen>
  )
}
