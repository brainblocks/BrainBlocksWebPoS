import languages from 'i18n/languages'

export default {
  name: 'bbPosGetLanguageFromHttpHeader',

  lookup(options) {
    if (!window.hasOwnProperty('LOCALE_DATA')) return ''

    const http_languages = window.LOCALE_DATA.accept_languages
    for (var i = 0; i < http_languages.length; i++) {
      if (languages.hasOwnProperty(http_languages[i])) {
        return http_languages[i]
      }
    }
    return ''
  },

  cacheUserLanguage(lng, options) {
    // options -> are passed in options
    // lng -> current language, will be called after init and on changeLanguage
    // store it
  }
}
