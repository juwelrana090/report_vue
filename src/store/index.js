import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      token: null,
    },
  },
  getters: {
    getUser: function (state) {
      return state.user
    },
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.user.token = payload ? payload.token ? payload.token : null : null
    },
  },
  actions: {
    setUser(context, payload) {
      localStorage.setItem('tokenLocal', payload.token)
      context.commit('UPDATE_USER', payload)
    },
  },
  modules: {
  }
})
