import currencies, { extra_currencies, country_code_currency_map } from 'constants/currencies'

export function mapCountryCodeToCurrency(code) {
  const currency = country_code_currency_map[code]
  const supported_currencies = currencies.concat(extra_currencies).map(c => c.toUpperCase())
  if (supported_currencies.includes(currency)) {
    return currency.toLowerCase()
  }
  return 'usd'
}
