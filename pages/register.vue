<template>
  <v-flex>
    <h1>Inscription</h1>
    <RegisterForm />
  </v-flex>
</template>

<script>
import RegisterForm from '../components/RegisterForm'

export default {
  name: 'Register',
  middleware: 'notAuthenticated',
  components: { RegisterForm }
}
</script>

<style scoped>

</style>
