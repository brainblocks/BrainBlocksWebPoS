function isValidNanoAddress(address) {
  const re = /^(xrb|nano)_[13][13456789abcdefghijkmnopqrstuwxyz]{59}$/
  return re.test(address)
}

export { isValidNanoAddress }
