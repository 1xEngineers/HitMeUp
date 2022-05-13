import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PhoneNumberInput } from './phone-number-input'

const SlideNavigator = createNativeStackNavigator()

export function LoginScreen() {
  return (
    <SlideNavigator.Navigator>
      <SlideNavigator.Screen name='Login' component={PhoneNumberInput} />
    </SlideNavigator.Navigator>
  )
}
