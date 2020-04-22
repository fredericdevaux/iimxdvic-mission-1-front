<template>
  <v-form
    ref="form"
    v-model="valid"
    class="login-form"
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      :type="'email'"
      required
    />

    <v-text-field
      v-model="password"
      label="Mot de passe"
      :rules="requiredRules"
      :type="'password'"
      required
    />

    <p v-if="formError" class="login-form__error">
      {{ formError }}
    </p>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Se connecter
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginForm',
  data: () => ({
    valid: true,
    formError: '',
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'Ce champ est requis',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    requiredRules: [
      v => !!v || 'Ce champ est requis'
    ]
  }),
  mounted () {
    this.getUserInfo()
  },
  methods: {
    ...mapActions({
      loginUser: 'user/login',
      getUserInfo: 'user/getUserInfo'
    }),
    validate () {
      this.$refs.form.validate()
      this.login()
    },
    async login () {
      try {
        await this.loginUser({
          email: this.email,
          password: this.password
        })
        this.email = ''
        this.password = ''
        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout () {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style scoped>

</style>
