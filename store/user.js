import { config } from '../config'
const Cookie = process.client ? require('js-cookie') : undefined

export const state = () => ({
  authUser: '',
  userInfo: '',
  accessToken: ''
})

export const getters = {
  getAuthUser: state => decodeURIComponent(state.authUser),
  getUserAccessToken: state => state.accessToken,
  getUserInfo: state => state.userInfo
}

export const mutations = {
  SET_USER (state, user) {
    state.authUser = user
  },
  SET_ACCESS_TOKEN (state, accessToken) {
    state.accessToken = accessToken
  },
  SET_USER_INFO (state, user) {
    state.userInfo = user
  }
}

export const actions = {
  async login ({ commit, dispatch }, { email, password }) {
    try {
      const { data } = await this.$axios.post(`${config.API_URL}/auth/login`, { email, password })
      commit('SET_USER', data)
      commit('SET_ACCESS_TOKEN', data.accessToken)
      const stringifyData = JSON.stringify(data)
      const encoded = encodeURIComponent(stringifyData)
      Cookie.set('auth', encoded) // saving token in cookie for server rendering
      dispatch('callUserInfo')
      this.$router.push('/dashboard')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Mauvais email ou mot de passe')
      }
      throw error
    }
  },

  async register ({ commit }, { email, password, firstName, lastName, country, birthDate, siret }) {
    try {
      await this.$axios.post(`${config.API_URL}/auth/register`, { email, password, firstName, lastName, country, birthDate, siret })
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await Cookie.remove('auth')
    commit('SET_USER', '')
    commit('SET_USER_INFO', '')
    commit('clients/SET_CLIENTS', [], { root: true })
    commit('projects/SET_PROJECTS', [], { root: true })

    this.$router.push('/login')
  },

  async callUserInfo ({ commit, getters }) {
    try {
      this.$axios.setToken(getters.getUserAccessToken, 'Bearer')
      const user = (await this.$axios.get(`${config.API_URL}/me`)).data
      commit('SET_USER_INFO', user)
    } catch (e) {
      Cookie.remove('auth')
      commit('SET_USER', '')
      this.$router.push('/login')
    }
  },

  getUserInfo ({ commit, getters, dispatch }) {
    if (getters.getAuthUser) {
      const accessToken = JSON.parse(decodeURIComponent(getters.getAuthUser)).accessToken
      commit('SET_ACCESS_TOKEN', accessToken)
      dispatch('callUserInfo')
    }
  }
}
