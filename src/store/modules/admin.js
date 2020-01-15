const state = {
  toolbarTitle: '',
  alert: {
    status: 'error',
    message: 'Test message'
  }
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
    state.alert = {
      status: 'none',
      message: null
    }
  }
}

export default {
  state,
  mutations
}
