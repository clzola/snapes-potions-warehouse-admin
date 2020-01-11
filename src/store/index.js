import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('access_token'),
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    setAccessToken(state, accessToken) {
      localStorage.setItem('access_token', accessToken)
      state.accessToken = accessToken
    },
    setUser(state, user) {
      localStorage.setItem(JSON.stringify(user))
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
