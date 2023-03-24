import { createI18n } from 'vue-i18n'
import { getLanguage } from '@/utils/cookies.js'
import zhLocale from './zh'
import enLocale from './en'

const messages = {
  zh: {
    ...zhLocale,
  },
  en: {
    ...enLocale,
  },
}

export function getLocalLang() {
  const chooseLanguage = getLanguage()
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh'
}

// 获取对应语言的文本
export function getLangString(key) {
  return i18n.global.t(key)
}

// 是否是中午
export function isChsLang() {
  return getLanguage() === 'zh'
}

const i18n = createI18n({
  // set locale
  // options: en | zh | es
  locale: getLocalLang(),
  allowComposition: true,
  globalInjection: true,
  // set locale messages
  messages,
})

export default i18n
