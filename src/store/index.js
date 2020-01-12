import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('access_token')
  },
  mutations: {
    setAccessToken(state, accessToken) {
      if (accessToken) {
        localStorage.setItem('access_token', accessToken)
      }
      else {
        localStorage.removeItem('access_token')
      }
      state.accessToken = accessToken
    }
  },
  getters: {
    authenticated: state => {
      return state.accessToken !== null && state.accessToken !== undefined
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
