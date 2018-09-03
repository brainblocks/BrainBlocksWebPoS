import React, { Component } from 'react'
import { css } from 'react-emotion'

const getStyles = props => {
  const calculator = css``
  return { calculator }
}

class Calculator extends Component {
  state = {
    amountFiat: 0,
    amountNano: 0
  }

  render() {
    const classes = getStyles(this.props)

    return <div className={classes.calculator}>Calculator</div>
  }
}

export default Calculator
