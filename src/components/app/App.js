import React, { Component, Fragment } from 'react'
import { css } from 'react-emotion'
import theme from 'theme'
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

const getStyles = props => {
  return {
    container: css`
      background: white;
      max-width: ${theme.bp.fullWidth}px;
      max-height: ${theme.bp.fullHeight}px;
      box-shadow: 10px 10px 120px rgba(0, 0, 0, 0.2);
      margin: auto;
      height: 100vh;
      width: 100%;
      position: relative;
      @media (min-height: ${theme.bp.fullHeight}px) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    const address = window.localStorage['bb_pos_address'] || ''
    const currencyCode = window.localStorage['bb_pos_currencycode'] || 'USD'

    this.state = {
      address,
      currencyCode,
      openPanel: 'dashboard',
      openModal: '',
      addressFieldValue: address,
      currencyFieldValue: currencyCode,
      currencyNanoPrice: 0,
      currencySymbol: '$'
    }
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
    window.localStorage['bb_pos_address'] = this.state.addressFieldValue
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
    window.localStorage['bb_pos_currencycode'] = currency.code
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
    const classes = getStyles(this.props)

    return (
      <div className={classes.container}>
        {this.state.openPanel === 'dashboard' && (
          <Fragment>
            <Dashboard
              posEnabled={isValidNanoAddress(this.state.address)}
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
      </div>
    )
  }
}

export default App
