export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit ({ commit }, { req }) {
    let auth = ''
    if (req.headers.cookie) {
      const cookie = req.headers.cookie
      const output = {}
      cookie.split(/\s*;\s*/).forEach(function (pair) {
        pair = pair.split(/\s*=\s*/)
        output[pair[0]] = pair.splice(1).join('=')
      })
      let json = JSON.stringify(output, null, 4)
      json = JSON.parse(json)
      if (json.auth) {
        auth = json.auth
        commit('user/SET_USER', auth, { root: true })
      }
    }
  }
}
