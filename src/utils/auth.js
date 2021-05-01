import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const MenuKey = 'vue_admin_template_menu'
const UserInfoKey = 'vue_admin_template_userinfo'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getMenus() {
  return sessionStorage.getItem(MenuKey)
}

export function setMenus(menulist) {
  return sessionStorage.setItem(MenuKey, menulist)
}
export function setUserInfo(userinfo) {
  return sessionStorage.setItem(UserInfoKey, userinfo)
}
export function getUserInfo() {
  return sessionStorage.getItem(UserInfoKey)
}
export function removeMenus() {
  return sessionStorage.removeItem(MenuKey)
}
export function removeUserInfo() {
  return sessionStorage.removeItem(UserInfoKey)
}
