import React from 'react'
import { translate } from 'react-i18next'
import { moment } from 'functions/format'
import { css } from 'react-emotion'
import theme from 'theme'
import languages from 'i18n/languages'
import { getStyles as getTextInputStyles } from 'components/forms/TextInput'

const getStyles = (textInputStyles, props) => {
  const textinput = css`
    ${textInputStyles.textinput};
    appearance: none;
    position: relative;
    top: 0.3em;
    width: auto;
    padding-right: 2.5em;
    font-size: 14px;
    padding: 0.5em 1.75em 0.5em 0.75em;
    border-color: ${theme.color.lightestgray};
    background-image: url('data:image/svg+xml,%3Csvg%20width%3D%2210px%22%20height%3D%225px%22%20viewBox%3D%227%2010%2010%205%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Cpolygon%20id%3D%22Shape%22%20stroke%3D%22none%22%20fill%3D%22%230%22%20fill-rule%3D%22evenodd%22%20opacity%3D%220.54%22%20points%3D%227%2010%2012%2015%2017%2010%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 0.8em bottom 49%;
    &::-ms-expand {
      display: none;
    }
    @media (max-width: ${theme.bp.mobile}px) {
      font-size: 13px;
    }
  `
  return { textinput }
}

const LanguageSwitcher = props => {
  const { i18n } = props
  const textInputStyles = getTextInputStyles(props)
  const classes = getStyles(textInputStyles, props)

  const handleChangeLanguage = e => {
    i18n.changeLanguage(e.target.value)
    moment.locale(e.target.value)
    console.log(moment.locale())
  }

  return (
    <select className={classes.textinput} value={i18n.language} onChange={handleChangeLanguage}>
      {Object.keys(languages).map(lang => (
        <option key={`lang-${lang}`} value={lang}>
          {languages[lang].title}
        </option>
      ))}
    </select>
  )
}

export default translate('translations')(LanguageSwitcher)
