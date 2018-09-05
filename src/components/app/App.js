import React, { Component, Fragment } from 'react'
import styled from 'react-emotion'
import { isValidNanoAddress } from 'functions/nano'
import Dashboard from 'components/dashboard/Dashboard'
import Calculator from 'components/calculator/Calculator'
import Modal from 'components/modal/Modal'
import AddressForm from 'components/forms/AddressForm'
import CurrencyForm from 'components/forms/CurrencyForm'

const currencies = [
  {
    code: 'AUD',
    symbol: '$',
    nanoPrice: 4.18
  },
  {
    code: 'USD',
    symbol: '$',
    nanoPrice: 3.4
  },
  {
    code: 'CNY',
    symbol: '¥',
    nanoPrice: 21.02
  }
]

const Container = styled('div')`
  background: white;
  max-width: ${props => props.theme.bp.fullWidth}px;
  box-shadow: 10px 10px 120px rgba(0, 0, 0, 0.2);
  margin: auto;
  height: 100vh;
  width: 100%;
  position: relative;
  @media (min-height: ${props => props.theme.bp.fullHeight}px) {
    height: ${props => props.theme.bp.fullHeight}px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

class App extends Component {
  state = {
    openPanel: 'dashboard',
    openModal: '',
    addressFieldValue: '',
    address: '',
    currencyFieldValue: 'USD',
    currencyCode: 'USD',
    currencyNanoPrice: 0,
    currencySymbol: '$'
  }

  isAddressFieldValid = () => {
    return isValidNanoAddress(this.state.addressFieldValue)
  }

  getHandleSwitchPanel = panel => () => {
    this.setState({
      openPanel: panel
    })
  }

  handleUpdateAddressField = event => {
    this.setState({
      addressFieldValue: event.target.value
    })
  }

  handleUpdateCurrencyField = event => {
    this.setState({
      currencyFieldValue: event.target.value
    })
  }

  handleSetAddress = () => {
    this.setState({
      address: this.state.addressFieldValue,
      openModal: ''
    })
  }

  handleSetCurrency = () => {
    const currency = currencies.find(c => c.code === this.state.currencyFieldValue)
    if (typeof currency === 'undefined') {
      throw new Error('Currency mismatch')
    }
    this.setState({
      currencyCode: currency.code,
      currencyNanoPrice: currency.nanoPrice,
      currencySymbol: currency.symbol,
      openModal: ''
    })
  }

  handleOpenModal = modal => () => {
    this.setState({
      openModal: modal
    })
  }

  handleCloseModal = () => {
    this.setState({
      openModal: ''
    })
  }

  render() {
    return (
      <Container>
        {this.state.openPanel === 'dashboard' && (
          <Fragment>
            <Dashboard
              onOpenModal={this.handleOpenModal}
              onOpenPoS={this.getHandleSwitchPanel('pos')}
            />
            <Modal open={this.state.openModal === 'currency'} onClose={this.handleCloseModal}>
              <CurrencyForm
                currencies={currencies}
                currencyFieldValue={this.state.currencyFieldValue}
                onUpdateCurrency={this.handleUpdateCurrencyField}
                onSaveCurrency={this.handleSetCurrency}
              />
            </Modal>
            <Modal open={this.state.openModal === 'address'} onClose={this.handleCloseModal}>
              <AddressForm
                addressFieldValue={this.state.addressFieldValue}
                addressFieldValid={this.isAddressFieldValid()}
                onUpdateAddress={this.handleUpdateAddressField}
                onSaveAddress={this.handleSetAddress}
              />
            </Modal>
          </Fragment>
        )}
        {this.state.openPanel === 'pos' && (
          <Calculator
            currencyCode={this.state.currencyCode}
            currencySymbol={this.state.currencySymbol}
            currencyNanoPrice={this.state.currencyNanoPrice}
            onBack={this.getHandleSwitchPanel('dashboard')}
          />
        )}
      </Container>
    )
  }
}

export default App
