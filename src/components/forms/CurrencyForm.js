import React from 'react'
import { Form, FormField } from 'components/forms/Form'
import SelectField from 'components/forms/SelectField'
import Button from 'components/button/Button'

const CurrencyForm = props => {
  const currencies = props.currencies.map(c => ({
    value: c.code,
    title: `${c.symbol} ${c.code}`
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
      <Button onClick={props.onSaveCurrency}>Save</Button>
    </Form>
  )
}

export default CurrencyForm
