const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  menus: state => state.user.menus,
  userinfo: state => state.user.userinfo
}
export default getters
