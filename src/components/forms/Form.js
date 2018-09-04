import React from 'react'
import { css } from 'react-emotion'

const form = css``
const formField = css`
  margin-bottom: 3%;
`
const formLabel = css`
  display: block;
  margin-bottom: 3%;
  font-weight: bold;
  font-size: 18px;
`

const Form = props => <div className={form}>{props.children}</div>

const FormField = props => {
  return (
    <div className={formField}>
      <label className={formLabel} htmlFor={props.for}>
        {props.label}
      </label>
      {props.children}
    </div>
  )
}

export { Form, FormField }
