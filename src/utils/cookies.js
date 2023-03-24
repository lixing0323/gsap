import Cookies from 'js-cookie'

// const key = new URL(import.meta.env.VITE_APP_BASE_URL).host
const key = 'test'
const TOKEN_KEY = `token_${key}`
const ANIMAL_KEY = `animal_${key}`
const LANGUAGE_KEY = `language_${key}`

// token
export function getToken() {
  return Cookies.get(TOKEN_KEY)
}

export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token)
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY)
}

// 动物
export function getAnimal() {
  return Cookies.get(ANIMAL_KEY)
}

export function setAnimal(config) {
  return Cookies.set(ANIMAL_KEY, config)
}

// 语言
export function getLanguage() {
  return Cookies.get(LANGUAGE_KEY)
}

export function setLanguage(config) {
  return Cookies.set(LANGUAGE_KEY, config)
}
