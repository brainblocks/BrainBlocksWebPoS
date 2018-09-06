import React from 'react'
import { css } from 'react-emotion'
import theme from 'theme'

const getStyles = props => {
  const wrap = css``
  return { wrap }
}

const TransactionInfo = props => {
  const classes = getStyles(props)
  const tx = props.transaction

  return <div className={classes.wrap}>{tx.nanoValue}</div>
}

export default TransactionInfo
