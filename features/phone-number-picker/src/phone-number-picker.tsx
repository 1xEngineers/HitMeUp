import { Text } from '@hmu-component/text'
import { TextInput } from '@hmu-component/text-input'
import { AsYouType, CountryCode, parseNumber } from 'libphonenumber-js'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React, { useCallback, useState } from 'react'
import { TextInput as RNTextInput } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { getCountry } from 'react-native-localize'
import countriesJSON from './country-code.json'

export interface Country {
  countryCode: CountryCode
  name: string
  code: string
}

export type PhoneNumber = {
  phoneNumber: string
  formattedPhoneNumber: string
  isValid: boolean
}

const currentCountry = getCountry()
const estimatedCountry = (countriesJSON as Country[]).find(
  ({ countryCode }) => currentCountry === countryCode,
)
const defaultCountryCode: Country = {
  name: 'United States',
  code: '+1',
  countryCode: 'US',
}

const styles = {
  input: [
    {
      fontSize: 22,
      fontWeight: 'bold',
      lineHeight: 28,
    } as const,
  ],
}

interface Props {
  country?: Country
  phoneInputRef?: React.RefObject<RNTextInput>
  onChange?: (phoneNumber: PhoneNumber) => void
  onPickCountry?: () => void
}

export function PhoneNumberPicker({
  country: selectedCountry,
  phoneInputRef,
  onChange,
  onPickCountry,
}: Props) {
  const [country, setCountry] = useState<Country>(
    selectedCountry || estimatedCountry || defaultCountryCode,
  )
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [formattedNumber, setFormattedNumber] = useState<string>('')

  const processPhoneNumber = useCallback(
    (newCode: Country, newPhone: string) => {
      const newFormattedNumber = new AsYouType(newCode.countryCode)
        .input(newPhone)
        .replace(/\)$/, '')
      setFormattedNumber(newFormattedNumber)

      const parsedNumber = parseNumber(newPhone, newCode.countryCode)
      const number = 'phone' in parsedNumber ? parsedNumber.phone : undefined

      onChange?.({
        phoneNumber: `${newCode.code}${newPhone}`,
        formattedPhoneNumber: `${newCode.code} ${newFormattedNumber}`,
        isValid: number != undefined,
      })
    },
    [onChange],
  )

  const onChangePhoneNumber = useCallback(
    (changedPhoneNumber: string) => {
      setPhoneNumber(changedPhoneNumber.replace(/[^0-9]/g, ''))
      processPhoneNumber(country, changedPhoneNumber)
    },
    [processPhoneNumber, country],
  )

  React.useEffect(() => {
    if (selectedCountry) setCountry(selectedCountry)
  }, [selectedCountry])

  React.useEffect(() => {
    processPhoneNumber(country, phoneNumber)
  }, [processPhoneNumber, country, phoneNumber])

  return (
    <Stack horizontal fillHorizontal alignMiddle>
      <Tappable onTap={onPickCountry}>
        <Stack horizontal alignMiddle>
          <Stack borderRadius='small'>
            <CountryFlag isoCode={country?.countryCode} size={16} />
          </Stack>
          <Spacer size='x-small' />
          <Text style={styles.input}>{country?.code}</Text>
        </Stack>
      </Tappable>
      <Spacer size='x-small' />
      <Stack fill>
        <TextInput
          fill
          autoFocus
          ref={phoneInputRef}
          fontSize='large'
          maxLength={15}
          keyboardType='phone-pad'
          autoComplete='tel'
          placeholder='000 000-000'
          value={formattedNumber}
          backgroundColor={COLOR.TRANSPARENT}
          style={styles.input}
          placeholderColor={COLOR.TERTIARY}
          onChangeText={onChangePhoneNumber}
        />
      </Stack>
    </Stack>
  )
}
