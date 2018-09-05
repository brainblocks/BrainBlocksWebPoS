import React from 'react'
import { css } from 'react-emotion'
import { getStyles as getTextInputStyles } from 'components/forms/TextInput'

const getStyles = (textInputStyles, props) => {
  const textinput = css`
    ${textInputStyles.textinput};
    appearance: none;
    width: auto;
    padding-right: 2.5em;
    font-size: 24px;
    padding: 0.8em 2em 0.8em 1em;
    background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%230%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 0.8em bottom 49%;
  `
  return { textinput }
}

const SelectField = props => {
  const { value = '', onChange, options = [], ...rest } = props
  const textInputStyles = getTextInputStyles(props)
  const classes = getStyles(textInputStyles, props)

  return (
    <select className={classes.textinput} onChange={onChange} value={value} {...rest}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.title}
        </option>
      ))}
    </select>
  )
}

export default SelectField
