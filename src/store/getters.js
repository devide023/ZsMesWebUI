const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menus: state => state.user.menus,
  orgid: state => state.user.orgid,
  comid: state => state.user.companyid,
  userid: state => state.user.userid
}
export default getters
