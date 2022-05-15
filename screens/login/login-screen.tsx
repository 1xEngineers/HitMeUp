import { ErrorBoundary } from '@hmu-feature/error-boundary'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { CodeVerificationScreen } from './code-verification-screen'
import { LoginScreenContainer } from './login-container'
import { PhoneNumberInput } from './phone-number-input'
import { VerifyUserDetailsScreen } from './verify-user-details-screen'
import { WelcomeScreen } from './welcome-screen'

const SlideNavigator = createNativeStackNavigator()
const screenOptions = { headerShown: false, animationEnabled: true }

export enum LoginScreens {
  Welcome = 'welcome',
  PhoneNumberInput = 'phone-number-input',
  CodeVerification = 'code-verification',
  VerifyUserDetails = 'verify-user-details',
  CreateProfile = 'create-profile',
}

export function LoginScreen() {
  return (
    <ErrorBoundary>
      <LoginScreenContainer>
        <SlideNavigator.Navigator screenOptions={screenOptions}>
          <SlideNavigator.Screen name={LoginScreens.Welcome} component={WelcomeScreen} />
          <SlideNavigator.Screen
            name={LoginScreens.PhoneNumberInput}
            component={PhoneNumberInput}
          />
          <SlideNavigator.Screen
            name={LoginScreens.CodeVerification}
            component={CodeVerificationScreen}
          />
          <SlideNavigator.Screen
            name={LoginScreens.VerifyUserDetails}
            component={VerifyUserDetailsScreen}
          />
        </SlideNavigator.Navigator>
      </LoginScreenContainer>
    </ErrorBoundary>
  )
}
