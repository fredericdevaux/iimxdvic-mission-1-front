<template>
  <div v-if="client">
    <h1>{{ client.name }}</h1>
    <img v-if="client.image" :src="`${baseURL}clients/${client.image}`">
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { config } from '../../config'
export default {
  name: 'Client',
  data: () => ({
    client: null,
    baseURL: config.UPLOADS_URL
  }),
  computed: {
    ...mapGetters({
      clients: 'clients/getClients',
      clientsCount: 'clients/getClientsCount',
      getClientById: 'clients/getClientById'
    })
  },
  async mounted () {
    if (!this.clientsCount) { await this.getClients() }
    this.client = this.getClientById(parseInt(this.$route.params.id))
  },
  methods: {
    ...mapActions({
      getClients: 'clients/getClients'
    })
  }
}
</script>

<style scoped>

</style>
