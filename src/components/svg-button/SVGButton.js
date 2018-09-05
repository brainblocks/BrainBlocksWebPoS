import React from 'react'
import { css } from 'react-emotion'
import theme from 'theme'
import CalculatorIcon from 'svg/calculator_icon.svg'
import CashIcon from 'svg/cash_icon.svg'
import WalletIcon from 'svg/wallet_icon.svg'

const icons = {
  calculator: CalculatorIcon,
  currency: CashIcon,
  wallet: WalletIcon
}

const getStyles = props => {
  const wrap = css`
    display: block;
    text-align: center;
    width: 100%;
    cursor: pointer;
  `

  const button = css`
    padding: 10px;
    display: block;
    width: 100%;
    background: ${props.color};
    border-radius: 15px;
    height: 0;
    padding-top: 77.4%;
    position: relative;
    transition: opacity 0.2s ease;
    img {
      position: absolute;
      width: auto;
      height: auto;
      max-width: 43.5%;
      max-height: 57%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .${wrap}:hover & {
      opacity: 0.8;
    }
  `

  const caption = css`
    color: ${theme.color.text};
    display: block;
    text-align: center;
    padding: 10px 0;
    font-weight: 600;
    @media (min-width: ${theme.bp.tablet}px) {
      padding: 16px 0;
    }
    @media (min-width: ${theme.bp.desktop}px) {
      padding: 20px 0;
      font-size: 20px;
    }
  `

  return { wrap, button, caption }
}

const SVGButton = props => {
  const classes = getStyles(props)

  return (
    <a className={classes.wrap} onClick={props.onClick}>
      <span className={classes.button}>
        <img src={icons[props.icon]} alt={`${props.title} Icon`} />
      </span>
      <span className={classes.caption}>{props.title}</span>
    </a>
  )
}

export default SVGButton
