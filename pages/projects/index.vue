<template>
  <div class="projects">
    <h1>Mes projets</h1>
    <v-btn :to="'/projects/create'" color="primary">
      Créer un projet
    </v-btn>
    <v-simple-table v-if="projects.length" class="projects-table">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Nom
            </th>
            <th class="text-left">
              Client
            </th>
            <th class="text-left">
              Crée le
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in projects" :key="item.id">
            <td>{{ item.name }}</td>
            <td v-if="item.client">
              <nuxt-link :to="{name: 'clients-id', params: { id:item.client.id } }">
                {{ item.client.name }}
              </nuxt-link>
            </td>
            <td v-else>
              N/A
            </td>
            <td>{{ dateFormat(item.created_at) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <p v-else>
      Vous n'avez pas encore de projet
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Projects',
  computed: {
    ...mapGetters({
      projects: 'projects/getProjects',
      projectsCount: 'projects/getProjectsCount'
    })
  },
  mounted () {
    if (!this.projectsCount) { this.getProjects() }
  },
  methods: {
    ...mapActions({
      getProjects: 'projects/getProjects'
    }),
    dateFormat: (date) => {
      const d = new Date(date)
      const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
      const month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()
      return `${day}/${month}/${d.getFullYear()}`
    }
  }
}
</script>

<style scoped>
  .projects-table, p {
    margin-top: 40px;
  }
</style>
