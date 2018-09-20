import React from 'react'
import { Form, FormField } from 'components/forms/Form'
import TextInput from 'components/forms/TextInput'
import Button from 'components/button/Button'

const AddressForm = props => {
  const { t } = props

  return (
    <Form>
      <FormField label={t('addressFieldLabel')} for="address">
        <TextInput
          id="address"
          value={props.addressFieldValue}
          onChange={props.onUpdateAddress}
          valid={props.addressFieldValid}
        />
      </FormField>
      <Button
        disabled={!props.addressFieldValid}
        onClick={props.onSaveAddress}
        style={{ marginBottom: 5 }}
      >
        {t('addressFormSave')}
      </Button>
      <span style={{ display: 'inline-block', margin: '0 0.5em' }}>{t('or')}</span>
      <Button type="secondary" el="a" href="https://nanowallet.io" target="_blank">
        {t('addressFormCreateNew')}
      </Button>
    </Form>
  )
}

export default AddressForm
