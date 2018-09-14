function isValidNanoAddress(address) {
  const re = /^(xrb|nano)_[13][13456789abcdefghijkmnopqrstuwxyz]{59}$/
  return re.test(address)
}

function raiToNano(rai) {
  return rai / 1000000
}

function nanoToRai(nano) {
  return nano * 1000000
}

function currencyToNanoViaUSD(currencyUSD, usdRai) {
  return usdRai / currencyUSD / 1000000
}

export { isValidNanoAddress, raiToNano, nanoToRai, currencyToNanoViaUSD }
