<template>
  <v-flex>
    <h1>Connexion</h1>
    <LoginForm />
  </v-flex>
</template>

<script>
import LoginForm from '../components/LoginForm'
export default {
  name: 'Login',
  middleware: 'notAuthenticated',
  components: { LoginForm }
}
</script>

<style scoped>

</style>
