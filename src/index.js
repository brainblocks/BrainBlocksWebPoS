import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'
import { I18nextProvider } from 'react-i18next'
import 'airbnb-browser-shims'
import i18n from 'i18n/i18next'
import theme from 'theme'
import App from 'components/app/App'
//import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </I18nextProvider>,
  document.getElementById('root')
)
//registerServiceWorker()
