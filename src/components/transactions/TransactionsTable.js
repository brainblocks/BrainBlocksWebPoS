import React from 'react'
import { css } from 'react-emotion'
import theme from 'theme'
import { formatNano, formatFiat } from 'functions/format'
import ArrowDownIcon from 'mdi-react/ArrowDownIcon'
import ArrowUpIcon from 'mdi-react/ArrowUpIcon'
import MoreIcon from 'mdi-react/MoreHorizIcon'

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
    border-collapse: collapse;
  `
  const td = css`
    font-size: 15px;
    color: #7f7f7f;
    font-weight: 600;
    text-align: center;
    padding: 0.66em 0.75em;
    letter-spacing: -0.01em;
    border-bottom: 1px solid ${theme.color.tableBorder};
    @media (max-width: ${theme.bp.tablet}px) {
      font-size: 16px;
    }
  `
  const th = css`
    ${td};
    background: #f3f3f3;
    color: #c3c3c3;
    border: none;
  `
  const tdHideMobile = css`
    @media (max-width: ${theme.bp.mobile}px) {
      display: none;
    }
  `
  const tdHideTablet = css`
    @media (max-width: ${theme.bp.tablet}px) {
      display: none;
    }
  `
  const thType = css`
    ${th};
    width: 4.5em;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  `
  const thTime = css`
    ${th};
  `
  const thAmount = css`
    ${th};
    @media (max-width: ${theme.bp.mobile}px) {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  `
  const thFiat = css`
    ${th};
    ${tdHideMobile};
    @media (max-width: ${theme.bp.tablet}px) {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  `
  const thMore = css`
    ${th};
    width: 4.5em;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    ${tdHideTablet};
  `
  const type = css`
    ${td};
  `
  const circleIcon = css`
    text-align: center;
    width: 24px;
    height: 24px;
    line-height: 24px;
    border: 2px solid ${theme.color.success};
    border-radius: 100%;
    margin: auto;
    position: relative;
    top: -2px;
  `
  const typeIconReceive = css`
    ${circleIcon};
    border-color: ${theme.color.success};
    color: ${theme.color.success};
  `
  const typeIconSend = css`
    ${circleIcon};
    border-color: ${theme.color.error};
    color: ${theme.color.error};
  `
  const timestamp = css`
    ${td};
  `
  const nanoval = css`
    ${td};
    font-weight: 600;
  `
  const fiatval = css`
    ${td};
    ${tdHideMobile};
  `
  const info = css`
    ${td};
    ${tdHideTablet};
  `
  return {
    wrap,
    title,
    table,
    thType,
    thTime,
    thAmount,
    thFiat,
    thMore,
    type,
    typeIconReceive,
    typeIconSend,
    timestamp,
    nanoval,
    fiatval,
    info
  }
}

const TransactionsTable = props => {
  const classes = getStyles(props)

  return (
    <div className={classes.wrap}>
      <h2 className={classes.title}>Recent Transactions</h2>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.thType}>Type</th>
            <th className={classes.thTime}>Time</th>
            <th className={classes.thAmount}>Amount</th>
            <th className={classes.thFiat}>Fiat</th>
            <th className={classes.thMore}>More</th>
          </tr>
        </thead>
        <tbody>
          {props.transactions.map((tx, i) => (
            <tr
              className={classes.tr}
              key={`tx-${i}`}
              onClick={() => props.onInspectTransaction(i)}
            >
              <td className={classes.type}>
                {tx.type === 'receive' ? (
                  <div className={classes.typeIconReceive}>
                    <ArrowDownIcon size={20} />
                  </div>
                ) : (
                  <div className={classes.typeIconSend}>
                    <ArrowUpIcon size={20} />
                  </div>
                )}
              </td>
              <td className={classes.timestamp}>{tx.timestamp}</td>
              <td className={classes.nanoval}>{formatNano(tx.nanoValue, true)}</td>
              <td className={classes.fiatval}>
                {tx.currency !== props.currencyCode && `${tx.currency} `}
                {formatFiat(tx.fiatValue, props.getCurrencySymbol(tx.currency), true)}
              </td>
              <td className={classes.info}>
                <MoreIcon />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionsTable
