export function toApproximateCount(count?: number) {
  if (!count) {
    return ''
  }
  const lookup = [
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
    { value: 1, symbol: '' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup.slice().find(item => count >= item.value)
  return item ? (count / item.value).toFixed(1).replace(rx, '$1') + item.symbol + ' ' : ' '
}
