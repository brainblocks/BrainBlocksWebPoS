import moment from 'moment'

function formatNano(nanoVal, trim = false) {
  const nanoValString = nanoVal + ''
  const val = parseFloat(nanoValString)
  const digits = new Intl.NumberFormat('en-US', { maximumFractionDigits: trim ? 5 : 20 }).format(
    val
  )
  const decimal = nanoValString.charAt(nanoValString.length - 1) === '.' ? '.' : ''
  return `${digits}${decimal} NANO`
}

function formatFiat(fiatVal, currencySymbol, trim = false) {
  const fiatValString = fiatVal + ''
  const val = parseFloat(fiatValString)
  const digits = new Intl.NumberFormat('en-US', { maximumFractionDigits: trim ? 2 : 20 }).format(
    val
  )
  const decimal = fiatValString.charAt(fiatValString.length - 1) === '.' ? '.' : ''
  return `${currencySymbol}${digits}${decimal}`
}

function formatTimeAgo(timestamp, shorten = false) {
  return moment(timestamp).fromNow(shorten)
}

function formatTime(timestamp) {
  return moment(timestamp).format('LT')
}

function formatDate(timestamp) {
  return moment(timestamp).format('ll')
}

export { formatNano, formatFiat, formatTimeAgo, formatTime, formatDate }
