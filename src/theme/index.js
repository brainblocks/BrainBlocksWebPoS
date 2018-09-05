import { injectGlobal } from 'emotion'

const theme = {
  color: {
    text: '#555555',
    primary: '',
    secondary: '',
    error: '#c91c1c',
    success: '#38a52d',
    lightestgray: '#ececec',
    buttonPrimary: '#7cca7e',
    buttonSecondary: '#b4b4b4',
    background: '#cbc5c5',
    walletIcon: '#348b9f',
    currencyIcon: '#4a91e3',
    posIcon: '#5fb061',
    fieldBorder: '#888888'
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
    font-family: "Montserrat", sans-serif;
    background: ${theme.color.background};
    color: ${theme.color.text};
    line-height: 1.5;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  button {
    color: ${theme.color.text};
    font-family: "Montserrat", sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

export default theme
