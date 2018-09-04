import React from 'react'
import { css } from 'react-emotion'
import Color from 'color'
import theme from 'theme'

const getStyles = props => {
  const primaryButton = css`
    background: ${theme.color.buttonPrimary};
    font-weight: bold;
    ${!props.disabled &&
      `
      &:hover {
        background: ${Color(theme.color.buttonPrimary)
          .darken(0.2)
          .string()};
      }
    `};
  `

  const secondaryButton = css`
    background: ${theme.color.buttonSecondary};
    ${!props.disabled &&
      `
      &:hover {
        background: ${Color(theme.color.buttonSecondary)
          .darken(0.2)
          .string()};
      }
    `};
  `

  const disabledButton = css`
    opacity: 0.5;
    cursor: default;
  `

  const button = css`
    color: #fff;
    font-size: 17px;
    border-radius: 5px;
    padding: 0.75em 1.5em;
    text-align: center;
    min-width: 10em;
    border: none;
    transition: background 0.2s ease;
    text-decoration: none;
    cursor: pointer;
    ${props.type === 'secondary' ? secondaryButton : primaryButton};
    ${props.disabled && disabledButton};
  `
  return { button }
}

const Button = props => {
  const { el = 'button', onClick, disabled = false, ...rest } = props
  const classes = getStyles(props)

  const Tag = el
  return (
    <Tag className={classes.button} disabled={disabled} onClick={onClick} {...rest}>
      {props.children}
    </Tag>
  )
}

export default Button
