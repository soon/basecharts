export const state = () => ({
  config: {},
})

export const getters = {}

export const actions = {
  updateConfig({ commit }, update) {
    commit('UPDATE_CONFIG', { update })
  },

  setConfig({ commit }, config) {
    commit('SET_CONFIG', config)
  },
}

export const mutations = {
  UPDATE_CONFIG(state, payload) {
    payload.update(state.config)
  },

  SET_CONFIG(state, config) {
    state.config = config
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
