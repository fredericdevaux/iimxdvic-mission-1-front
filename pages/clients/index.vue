<template>
  <div class="clients">
    <h1>Mes clients</h1>
    <v-btn :to="'/clients/create'" color="primary">
      Ajouter un client
    </v-btn>
    <v-simple-table v-if="clients.length" class="clients-table">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Nom
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in clients" :key="item.id">
            <td>
              <nuxt-link :to="{name: 'clients-id', params: { id:item.id } }">
                {{ item.name }}
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <p v-else>
      Vous n'avez pas encore de client
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Clients',
  computed: {
    ...mapGetters({
      clients: 'clients/getClients',
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
  .clients-table, p {
    margin-top: 40px;
  }
</style>
