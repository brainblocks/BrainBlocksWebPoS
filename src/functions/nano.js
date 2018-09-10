function formatNano(nanoValString, trim = false) {
  const val = parseFloat(nanoValString)
  const digits = new Intl.NumberFormat('en-US', { maximumFractionDigits: trim ? 5 : 20 }).format(
    val
  )
  const decimal = nanoValString.charAt(nanoValString.length - 1) === '.' ? '.' : ''
  return `${digits}${decimal} NANO`
}

function isValidNanoAddress(address) {
  const re = /^(xrb|nano)_[13][13456789abcdefghijkmnopqrstuwxyz]{59}$/
  return re.test(address)
}

function raiToNano(rai) {
  return rai / 1000000
}

export { formatNano, isValidNanoAddress, raiToNano }
