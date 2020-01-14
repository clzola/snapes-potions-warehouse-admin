import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import admin from './modules/admin'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    admin
  }
})

export default store
