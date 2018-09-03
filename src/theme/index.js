import { injectGlobal } from 'emotion'

const theme = {
  color: {
    text: '#555555',
    background: '#cbc5c5',
    walletIcon: '#348b9f',
    currencyIcon: '#4a91e3',
    posIcon: '#5fb061'
  },
  spacing: {
    mobile: {
      dashPadding: '20px'
    },
    tablet: {
      dashPadding: '44px'
    },
    desktop: {
      dashPadding: '100px'
    }
  },
  bp: {
    mobile: 480,
    tablet: 768,
    desktop: 1040,
    fullWidth: 1040,
    fullHeight: 880
  }
}

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body, html {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: ${theme.color.background};
    color: ${theme.color.text};
    line-height: 1.5;
  }
`

export default theme
