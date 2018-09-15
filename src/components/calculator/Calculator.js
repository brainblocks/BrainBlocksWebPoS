import React, { Component } from 'react'
import { css } from 'react-emotion'
import Color from 'color'
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon'
import BackspaceIcon from 'mdi-react/BackspaceIcon'
import CloseIcon from 'mdi-react/CloseIcon'
import theme from 'theme'
import { formatNano, formatFiat } from 'functions/format'
import { sanitizeValString, convert } from 'functions/calculator'
import { extra_currencies } from 'constants/currencies'
import SwitchIcon from 'svg/switch_icon.svg'
import BrainBlocksModule from 'components/brainblocks/BrainBlocksModule'
import { nanoToRai } from 'functions/nano'
import { MAX_MODULE_NANO_AMOUNT } from 'constants/module'

const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']

// Collapse me
const getStyles = props => {
  const calculator = css``
  const displayGradientLight = Color(theme.color.currencyIcon)
    .lighten(0.15)
    .string()
  const displayGradientDark = Color(theme.color.currencyIcon)
    .darken(0.1)
    .string()
  const display = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25%;
    background: ${theme.color.currencyIcon};
    background: linear-gradient(135deg, ${displayGradientLight} 0%, ${displayGradientDark} 100%);
  `
  const back = css`
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    margin: 4%;
    background: transparent;
    border: none;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    box-shadow: none !important;
    outline: none !important;
    span {
      display: none;
    }
    @media (min-width: ${theme.bp.tablet}px) {
      font-size: 18px;
      span {
        display: inline;
        margin-left: 0.5em;
      }
    }
  `
  const currs = css`
    position: absolute;
    right: 4%;
    text-align: right;
    top: 50%;
    transform: translateY(-50%);
  `
  const curr = css`
    color: #fff;
    display: block;
    @media (max-height: 550px) {
      line-height: 1.2;
    }
  `
  const curr1 = css`
    ${curr};
    font-size: 2.8vh;
    @media (max-height: 550px) {
      font-size: 20px;
    }
  `
  const curr2 = css`
    ${curr};
    font-size: 6.4vh;
    @media (max-height: 550px) {
      font-size: 38px;
    }
  `
  const pad = css`
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    height: 75%;
  `
  const key = css`
    position: absolute;
    width: 25%;
    height: 25%;
    border: none;
    background: white;
    color: #201f1f;
    cursor: pointer;
    outline: none !important;
    box-shadow: none !important;
    -webkit-tap-highlight-color: ${theme.color.lightestgray};
    letter-spacing: 0.2em;
    font-size: 3.4vw;
    touch-action: manipulation;
    @media (min-width: ${theme.bp.fullWidth}px) {
      font-size: 34px;
    }
    @media (max-width: ${theme.bp.mobile}px) {
      font-size: 22px;
    }
    &:active {
      background: ${theme.color.lightestgray};
    }
    &:disabled {
      cursor: default;
      background: white;
      color: #999;
    }
    @media (hover: hover) {
      &:hover:not(:disabled) {
        background: ${theme.color.lightestgray};
      }
    }
  `
  const key_right = css`
    left: 75%;
    border-left: 2px solid ${theme.color.lightestgray};
  `
  const key_bottom = css`
    top: 75%;
    border-top: 2px solid ${theme.color.lightestgray};
  `
  const key_1 = css`
    ${key};
    top: 0;
    left: 0;
  `
  const key_2 = css`
    ${key};
    top: 0;
    left: 25%;
  `
  const key_3 = css`
    ${key};
    top: 0;
    left: 50%;
  `
  const key_4 = css`
    ${key};
    top: 25%;
    left: 0;
  `
  const key_5 = css`
    ${key};
    top: 25%;
    left: 25%;
  `
  const key_6 = css`
    ${key};
    top: 25%;
    left: 50%;
  `
  const key_7 = css`
    ${key};
    top: 50%;
    left: 0;
  `
  const key_8 = css`
    ${key};
    top: 50%;
    left: 25%;
  `
  const key_9 = css`
    ${key};
    top: 50%;
    left: 50%;
  `
  const key_0 = css`
    ${key};
    ${key_bottom};
    left: 0;
  `
  const key_period = css`
    ${key};
    ${key_bottom};
    left: 25%;
    span {
      font-size: 54px;
      line-height: 1;
      @media (max-width: ${theme.bp.mobile}px) {
        font-size: 44px;
      }
    }
  `
  const key_backspace = css`
    ${key};
    top: 0%;
    ${key_right};
    color: ${theme.color.headings};
  `
  const key_clear = css`
    ${key};
    top: 25%;
    ${key_right};
    font-size: 3vw;
    @media (min-width: ${theme.bp.fullWidth}px) {
      font-size: 30px;
    }
    @media (max-width: ${theme.bp.mobile}px) {
      font-size: 16px;
    }
  `
  const key_switch = css`
    ${key};
    top: 50%;
    ${key_right};
  `
  const payGradientLight = Color(theme.color.posIcon)
    .lighten(0.15)
    .string()
  const payGradientDark = Color(theme.color.posIcon)
    .darken(0.1)
    .string()
  const key_pay = css`
    ${key};
    top: 75%;
    left: 50%;
    width: 50%;
    background: ${theme.color.posIcon};
    background: linear-gradient(135deg, ${payGradientLight} 0%, ${payGradientDark} 100%);
    color: #fff;
    font-weight: bold;
    letter-spacing: 0;
    font-size: 2.8vw;
    -webkit-tap-highlight-color: ${Color(theme.color.posIcon)
      .darken(0.15)
      .string()};
    &:active {
      background: ${Color(theme.color.posIcon)
        .darken(0.15)
        .string()};
    }
    &:disabled {
      background: ${Color(theme.color.posIcon)
        .lighten(0.25)
        .string()};
      color: #fff;
    }
    @media (hover: hover) {
      &:hover:not(:disabled) {
        background: ${Color(theme.color.posIcon)
          .darken(0.15)
          .string()};
      }
    }
    @media (min-width: ${theme.bp.fullWidth}px) {
      font-size: 28px;
    }
    @media (max-width: ${theme.bp.mobile}px) {
      font-size: 16px;
    }
  `
  const key_content = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    font-size: inherit;
  `
  const key_icon = css`
    ${key_content};
    width: 25%;
    height: auto;
    max-width: 50px;
    max-height: 40px;
  `
  const paybackdrop = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
  `
  const paymodule = css`
    position: fixed;
    z-index: 20;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `
  const closemodule = css`
    position: absolute;
    right: -40px;
    top: 0;
    border: none;
    width: 30px;
    height: 30px;
    background: ${theme.color.text};
    appearance: none;
    border-radius: 100%;
    line-height: 30px;
    text-align: center;
    color: #fff;
    padding: 3px;
    cursor: pointer;
    &:hover {
      background: ${theme.color.headings};
    }
    @media (max-width: ${theme.bp.mobile}px) {
      right: 0;
      top: -34px;
    }
    @media (max-height: 520px) {
      top: 12px;
      right: 5px;
      z-index: 20;
    }
  `
  return {
    calculator,
    display,
    currs,
    curr1,
    curr2,
    back,
    pad,
    key_1,
    key_2,
    key_3,
    key_4,
    key_5,
    key_6,
    key_7,
    key_8,
    key_9,
    key_0,
    key_period,
    key_backspace,
    key_clear,
    key_switch,
    key_pay,
    key_content,
    key_icon,
    paymodule,
    paybackdrop,
    closemodule
  }
}

class Calculator extends Component {
  state = {
    amountFiat: '0',
    amountNano: '0',
    editing: 'amountFiat',
    isPaying: false
  }

  calculate = valstring => {
    const { editing } = this.state
    const nanoPrice = this.props.currencyNanoPrice
    // Sanitize
    valstring = sanitizeValString(valstring)
    // Parse to float
    const val = parseFloat(valstring)
    // Calculate - avoid parsing the valstring to float
    // to preserve things like a trailing decimal
    let amountNano = editing === 'amountNano' ? valstring : convert(val, 'fiat', nanoPrice)
    let amountFiat = editing === 'amountFiat' ? valstring : convert(val, 'nano', nanoPrice)
    // Back to string
    amountNano += ''
    amountFiat += ''
    // Sanitize again
    amountNano = sanitizeValString(amountNano)
    amountFiat = sanitizeValString(amountFiat)
    // Leave state update for the caller
    return { amountNano, amountFiat }
  }

  getHandleKeypress = key => () => {
    const newAmount = this.state[this.state.editing] + key
    const amounts = this.calculate(newAmount)
    if (parseFloat(amounts.amountNano) > MAX_MODULE_NANO_AMOUNT) return
    this.setState(amounts)
  }

  handleBackspace = () => {
    const { editing } = this.state
    const newAmount = this.state[editing].slice(0, -1)
    this.setState(this.calculate(newAmount))
  }

  handleClear = () => {
    this.setState({
      amountFiat: '0',
      amountNano: '0'
    })
  }

  handleSwitch = () => {
    const editingBeforeSwitch = this.state.editing
    let valueBeforeSwitch = this.state[editingBeforeSwitch]
    if (
      editingBeforeSwitch === 'amountFiat' &&
      parseFloat(this.state.amountFiat) > MAX_MODULE_NANO_AMOUNT
    ) {
      valueBeforeSwitch = MAX_MODULE_NANO_AMOUNT.toString()
    }
    // First update editing
    this.setState(
      {
        editing: editingBeforeSwitch === 'amountNano' ? 'amountFiat' : 'amountNano'
      },
      // Then run calculate again using the editingBeforeSwitch value
      () => {
        this.setState(this.calculate(valueBeforeSwitch))
      }
    )
  }

  handlePay = () => {
    this.setState({
      isPaying: true
    })
  }

  handleCloseModule = () => {
    this.setState({
      isPaying: false,
      amountFiat: '0',
      amountNano: '0'
    })
  }

  handlePaymentCompleted = data => {
    this.props.onPaymentCompleted(data, this.state.amountFiat)
    setTimeout(this.handleCloseModule, 3000)
  }

  render() {
    const classes = getStyles(this.props)
    const moduleProps = {}
    if (this.state.editing === 'amountNano' || extra_currencies.includes(this.props.currencyCode)) {
      moduleProps.currency = 'rai'
      moduleProps.amount = nanoToRai(this.state.amountNano)
    } else {
      moduleProps.currency = this.props.currencyCode
      moduleProps.amount = this.state.amountFiat
    }

    return (
      <div className={classes.calculator}>
        <div className={classes.display}>
          <button className={classes.back} onClick={this.props.onBack}>
            <ArrowLeftIcon /> <span>Dashboard</span>
          </button>
          {this.state.editing === 'amountNano' ? (
            <div className={classes.currs}>
              <span className={classes.curr1}>
                ~ {formatFiat(this.state.amountFiat, this.props.currencyCode, true)}
              </span>
              <span className={classes.curr2}>{formatNano(this.state.amountNano, false)}</span>
            </div>
          ) : (
            <div className={classes.currs}>
              <span className={classes.curr1}>~ {formatNano(this.state.amountNano, true)}</span>
              <span className={classes.curr2}>
                {formatFiat(this.state.amountFiat, this.props.currencyCode, false)}
              </span>
            </div>
          )}
        </div>
        <div className={classes.pad}>
          {buttons.map(btn => (
            <button
              id={`key-${btn}`}
              key={`key-${btn}`}
              className={classes[`key_${btn === '.' ? 'period' : btn}`]}
              onClick={this.getHandleKeypress(btn)}
              disabled={btn === '.' && this.state[this.state.editing].indexOf('.') >= 0}
            >
              <span className={classes.key_content}>
                {btn === '.' ? <span>&middot;</span> : btn}
              </span>
            </button>
          ))}
          <button
            id={`key-backspace`}
            className={classes.key_backspace}
            onClick={this.handleBackspace}
            disabled={this.state[this.state.editing] === '0'}
          >
            <BackspaceIcon className={classes.key_icon} />
          </button>
          <button
            id={`key-clear`}
            className={classes.key_clear}
            onClick={this.handleClear}
            disabled={this.state[this.state.editing] === '0'}
          >
            <span className={classes.key_content}>Clear</span>
          </button>
          <button id={`key-switch`} className={classes.key_switch} onClick={this.handleSwitch}>
            <img className={classes.key_icon} src={SwitchIcon} alt="Switch" />
          </button>
          <button
            id={`key-pay`}
            className={classes.key_pay}
            onClick={this.handlePay}
            disabled={parseFloat(this.state[this.state.editing]) <= 0}
          >
            <span className={classes.key_content}>Receive</span>
          </button>
        </div>
        {this.state.isPaying && (
          <div className={classes.paybackdrop}>
            <div className={classes.paymodule}>
              <button className={classes.closemodule} onClick={this.handleCloseModule}>
                <CloseIcon />
              </button>
              <BrainBlocksModule
                onPayment={this.handlePaymentCompleted}
                address={this.props.address}
                {...moduleProps}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Calculator
