const state = {
  toolbarTitle: '',
  alert: null
}

const mutations = {
  setToolbarTitle(state, title) {
    state.toolbarTitle = title
  },
  setAlert(state, alert) {
    state.alert = {
      status: alert.status || 'none',
      message: alert.message || null
    }
  },
  dismissAlert(state) {
    state.alert = null
  }
}

export default {
  state,
  mutations
}
