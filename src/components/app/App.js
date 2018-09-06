import React, { Component, Fragment } from 'react'
import { css } from 'react-emotion'
import theme from 'theme'
import { isValidNanoAddress } from 'functions/nano'
import Dashboard from 'components/dashboard/Dashboard'
import Calculator from 'components/calculator/Calculator'
import Modal from 'components/modal/Modal'
import AddressForm from 'components/forms/AddressForm'
import CurrencyForm from 'components/forms/CurrencyForm'
import TransactionInfo from 'components/transactions/TransactionInfo'

const getCurrencies = () => {
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
  return Promise.resolve(currencies)
}

const getTransactions = () => {
  const transactions = [
    {
      address: 'xrb_1nanode8ngaakzbck8smq6ru9bethqwyehomf79sae1k7xd47dkidjqzffeg',
      link: 'xrb_1matere8ngaakzbck8smq6ru9bethqwyehomf79sae1k7xd47dkidjqzabcd',
      type: 'receive',
      nanoValue: 2.56,
      raiValue: 2560000000000,
      currency: 'AUD',
      fiatValue: 11.327,
      timestamp: 1536229581120
    },
    {
      address: 'xrb_12345678ngaakzbck8smq6ru9bethqwyehomf79sae1k7xd47dkidjqzfade',
      link: 'xrb_1biadi388ngaakzbck8smq6ru9bethqwyehomf79sae1k7xd47dkidjqzhijk',
      type: 'receive',
      nanoValue: 11.123456,
      raiValue: 111234567890,
      currency: 'CNY',
      fiatValue: 45.87234,
      timestamp: 1536229561120
    }
  ]
  return Promise.resolve(transactions)
}

const getStyles = props => {
  return {
    container: css`
      background: white;
      max-width: ${theme.bp.fullWidth}px;
      max-height: ${theme.bp.fullHeight}px;
      box-shadow: 10px 10px 120px rgba(0, 0, 0, 0.2);
      margin: auto;
      min-height: 100vh;
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
      currencies: [],
      transactions: [],
      openPanel: 'dashboard',
      openModal: '',
      addressFieldValue: address,
      currencyFieldValue: currencyCode,
      currencyNanoPrice: 0,
      currencySymbol: '$',
      transactionModalIndex: 0
    }
  }

  componentDidMount = () => {
    getCurrencies().then(currencies => {
      const currency = currencies.find(c => c.code === this.state.currencyCode)
      this.setState({
        currencies,
        currencyNanoPrice: currency.nanoPrice,
        currencySymbol: currency.symbol
      })
    })
    getTransactions().then(transactions => {
      this.setState({ transactions })
    })
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

  handleSetCurrency = code => {
    code = code || this.state.currencyFieldValue
    const currency = this.state.currencies.find(c => c.code === code)
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

  handleInspectTransaction = txId => {
    this.setState({
      openModal: 'transaction',
      transactionModalIndex: txId
    })
  }

  render() {
    const classes = getStyles(this.props)

    return (
      <div className={classes.container}>
        {this.state.openPanel === 'dashboard' && (
          <Fragment>
            <Dashboard
              currencies={this.state.currencies}
              transactions={this.state.transactions}
              currencySymbol={this.state.currencySymbol}
              currencyCode={this.state.currencyCode}
              posEnabled={isValidNanoAddress(this.state.address)}
              onOpenModal={this.handleOpenModal}
              onOpenPoS={this.getHandleSwitchPanel('pos')}
              onInspectTransaction={this.handleInspectTransaction}
            />
            <Modal open={this.state.openModal === 'currency'} onClose={this.handleCloseModal}>
              <CurrencyForm
                currencies={this.state.currencies}
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
            <Modal open={this.state.openModal === 'transaction'} onClose={this.handleCloseModal}>
              {this.state.transactions.length >= 1 && (
                <TransactionInfo
                  transaction={this.state.transactions[this.state.transactionModalIndex]}
                />
              )}
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
