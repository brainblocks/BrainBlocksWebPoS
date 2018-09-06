import React from 'react'
import { css } from 'react-emotion'
import theme from 'theme'
import SVGButton from 'components/svg-button/SVGButton'
import BrainblocksPOSLogo from 'svg/brainblocks_pos_logo.svg'
import TransactionsTable from 'components/transactions/TransactionsTable'

const getStyles = props => {
  const dashboard = css`
    padding: ${theme.spacing.mobile.dashPadding};
    @media (min-width: ${theme.bp.tablet}px) {
      padding: ${theme.spacing.tablet.dashPadding};
    }
    @media (min-width: ${theme.bp.desktop}px) {
      padding: ${theme.spacing.desktop.dashPadding};
    }
  `

  const header = css`
    margin-bottom: 6%;
    img {
      width: 60%;
      max-width: 320px;
    }
  `

  const buttons = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6%;
  `

  const button = css`
    width: 28.32%;
  `

  const transactions = css``
  return { dashboard, header, buttons, button, transactions }
}

const Dashboard = props => {
  const classes = getStyles(props)

  return (
    <div className={classes.dashboard}>
      <div className={classes.header}>
        <img src={BrainblocksPOSLogo} alt="BrainBlocks Logo" />
      </div>
      <div className={classes.buttons}>
        <div className={classes.button}>
          <SVGButton
            icon="wallet"
            title="Address"
            color={theme.color.walletIcon}
            onClick={props.onOpenModal('address')}
          />
        </div>
        <div className={classes.button}>
          <SVGButton
            icon="currency"
            title="Currency"
            color={theme.color.currencyIcon}
            onClick={props.onOpenModal('currency')}
          />
        </div>
        <div className={classes.button}>
          <SVGButton
            disabled={!props.posEnabled}
            icon="calculator"
            title="PoS"
            color={theme.color.posIcon}
            onClick={props.onOpenPoS}
          />
        </div>
      </div>
      <div className={classes.transactions}>
        <TransactionsTable
          currencies={props.currencies}
          currencyCode={props.currencyCode}
          currencySymbol={props.currencySymbol}
          transactions={props.transactions}
          onInspectTransaction={props.onInspectTransaction}
        />
      </div>
    </div>
  )
}

export default Dashboard
