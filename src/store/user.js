export default {
  namespaced: true,
  state: {
    loginState: localStorage.getItem('loginState') === 'true' || false
  },
  mutations: {
    change_login_state (state, data) {
      state.loginState = data
    }
  }
}
