import axios from '../../axios'

const state = {
  accessToken: localStorage.getItem('access_token') || '',
  status: '',
  hasLoadedOnce: false,
  user: null
}

const getters = {
  isAuthenticated: state => !!state.accessToken,
  authStatus: state => state.status
}

const actions = {
  login({ commit, dispatch }, credentials) {
    commit('setLoading')
    return new Promise((resolve, reject) => {
      axios.post('/auth/token', credentials)
        .then((response) => {
          localStorage.setItem('access_token', response.data.access_token)
          commit('setToken', response.data.access_token)
          return axios.get('/api/profile').then((response) => response.data.data)
        })
        .then((user) => {
          commit('setUser', user)
          resolve(user)
        })
        .catch((error) => {
          commit('setError')
          reject(error)
        })
    })
  },
  refreshAccessToken({ commit }) {
    return new Promise((resolve, reject) => {
      axios.post('/auth/token/refresh')
        .then((response) => {
          commit('refreshToken', response.data.access_token)
          return resolve()
        })
        .error((error) => {
          reject(error)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('access_token')
      resolve()
    })
  }
}

const mutations = {
  setLoading(state) {
    state.status = 'loading'
  },
  setToken(state, token) {
    state.status = 'success'
    state.accessToken = token
    state.hasLoadedOnce = true
  },
  refreshToken(state, token) {
    state.accessToken = token
    localStorage.setItem('access_token', token)
  },
  setUser(state, user) {
    state.user = user
  },
  setError(state) {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  logout(state) {
    state.accessToken = null
    state.user = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
