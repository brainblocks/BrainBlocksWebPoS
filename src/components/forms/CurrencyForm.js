import React from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import { Form, FormField } from 'components/forms/Form'
import SelectField from 'components/forms/SelectField'
import Button from 'components/button/Button'

const CurrencyForm = props => {
  const allCurrencies = props.currencies.slice().sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })
  const currencies = allCurrencies.map(c => ({
    value: c,
    title: `${c.toUpperCase()} ${getSymbolFromCurrency(c.toUpperCase()) || ''}`
  }))
  return (
    <Form>
      <FormField label="Select your currency" for="currency">
        <SelectField
          id="currency"
          value={props.currencyFieldValue}
          options={currencies}
          onChange={props.onUpdateCurrency}
          style={{ fontSize: 30, padding: '0.5em 2em 0.5em 1em' }}
        />
      </FormField>
      <Button onClick={() => props.onSaveCurrency()}>Save</Button>
    </Form>
  )
}

export default CurrencyForm
