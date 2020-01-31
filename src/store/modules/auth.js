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
          let accessToken = response.data.access_token
          localStorage.setItem('access_token', accessToken)
          commit('setToken', accessToken)
          commit('setUserFromToken', accessToken)
          resolve(response)
        })
        .catch((error) => {
          commit('setError')
          reject(error)
        })
    })
  },
  refreshAccessToken({ commit }) {
    return axios.post('/auth/token/refresh')
      .then((response) => {
        commit('refreshToken', response.data.access_token)
        return response.data.access_token
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
  setUserFromToken(state, token) {
    let claims = JSON.parse(atob(token.split('.')[1]))
    state.user = {
      id: claims.sub,
      name: claims.name,
      email: claims.email
    }
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
