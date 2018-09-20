import moment from 'moment-with-locales-es6'

function formatNano(nanoVal, trim = false) {
  const nanoValString = nanoVal + ''
  const val = parseFloat(nanoValString)
  const digits = new Intl.NumberFormat('en-US', { maximumFractionDigits: trim ? 5 : 20 }).format(
    val
  )
  if (trim || nanoValString.indexOf('.') === -1) {
    return `${digits} NANO`
  } else {
    const decimals = nanoValString.split('.')[1]
    const digitsIntNotRounded = digits.split('.')[0]
    return `${digitsIntNotRounded}.${decimals} NANO`
  }
}

function formatFiatOld(fiatVal, currencySymbol, trim = false) {
  const fiatValString = fiatVal + ''
  const val = parseFloat(fiatValString)
  const digits = new Intl.NumberFormat('en-US', { maximumFractionDigits: trim ? 2 : 20 }).format(
    val
  )
  const decimal = fiatValString.charAt(fiatValString.length - 1) === '.' ? '.' : ''
  return `${currencySymbol}${digits}${decimal}`
}

function formatFiat(fiatVal, currencyCode, trim = false) {
  const fiatValString = fiatVal + ''
  const val = parseFloat(fiatValString)
  let digits
  if (currencyCode === 'VES') {
    digits =
      'VES ' + new Intl.NumberFormat('en-US', { maximumFractionDigits: trim ? 2 : 20 }).format(val)
  } else {
    digits = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode.toUpperCase(),
      maximumFractionDigits: trim ? 2 : 20
    }).format(val)
  }
  if (trim) {
    return digits
  } else {
    const digitsIntNotRounded = digits.split('.')[0]
    if (fiatValString.indexOf('.') >= 0) {
      const decimals = fiatValString.split('.')[1]
      return `${digitsIntNotRounded}.${decimals}`
    } else {
      return `${digitsIntNotRounded}`
    }
  }
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

function changeMomentLocale(locale) {
  moment.locale(locale)
}

export { moment, formatNano, formatFiat, formatTimeAgo, formatTime, formatDate, changeMomentLocale }
