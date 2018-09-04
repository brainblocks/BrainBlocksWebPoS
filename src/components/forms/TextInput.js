import React from 'react'
import { css } from 'react-emotion'
import Color from 'color'
import theme from 'theme'

const getStyles = props => {
  const invalidinput = css`
    color: ${Color(theme.color.error)
      .lighten(0.2)
      .string()};
    border-color: ${Color(theme.color.error)
      .lighten(0.6)
      .string()};
    &:focus {
      border-color: ${theme.color.error};
    }
  `

  const textinput = css`
    border: 2px solid
      ${Color(theme.color.fieldBorder)
        .lighten(0.4)
        .string()};
    border-radius: 5px;
    font-size: 18px;
    width: 100%;
    padding: 1.7em 1em;
    background: transparent;
    &:focus {
      border-color: ${theme.color.fieldBorder};
      box-shadow: none;
      outline: none;
    }
    ${props.hasOwnProperty('valid') && !props.valid && props.value.length && invalidinput};
  `
  return { textinput }
}

const TextInput = props => {
  const { type = 'text', value = '', onChange, valid, ...rest } = props
  const classes = getStyles(props)

  return (
    <input type={type} value={value} className={classes.textinput} onChange={onChange} {...rest} />
  )
}

export default TextInput
export { getStyles }
