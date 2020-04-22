<template>
  <v-form
    ref="form"
    v-model="valid"
    enctype="multipart/form-data"
    class="register-form"
  >
    <v-text-field
      v-model="name"
      label="Nom du projet"
      :rules="requiredRules"
      required
    />
    <v-autocomplete
      v-model="client"
      label="Client"
      :items="clients"
      color="white"
      item-text="name"
      item-value="id"
      :rules="requiredRules"
      required
    />
    <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="deadline"
          label="Deadline"
          :rules="requiredRules"
          required
          v-on="on"
        />
      </template>
      <v-date-picker v-model="date" no-title @input="menu2 = false" />
    </v-menu>
    <v-textarea
      v-model="description"
      outlined
      label="Description"
    />
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Créer
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CreateClient',
  data: vm => ({
    valid: true,
    name: '',
    client: {},
    date: '',
    description: '',
    requiredRules: [
      v => !!v || 'Ce champ est requis'
    ],
    menu1: false,
    menu2: false,
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    formError: ''
  }),
  computed: {
    ...mapGetters({
      clients: 'clients/getClients',
      clientsCount: 'clients/getClientsCount'
    }),
    deadline () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  mounted () {
    if (!this.clientsCount) { this.getClients() }
  },
  methods: {
    ...mapActions({
      createProject: 'projects/createProject',
      getClients: 'clients/getClients'
    }),
    formatDate (date) {
      if (!date) { return null }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    async validate () {
      this.$refs.form.validate()
      try {
        await this.createProject({
          name: this.name,
          client: this.client,
          deadline: this.deadline,
          description: this.description
        })
        await this.$router.push('/projects')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style scoped>

</style>
