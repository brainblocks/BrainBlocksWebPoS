import React from 'react'
import { css } from 'react-emotion'
import theme from 'theme'
import { formatNano, formatFiat } from 'functions/format'

const getStyles = props => {
  const wrap = css``
  const title = css`
    font-weight: 600;
    font-size: 20px;
    @media (max-width: ${theme.bp.tablet}px) {
      font-size: 19px;
    }
  `
  const table = css`
    width: 100%;
  `

  const td = css`
    font-size: 18px;
    text-align: right;
    padding-top: 0.75em;
    padding-bottom: 0.75em;
    padding-right: 1em;
    border-top: 1px solid ${theme.color.tableBorder};
    @media (max-width: ${theme.bp.tablet}px) {
      font-size: 16px;
    }
  `
  const timestamp = css`
    ${td};
    text-align: left;
  `
  const nanoval = css`
    ${td};
    font-weight: 600;
  `
  const fiatval = css`
    ${td};
    text-align: left;
    @media (max-width: ${theme.bp.mobile}px) {
      display: none;
    }
  `
  const info = css`
    ${td};
    padding-right: 0;
  `
  return { wrap, title, table, timestamp, nanoval, fiatval, info }
}

const getCurrencySymbol = (currencies, code) => {
  const currency = currencies.find(c => c.code === code)
  if (currency && currency.hasOwnProperty('symbol')) {
    return currency.symbol
  } else {
    return code + ' '
  }
}

const TransactionsTable = props => {
  const classes = getStyles(props)

  return (
    <div className={classes.wrap}>
      <h2 className={classes.title}>Latest Transactions</h2>
      <table className={classes.table}>
        <tbody>
          {props.transactions.map((tx, i) => (
            <tr
              className={classes.tr}
              key={`tx-${i}`}
              onClick={() => props.onInspectTransaction(i)}
            >
              <td className={classes.timestamp}>{tx.timestamp}</td>
              <td className={classes.nanoval}>{formatNano(tx.nanoValue, true)}</td>
              <td className={classes.fiatval}>
                {formatFiat(tx.fiatValue, getCurrencySymbol(props.currencies, tx.currency), true)}
              </td>
              <td className={classes.info}>info</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionsTable
