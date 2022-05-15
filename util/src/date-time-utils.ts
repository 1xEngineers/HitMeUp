import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns'

/**
 * Converts an input time to relative time
 * @param input
 * @param style
 * @returns string
 */
export function timeToNow(
  input: Date | number | string | undefined,
  style: 'short' | 'long' = 'short',
  showAgo = false,
): string {
  if (!input) {
    return ''
  }
  const date = new Date(input)
  const short = style === 'short'
  const now = Date.now()
  const ago = `${showAgo ? ' ago' : ''}`
  const differenceInWords =
    differenceInYears(now, date) > 0
      ? `${differenceInYears(now, date)}${short ? 'y' : ' year'}${ago}`
      : differenceInMonths(now, date) > 0
      ? `${differenceInMonths(now, date)}${short ? 'mo' : ' month'}${ago}`
      : differenceInWeeks(now, date) > 0
      ? `${differenceInWeeks(now, date)}${short ? 'w' : ' week'}${ago}`
      : differenceInDays(now, date) > 0
      ? `${differenceInDays(now, date)}${short ? 'd' : ' day'}${ago}`
      : differenceInHours(now, date) > 0
      ? `${differenceInHours(now, date)}${short ? 'h' : ' hour'}${ago}`
      : differenceInMinutes(now, date) > 0
      ? `${differenceInMinutes(now, date)}${short ? 'm' : ' minute'}${ago}`
      : 'now'

  if (short) return differenceInWords
  // Parse the number part
  const difference = parseInt((differenceInWords.match(/\d+/) || [])[0] ?? '0')
  // Suffix an 's' to make the word plural if difference is greater than 1
  return difference > 1 ? `${differenceInWords}s` : differenceInWords
}
