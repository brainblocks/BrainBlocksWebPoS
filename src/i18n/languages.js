import { en as enTranslations } from './translations/en'
import { es as esTranslations } from './translations/es'
import { cn as cnTranslations } from './translations/zh-cn'
import { de as deTranslations } from './translations/de-DE'
import { br as brTranslations } from './translations/pt-br'

export default {
  // Note - make sure we use a locale code that both i18next
  // and moment.js recognize. E.g. zh-CN not cn or zh-cn
  en: {
    title: 'English',
    translations: enTranslations
  },
  es: {
    title: 'Español',
    translations: esTranslations
  },
  'zh-CN': {
    title: '中文',
    translations: cnTranslations
  },
  'de-DE': {
    title: 'Deutsch',
    translations: deTranslations
  },
  'pt-BR': {
    title: 'Português',
    translations: brTranslations
}
