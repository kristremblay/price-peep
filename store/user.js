export const state = () => {
  return {
    authenticated: false,
    authenticating: false
  }
}

export const mutations = {
  authenticate(state, tf = true) {
    state.authenticated = tf
  },
  toggleAuthenticating(state) {
    state.authenticating = !state.authenticating
  }
}

export const actions = {
  login({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      commit('toggleAuthenticating')

      // fake an auth request
      setTimeout(() => {
        const userEmail = 'user@example.com'
        const password = 'test123'

        if (userEmail === payload.email && password === payload.password) {
          commit('authenticate')
          resolve()
        } else {
          reject(new Error('Email and/or Password Incorrect'))
        }
        commit('toggleAuthenticating')
      }, 1000)
    })
  },
  logout({ commit, state }) {
    return new Promise((resolve) => {
      commit('authenticate', false)
      resolve()
    })
  }
}

export const getters = {
  getAuthenticating(state) {
    return state.authenticating
  }
}
