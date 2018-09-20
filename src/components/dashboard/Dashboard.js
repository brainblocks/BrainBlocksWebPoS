import React from 'react'
import { css } from 'react-emotion'
import theme from 'theme'
import LanguageSwitcher from 'components/i18n/LanguageSwitcher'
import SVGButton from 'components/svg-button/SVGButton'
import BrainblocksPOSLogo from 'svg/brainblocks_pos_logo.svg'
import TransactionsTable from 'components/transactions/TransactionsTable'

const getStyles = props => {
  const dashboard = css`
    padding: ${theme.spacing.mobile.dashPadding}px;
    @media (min-width: ${theme.bp.tablet}px) {
      padding: ${theme.spacing.tablet.dashPadding}px;
    }
    @media (min-width: ${theme.bp.desktop}px) {
      padding: ${theme.spacing.desktop.dashPadding}px;
    }
  `

  const header = css`
    margin-bottom: 6%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 60%;
      max-width: 320px;
    }
  `

  const languageSwitcher = css``

  const buttons = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6%;
  `

  const button = css`
    width: 28.32%;
  `

  const transactions = css``
  return { dashboard, header, languageSwitcher, buttons, button, transactions }
}

const Dashboard = props => {
  const { t } = props
  const classes = getStyles(props)

  return (
    <div className={classes.dashboard}>
      <div className={classes.header}>
        <img src={BrainblocksPOSLogo} alt="BrainBlocks Logo" />
        <div className={classes.languageSwitcher}>
          <LanguageSwitcher />
        </div>
      </div>
      <div className={classes.buttons}>
        <div className={classes.button}>
          <SVGButton
            icon="wallet"
            title={t('addressBtn')}
            titleMobile={t('addressBtnMobile')}
            color={theme.color.walletIcon}
            onClick={props.onOpenModal('address')}
          />
        </div>
        <div className={classes.button}>
          <SVGButton
            icon="currency"
            title={t('currencyBtn')}
            titleMobile={t('currencyBtnMobile')}
            color={theme.color.currencyIcon}
            onClick={props.onOpenModal('currency')}
          />
        </div>
        <div className={classes.button}>
          <SVGButton
            disabled={!props.posEnabled}
            icon="calculator"
            title={t('posButton')}
            titleMobile={t('posButtonMobile')}
            color={theme.color.posIcon}
            onClick={props.onOpenPoS}
          />
        </div>
      </div>
      <div className={classes.transactions}>
        <TransactionsTable
          t={props.t}
          currencies={props.currencies}
          currencyCode={props.currencyCode}
          transactions={props.transactions.slice(0, 4)}
          onInspectTransaction={props.onInspectTransaction}
          txRequestStatus={props.txRequestStatus}
          onGetTransactions={props.onGetTransactions}
        />
      </div>
    </div>
  )
}

export default Dashboard
