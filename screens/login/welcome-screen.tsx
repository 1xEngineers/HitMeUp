import { Button } from '@hmu-component/button'
import { Logo } from '@hmu-component/logo'
import { Screen } from '@hmu-component/screen'
import { Text } from '@hmu-component/text'
import { Title } from '@hmu-component/title'
import { useNavigation } from '@react-navigation/core'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { COLOR } from 'native-x-theme'
import React from 'react'
import { ScreenNames } from '../navigator'
import { LoginScreens } from './login-screen'

export function WelcomeScreen() {
  const { navigate } = useNavigation<any>()
  const onSignInTap = () => {
    navigate(LoginScreens.PhoneNumberInput)
  }
  const onTerms = () => {
    navigate(ScreenNames.TermsOfService)
  }
  const onPrivacy = () => {
    navigate(ScreenNames.PrivacyPolicy)
  }

  return (
    <Screen withSafeArea>
      <Stack fill alignCenter>
        <Stack padding='horizontal:normal' alignCenter alignMiddle>
          <Spacer />
          <Stack>
            <Logo size='small' showCircle />
          </Stack>
          <Spacer size='x-small' />
          <Title bold fontSize='x-large'>
            welcome to gm
          </Title>
        </Stack>
        <Stack fill padding='horizontal:large' alignMiddle>
          <Text lineHeight='title' textColor={COLOR.TERTIARY} semiBold>
            {`we’re a small group of friends who’ve quit phone tag `}
          </Text>
          <Spacer size='x-small' />
          <Text lineHeight='title' textColor={COLOR.TERTIARY} semiBold>
            {'when you’re around, tap hang so your friends can show up to join'}
          </Text>
          <Spacer size='x-small' />
          <Text lineHeight='title' textColor={COLOR.TERTIARY} semiBold>
            {'when they’re hanging, you’ll find out so you can hop on too 👀'}
          </Text>
          <Spacer size='x-small' />
          <Text lineHeight='title' textColor={COLOR.TERTIARY} semiBold>
            {'no mo’ FOMO'}
          </Text>

          <Spacer size='x-small' />
          <Text textColor={COLOR.TERTIARY} semiBold>
            dk and mishti
          </Text>
        </Stack>
        <Button size='small' width={280} height={50} onTap={onSignInTap}>{`let's go`}</Button>

        <Spacer size='small' />
        <Text alignCenter fontSize='small' textColor={COLOR.TERTIARY}>
          by tapping let{"'"}s go, you agree to our{`\n`}
          <Text alignCenter textColor={COLOR.ACCENT} onPress={onTerms}>
            terms
          </Text>{' '}
          and{' '}
          <Text textColor={COLOR.ACCENT} onPress={onPrivacy}>
            privacy policy
          </Text>
        </Text>
        <Spacer size='small' />
      </Stack>
    </Screen>
  )
}
