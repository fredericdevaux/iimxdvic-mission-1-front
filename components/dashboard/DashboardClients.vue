<template>
  <v-card
    class="card-clients"
    max-width="344"
  >
    <v-card-text>
      <div>Nombre de clients</div>
      <p class="text--primary">
        {{ clientsCount }}
      </p>
    </v-card-text>
    <nuxt-link
      :to="{name: 'clients'}"
      color="deep-purple accent-4"
    >
      Voir tous les clients
    </nuxt-link>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DashboardClients',
  computed: {
    ...mapGetters({
      clientsCount: 'clients/getClientsCount'
    })
  },
  mounted () {
    if (!this.clientsCount) { this.getClients() }
  },
  methods: {
    ...mapActions({
      getClients: 'clients/getClients'
    })
  }
}
</script>

<style scoped>
  .card-clients {
    text-align: center;
  }

  .text--primary {
    font-size: 90px;
    line-height: 1;
    margin-top: 50px;
  }

  a {
    display: inline-block;
    margin-bottom: 10px;
  }
</style>
