import React from 'react'
import { css } from 'react-emotion'
import theme from 'theme'
import SVGButton from 'components/svg-button/SVGButton'

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
  `

  const buttons = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6%;
  `

  const button = css`
    width: 28.32%;
  `

  const transactions = css`
    background: green;
  `
  return { dashboard, header, buttons, button, transactions }
}

const Dashboard = props => {
  const classes = getStyles(props)

  return (
    <div className={classes.dashboard}>
      <div className={classes.header}>
        <img src="images/bb-pos-logo.png" alt="BrainBlocks Logo" />
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
            icon="calculator"
            title="PoS"
            color={theme.color.posIcon}
            onClick={() => console.log('3')}
          />
        </div>
      </div>
      <div className={classes.transactions}>Transactions</div>
    </div>
  )
}

export default Dashboard
