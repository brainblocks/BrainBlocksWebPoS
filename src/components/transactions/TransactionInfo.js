import React from 'react'
import { css } from 'react-emotion'
import Color from 'color'
import theme from 'theme'
import { formatNano, formatFiat, formatTime, formatDate } from 'functions/format'
import { raiToNano } from 'functions/nano'
import ArrowDownIcon from 'mdi-react/ArrowDownIcon'
import ArrowUpIcon from 'mdi-react/ArrowUpIcon'

const getStyles = props => {
  const wrap = css``
  const header = css`
    text-align: center;
    margin-bottom: 2em;
  `
  const circleIcon = css`
    text-align: center;
    width: 60px;
    height: 60px;
    line-height: 64px;
    border: 4px solid ${theme.color.success};
    border-radius: 100%;
    margin: auto;
    position: relative;
    top: -2px;
    margin-bottom: 0.25em;
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
  const amountNano = css`
    color: ${theme.color.headings};
    display: block;
    font-size: 36px;
    font-weight: 600;
    line-height: 1.2;
  `
  const amountFiat = css`
    display: block;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
  `
  const table = css`
    width: 100%;
    max-width: 610px;
    margin: auto;
    border-collapse: collapse;
  `
  const td = css`
    text-align: left;
    padding: 0.75em 0;
    font-size: 15px;
    border-top: 1px solid ${theme.color.tableBorder};
    vertical-align: top;
  `
  const tdFirst = css`
    border-top: none;
  `
  const th = css`
    ${td};
    font-weight: 600;
  `
  const thFirst = css`
    ${td};
    ${tdFirst};
  `
  const tdVal = css`
    ${td};
    text-align: right;
    padding-left: 1em;
  `
  const tdDate = css`
    ${tdVal};
    ${tdFirst};
  `
  const date = css`
    font-weight: 600;
  `
  const tdAddr = css`
    ${tdVal};
    font-size: 14px;
    letter-spacing: -0.01em;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  `
  const tdExp = css`
    ${tdVal};
  `
  const link = css`
    color: ${theme.color.currencyIcon};
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover {
      color: ${Color(theme.color.currencyIcon)
        .darken(0.2)
        .string()};
    }
  `
  return {
    wrap,
    header,
    typeIconReceive,
    typeIconSend,
    amountNano,
    amountFiat,
    table,
    th,
    thFirst,
    tdDate,
    date,
    tdAddr,
    tdExp,
    link
  }
}

const TransactionInfo = props => {
  const { t } = props
  const classes = getStyles(props)
  const tx = props.transaction

  return (
    <div className={classes.wrap}>
      <div className={classes.header}>
        {tx.type === 'receive' ? (
          <div className={classes.typeIconReceive}>
            <ArrowDownIcon size={52} />
          </div>
        ) : (
          <div className={classes.typeIconSend}>
            <ArrowUpIcon size={52} />
          </div>
        )}
        <span className={classes.amountNano}>{formatNano(raiToNano(tx.nano_value), true)}</span>
        <span className={classes.amountFiat}>{formatFiat(tx.fiat_value, tx.currency, true)}</span>
      </div>
      <table className={classes.table}>
        <tbody>
          <tr>
            <th className={classes.thFirst}>{t('txInfoDate')}</th>
            <td className={classes.tdDate}>
              {formatTime(tx.created_at)}{' '}
              <span className={classes.date}>{formatDate(tx.created_at)}</span>
            </td>
          </tr>
          <tr>
            <th className={classes.th}>{t('txInfoAddress')}</th>
            <td className={classes.tdAddr}>{tx.link}</td>
          </tr>
          <tr>
            <th className={classes.th}>{t('txInfoExplorer')}</th>
            <td className={classes.tdExp}>
              <a
                className={classes.link}
                href={`https://www.nanode.co/account/${tx.link}`}
                target="_blank"
              >
                {t('txInfoExploreAddress')}
              </a>{' '}
              /{' '}
              <a
                className={classes.link}
                href={`https://www.nanode.co/block/${tx.send_block}`}
                target="_blank"
              >
                {t('txInfoExploreTransaction')}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TransactionInfo
