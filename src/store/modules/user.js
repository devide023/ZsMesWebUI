import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setMenus } from '@/utils/auth'
import { resetRouter, constantRoutes } from '@/router';
import { get_user_menus } from '@/router/usermenu';
import router from '@/router/index';
const getDefaultState = () => {
  return {
    token: getToken(),
    avatar: '',
    menus: [],
    userinfo: null
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
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
  SET_USERINFO: (state, userinfo) => {
    state.userinfo = userinfo;
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
        console.log(response);
        if (!response) {
          return reject('Verification failed, please Login again.')
        }
        let strmenus = JSON.stringify(response.menulist);
        setMenus(strmenus);
        let user_route = constantRoutes.concat(get_user_menus(response.menulist));
        router.addRoutes(user_route);
        router.options.routes = user_route;
        commit('SET_MENUS', strmenus);
        commit('SET_USERINFO', response.user);
        commit('SET_AVATAR', response.user.headimg);
        resolve()
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

