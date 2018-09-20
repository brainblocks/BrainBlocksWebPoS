import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import languages from './languages'

i18n.use(LanguageDetector).init({
  resources: languages,
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },

  react: {
    wait: true
  },

  detection: {
    order: ['localStorage', 'htmlTag', 'navigator'],
    lookupLocalStorage: 'bb_pos_language'
  }
})

export default i18n
