import React, { Component } from 'react'
import { css } from 'react-emotion'
import theme from 'theme'
import BackspaceIcon from 'svg/backspace_icon.svg'
import SwitchIcon from 'svg/switch_icon.svg'

const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']

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
    color: ${theme.color.text};
    outline: none !important;
    box-shadow: none !important;
    &:active {
      background: ${theme.color.lightestgray};
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
  `
  const key_backspace = css`
    ${key};
    top: 0%;
    ${key_right};
  `
  const key_clear = css`
    ${key};
    top: 25%;
    ${key_right};
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
  `
  const key_content = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    font-size: 3.4vw;
    @media (min-width: ${theme.bp.fullWidth}px) {
      font-size: 34px;
    }
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
    amountFiat: 0,
    amountNano: 0
  }

  render() {
    const classes = getStyles(this.props)

    return (
      <div className={classes.calculator}>
        <div className={classes.display}>
          <button onClick={this.props.onBack}>Dashboard</button>
        </div>
        <div className={classes.pad}>
          {buttons.map(btn => (
            <button key={`key-${btn}`} className={classes[`key_${btn === '.' ? 'period' : btn}`]}>
              <span className={classes.key_content}>{btn}</span>
            </button>
          ))}
          <button className={classes.key_backspace}>
            <img className={classes.key_icon} src={BackspaceIcon} alt="Switch" />
          </button>
          <button className={classes.key_clear}>
            <span className={classes.key_content}>Clear</span>
          </button>
          <button className={classes.key_switch}>
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
