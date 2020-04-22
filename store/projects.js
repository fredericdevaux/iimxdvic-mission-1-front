import { config } from '../config'

export const state = () => ({
  projects: []
})

export const getters = {
  getProjects: state => state.projects,
  getProjectsCount: state => state.projects.length
}

export const mutations = {
  SET_PROJECTS (state, projects) {
    state.projects = projects
  },
  PUSH_NEW_PROJECT (state, newProject) {
    state.projects.push(newProject)
  }
}

export const actions = {
  async createProject ({ commit, rootGetters }, { name, client, deadline, description }) {
    try {
      this.$axios.setToken(rootGetters['user/getUserAccessToken'], 'Bearer')
      const { data } = await this.$axios.post(`${config.API_URL}/projects/create`, { name, client, deadline, description })
      commit('PUSH_NEW_PROJECT', data)
    } catch (error) {
      if (error.response) {
        throw new Error(error.response)
      }
      throw error
    }
  },
  async getProjects ({ commit, rootGetters }) {
    try {
      this.$axios.setToken(rootGetters['user/getUserAccessToken'], 'Bearer')
      const { data } = await this.$axios.get(`${config.API_URL}/projects`)
      commit('SET_PROJECTS', data)
    } catch (error) {
      if (error.response) {
        throw new Error(error.response)
      }
      throw error
    }
  }
}
