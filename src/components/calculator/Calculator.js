import React, { Component } from 'react'
import { css } from 'react-emotion'
import Color from 'color'
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon'
import BackspaceIcon from 'mdi-react/BackspaceIcon'
import theme from 'theme'
import { sanitizeValString, convert } from 'functions/calculator'
import SwitchIcon from 'svg/switch_icon.svg'

const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']

// Collapse me
const getStyles = props => {
  const calculator = css``
  const display = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25%;
    background: ${theme.color.currencyIcon};
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
    font-size: 5.5vh;
    @media (max-height: 550px) {
      font-size: 34px;
    }
  `
  const pad = css`
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    height: 75%;
    background: green;
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
    @media (min-width: ${theme.bp.fullWidth}px) {
      font-size: 34px;
    }
    @media (max-width: ${theme.bp.mobile}px) {
      font-size: 22px;
    }
    &:active,
    &:hover {
      background: ${theme.color.lightestgray};
    }
    &:disabled {
      background: white;
      color: #999;
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
      font-size: 6vw;
      line-height: 1;
    }
  `
  const key_backspace = css`
    ${key};
    top: 0%;
    ${key_right};
    color: ${theme.color.text};
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
  const key_pay = css`
    ${key};
    top: 75%;
    left: 50%;
    width: 50%;
    background: ${theme.color.posIcon};
    color: #fff;
    font-weight: bold;
    letter-spacing: 0;
    font-size: 2.8vw;
    &:hover,
    &:active {
      background: ${Color(theme.color.posIcon)
        .darken(0.15)
        .string()};
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
    key_icon
  }
}

class Calculator extends Component {
  state = {
    amountFiat: '0',
    amountNano: '0',
    editing: 'amountFiat'
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
    let amountNano = editing === 'amountNano' ? valstring : convert(val, 'nano', nanoPrice)
    let amountFiat = editing === 'amountFiat' ? valstring : convert(val, 'fiat', nanoPrice)
    // Back to string
    amountNano += ''
    amountFiat += ''
    // Sanitize again
    amountNano = sanitizeValString(amountNano)
    amountFiat = sanitizeValString(amountFiat)
    // Leave state update for the caller
    return { amountNano, amountFiat }
  }

  formatNano = (nanoValString, trim = false) => {
    const val = parseFloat(nanoValString)
    const digits = new Intl.NumberFormat('en-US', { maximumFractionDigits: trim ? 5 : 20 }).format(
      val
    )
    const decimal = nanoValString.charAt(nanoValString.length - 1) === '.' ? '.' : ''
    return `${digits}${decimal} NANO`
  }

  formatFiat = (fiatValString, trim = false) => {
    const val = parseFloat(fiatValString)
    const digits = new Intl.NumberFormat('en-US', { maximumFractionDigits: trim ? 2 : 20 }).format(
      val
    )
    const decimal = fiatValString.charAt(fiatValString.length - 1) === '.' ? '.' : ''
    return `${this.props.currencySymbol}${digits}${decimal}`
  }

  getHandleKeypress = key => () => {
    const newAmount = this.state[this.state.editing] + key
    this.setState(this.calculate(newAmount))
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
    // First update editing
    this.setState(
      {
        editing: editingBeforeSwitch === 'amountNano' ? 'amountFiat' : 'amountNano'
      },
      // Then run calculate again using the editingBeforeSwitch value
      () => {
        this.setState(this.calculate(this.state[editingBeforeSwitch]))
      }
    )
  }

  render() {
    const classes = getStyles(this.props)

    return (
      <div className={classes.calculator}>
        <div className={classes.display}>
          <button className={classes.back} onClick={this.props.onBack}>
            <ArrowLeftIcon /> <span>Dashboard</span>
          </button>
          {this.state.editing === 'amountNano' ? (
            <div className={classes.currs}>
              <span className={classes.curr1}>{this.formatFiat(this.state.amountFiat, true)}</span>
              <span className={classes.curr2}>{this.formatNano(this.state.amountNano, false)}</span>
            </div>
          ) : (
            <div className={classes.currs}>
              <span className={classes.curr1}>{this.formatNano(this.state.amountNano, true)}</span>
              <span className={classes.curr2}>{this.formatFiat(this.state.amountFiat, false)}</span>
            </div>
          )}
        </div>
        <div className={classes.pad}>
          {buttons.map(btn => (
            <button
              key={`key-${btn}`}
              className={classes[`key_${btn === '.' ? 'period' : btn}`]}
              onClick={this.getHandleKeypress(btn)}
              disabled={btn === '.' && this.state[this.state.editing].indexOf('.') >= 0}
            >
              <span className={classes.key_content}>{btn}</span>
            </button>
          ))}
          <button className={classes.key_backspace} onClick={this.handleBackspace}>
            <BackspaceIcon className={classes.key_icon} />
          </button>
          <button className={classes.key_clear} onClick={this.handleClear}>
            <span className={classes.key_content}>Clear</span>
          </button>
          <button className={classes.key_switch} onClick={this.handleSwitch}>
            <img className={classes.key_icon} src={SwitchIcon} alt="Switch" />
          </button>
          <button className={classes.key_pay}>
            <span className={classes.key_content}>Pay</span>
          </button>
        </div>
      </div>
    )
  }
}

export default Calculator
