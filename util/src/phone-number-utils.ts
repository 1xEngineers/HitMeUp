import {
  PhoneNumber,
  PhoneNumberFormat,
  PhoneNumberType,
  PhoneNumberUtil,
} from 'google-libphonenumber'

export function isValidPhoneNumber(phoneNumber: string, defaultCountryCode: string) {
  const phoneUtil = PhoneNumberUtil.getInstance()
  try {
    const number = phoneUtil.parse(phoneNumber, defaultCountryCode)
    const numberType = phoneUtil.getNumberType(number)
    return (
      phoneUtil.isPossibleNumber(number) &&
      [
        PhoneNumberType.FIXED_LINE_OR_MOBILE,
        PhoneNumberType.MOBILE,
        PhoneNumberType.UNKNOWN,
      ].includes(numberType)
    )
  } catch (error) {
    return false
  }
}

export function getCountryCodeFromNumber(phoneNumber: string, defaultCountryCode = 'US'): string {
  let number: PhoneNumber
  const phoneUtil = PhoneNumberUtil.getInstance()
  try {
    number = phoneUtil.parseAndKeepRawInput(phoneNumber, defaultCountryCode)
  } catch (e) {
    number = phoneUtil.parseAndKeepRawInput(phoneNumber, 'US')
  }
  return phoneUtil.getRegionCodeForCountryCode(number.getCountryCodeOrDefault())
}

export function formatNumber(phoneNumber: string, defaultCountryCode: string) {
  const phoneUtil = PhoneNumberUtil.getInstance()
  if (!isValidPhoneNumber(phoneNumber, defaultCountryCode)) return ''
  const number = phoneUtil.parseAndKeepRawInput(phoneNumber, defaultCountryCode)
  return phoneUtil.format(number, PhoneNumberFormat.E164)
}
