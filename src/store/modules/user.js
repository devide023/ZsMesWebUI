import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setMenus } from '@/utils/auth'
import { resetRouter } from '@/router';
import router from '@/router/index';
import {get_userroutes} from '@/router/userroute';
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    menus: [],
    orgid: 0,
    userid: 0,
    companyid: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
  SET_USERID: (state, userid) => {
    state.userid = userid;
  },
  SET_ORGID: (state, orgid) => {
    state.orgid = orgid;
  },
  SET_COMPANYID: (state, companyid) => {
    state.companyid = companyid;
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        if (!response) {
          return reject('Verification failed, please Login again.')
        }
        let strmenus = JSON.stringify(response.menulist);
        //console.log(strmenus);
        setMenus(strmenus);
        //setUserInfo(JSON.stringify(response.user));
        commit('SET_MENUS', strmenus);
        commit('SET_NAME', response.user.name)
        commit('SET_AVATAR', response.user.headimg)
        commit('SET_COMPANYID', response.user.companyid)
        commit('SET_ORGID', response.user.orgid)
        commit('SET_USERID', response.user.id)
        let routelist = get_userroutes(response.menulist)
        router.addRoutes(routelist);
        router.options.routes = routelist;
        resolve(response.user)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

