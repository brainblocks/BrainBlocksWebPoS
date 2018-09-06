/**
 * Sanitize a value string
 * @param {string} valstring
 */
export const sanitizeValString = valstring => {
  // ensure string
  valstring += ''
  // strip leading zeros unless followed by decimal
  while (valstring.charAt(0) === '0') {
    if (valstring.charAt(1) === '.') break
    valstring = valstring.substr(1)
  }
  // set to zero if that broke anything
  if (valstring.length <= 0) {
    valstring = '0'
  }
  // add leading zero if first char is decimal
  if (valstring.charAt(0) === '.') {
    valstring = '0' + valstring
  }
  return valstring
}

/**
 * Convert from Nano to Fiat and vice versa
 * @param {float} val Value to convert
 * @param {string} from nano | fiat - is val in nano or fiat
 * @param {float} nanoPrice Current nano value
 */
export const convert = (val, from, nanoPrice) => {
  if (!nanoPrice) return 0
  return from === 'nano' ? val * nanoPrice : val / nanoPrice
}
