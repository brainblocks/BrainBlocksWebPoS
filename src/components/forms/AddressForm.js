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
        style={{ marginBottom: 5 }}
      >
        Save
      </Button>
      <span style={{ display: 'inline-block', margin: '0 0.5em' }}>or</span>
      <Button type="secondary" el="a" href="https://nanowallet.io" target="_blank">
        Create New Wallet
      </Button>
    </Form>
  )
}

export default AddressForm
