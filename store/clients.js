import { config } from '../config'

export const state = () => ({
  clients: []
})

export const getters = {
  getClients: state => state.clients,
  getClientsCount: state => state.clients.length,
  getClientById: state => id => state.clients.find(client => client.id === id)
}

export const mutations = {
  SET_CLIENTS (state, clients) {
    state.clients = clients
  },
  PUSH_NEW_CLIENT (state, newClient) {
    state.clients.push(newClient)
  }
}

export const actions = {
  async getClients ({ commit, rootGetters }) {
    try {
      this.$axios.setToken(rootGetters['user/getUserAccessToken'], 'Bearer')
      const { data } = await this.$axios.get(`${config.API_URL}/clients`)
      commit('SET_CLIENTS', data)
    } catch (error) {
      if (error.response) {
        throw new Error(error.response)
      }
      throw error
    }
  },

  async createClient ({ commit, rootGetters }, { name, image }) {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('image', image)
      this.$axios.setToken(rootGetters['user/getUserAccessToken'], 'Bearer')
      const { data } = await this.$axios.post(`${config.API_URL}/clients/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      commit('PUSH_NEW_CLIENT', data)
    } catch (error) {
      if (error.response) {
        throw new Error(error.response)
      }
      throw error
    }
  }
}
