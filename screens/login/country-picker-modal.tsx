import { Popup } from '@hmu-component/popup'
import { Country, CountryPicker } from '@hmu-feature/phone-number-picker'
import { COLOR_X } from '@hmu-feature/theme'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { LoginScreens } from '.'
import { ScreenNames } from '../navigator'

export function CountryPickerModal() {
  const { navigate } = useNavigation<any>()

  const navigateToPhoneInput = useCallback(
    (country?: Country) => {
      navigate(ScreenNames.Login, {
        screen: LoginScreens.PhoneNumberInput,
        params: { country },
      })
    },
    [navigate],
  )

  const onPicked = useCallback(
    (country: Country) => {
      navigateToPhoneInput(country)
    },
    [navigateToPhoneInput],
  )

  return (
    <Popup accentColor={COLOR_X.ACCENT1}>
      <CountryPicker onChange={onPicked} />
    </Popup>
  )
}
