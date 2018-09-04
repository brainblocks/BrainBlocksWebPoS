import React from 'react'
import { Form, FormField } from 'components/forms/Form'
import TextInput from 'components/forms/TextInput'
import Button from 'components/button/Button'

const AddressForm = props => {
  return (
    <Form>
      <FormField label="Please enter your NANO address" for="address">
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
        style={{ marginRight: '0.5em' }}
      >
        Save
      </Button>{' '}
      or{' '}
      <Button
        type="secondary"
        el="a"
        href="https://nanowallet.io"
        target="_blank"
        style={{ marginLeft: '0.5em' }}
      >
        Create New Wallet
      </Button>
    </Form>
  )
}

export default AddressForm
