import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'
import theme from 'theme'
import App from 'components/app/App'
//import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
//registerServiceWorker()
